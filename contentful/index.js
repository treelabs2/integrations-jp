const { json, send } = require('micro')
const { get, find, defaultTo } = require('lodash')
const cors = require('micro-cors')()
const contentful = require('contentful')
const parseContentfulEntry = require('./parser')
const { saveConfiguration, loadConfiguration } = require('./db')
const { parse } = require('url');

const cachedClients = {};
const PAGE_ID_SETTINGS = 'settings';

const handler = async (req, res) => {
    // Only accept POST requests
    if (req.method !== 'POST') {
        return sendMessage(res, 404, 'ページが見つかりません。');
    }

    const { query } = parse(req.url, true);
    const isConfigured = checkIsConfigured(query);
    const payload = await json(req);

    if (!hasAccess(payload)) {
        return sendMessage(res, 403, 'このコンテンツにアクセスすることはできません。');
    }

    const isAdmin = get(payload, 'permissions', []).includes('full_access');
    const installationId = payload.installation_id;

    if (!installationId) {
        return sendMessage(res, 400, 'インストールIDは提供されていません。')
    }

    if (payload.action === 'submit') {
        try {
            const { contentfulSpaceId, contentfulAccessToken, contentfulEntryId } = parseActionProps(payload);
            await saveConfiguration(installationId, contentfulSpaceId, contentfulAccessToken, contentfulEntryId);
            return sendRedirect(res, null, '構成が保存されました。');
        } catch (error) {
            return sendNotification(res, `構成の保存中にエラーが発生しました。 ${defaultTo(error.message, '')}`);
        }
    }

    let pageId = get(payload, 'page_id', null);
    const isEntryPage = pageId === null;
    if (isEntryPage) {
        pageId = defaultTo(await getHomePageId(installationId, query), null);
    } else {
        pageId = defaultTo(payload.page_id, null);
    }

    if (pageId === null) {
        return sendNeedsConfiguration(res, isAdmin);
    }

    const client = await getContentfulClient(installationId, query);
    if (!client) {
        return sendNeedsConfiguration(res, isAdmin);
    }

    if (pageId === PAGE_ID_SETTINGS) {
        if (isAdmin) {
            return sendPage(res, 200, renderForm());
        } else {
            return sendMessage(res, 403, 'このコンテンツにアクセスすることはできません。');
        }
    }

    let entry = null;
    try {
        entry = await fetchContentfulEntry(client, pageId)
    } catch (e) {
        return sendNotFound(res, isEntryPage, isAdmin);
    }

    if (!entry) {
        return sendNotFound(res, isEntryPage, isAdmin);
    }

    try {
        const page = await parseContentfulEntry(entry);
        if (isAdmin && isEntryPage && !isConfigured) {
            // 管理者用のメインページに設定ボタンを追加
            page.blocks = page.blocks.concat(getSettingsBlocks());
        }
        return sendPage(res, 200, page);
    } catch (e) {
        return sendNotFound(res, isEntryPage, isAdmin);
    }
}

const sendPage = (res, code, payload) => {
    send(res, 200, { code, ...payload });
}

const sendMessage = (res, code, message) => {
    send(res, 200, { code, message });
}

const sendNotification = (res, notification) => {
    send(res, 200, { code: 200, notification });
}

const sendRedirect = (res, pageId, notification) => {
    send(res, 200, { code: 301, pageId, notification });
}

const sendNeedsConfiguration = (res, isAdmin) => {
    if (isAdmin) {
        sendPage(res, 200, renderForm());
    } else {
        sendMessage(res, 501, 'このインテグレーションはまだ構成されていません。 これは、フルアクセス権限を持つユーザーのみが実行できます。');
    }
}

const sendNotFound = (res, isEntryPage, isAdmin) => {
    if (isAdmin && isEntryPage) {
        return sendPage(res, 200, renderForm());
    }
    return sendMessage(res, 404, 'ページが見つかりません。');
}

const getContentfulClient = async (installationId, query) => {
    if (installationId in cachedClients) {
        return cachedClients[installationId];
    }
    const info = await getContentfulInfo(installationId, query);
    if (!info) {
        return null
    }
    const client = contentful.createClient({
        space: info.contentfulSpaceId,
        accessToken: info.contentfulAccessToken
    })
    cachedClients[installationId] = client
    return client
}

const getContentfulInfo = async (installationId, query) => {
    // Check whether info is included in query URL.
    const querySpaceId = get(query, 'spaceId', null);
    const queryAccessToken = get(query, 'accessToken', null);
    if (querySpaceId != null && queryAccessToken !== null) {
        return {
            contentfulSpaceId: querySpaceId,
            contentfulAccessToken: queryAccessToken,
        };
    }

    // If info is not included in query URL, fetch it from config store.
    const config = await loadConfiguration(installationId);
    if (config) {
        return {
            contentfulSpaceId: get(config, 'data.contentfulSpaceId', null),
            contentfulAccessToken: get(config, 'data.contentfulAccessToken', null),
        };
    }
    return null;
}

const getHomePageId = async (installationId, query) => {
    // Check whether info is included in query URL.
    const entryId = get(query, 'entryId', null);
    if (entryId != null) {
        return entryId;
    }

    // If info is not included in query URL, fetch it from config store.
    const config = await loadConfiguration(installationId);
    return get(config, 'data.contentfulEntryId', null);
}

const checkIsConfigured = (query) => {
    // Check whether all required parameters (space id, access token, entry id)
    // are provided in the URL.
    const entryId = get(query, 'entryId', null);
    const querySpaceId = get(query, 'spaceId', null);
    const queryAccessToken = get(query, 'accessToken', null);
    return entryId !== null && querySpaceId !== null && queryAccessToken != null;
}

const fetchContentfulEntry = async (client, pageId) => {
    return await client.getEntry(pageId);
}

const hasAccess = (payload) => {
    return get(payload, 'permissions', []).length > 0;
}

const parseActionProps = (payload) => {
    const contentfulSpaceId = getPropValue(payload.props, 'space_id');
    const contentfulAccessToken = getPropValue(payload.props, 'access_token');
    const contentfulEntryId = getPropValue(payload.props, 'entry_id');
    let missingProps = [];
    if (contentfulSpaceId === '') {
        missingProps.push('Space ID');
    }
    if (contentfulAccessToken === '') {
        missingProps.push('Access Token');
    }
    if (contentfulEntryId === '') {
        missingProps.push('Entry ID');
    }
    if (missingProps.length > 0) {
        throw new Error(`次のものを提供してください: ${missingProps.join(', ')}.`);
    }
    return { contentfulSpaceId, contentfulAccessToken, contentfulEntryId };
}

const getPropValue = (props, name) => {
    return get(find(props, (prop) => get(prop, 'name', '') === name), 'value', '');
}

const renderForm = (spaceId, accessToken, entryId) => {
    return {
        title: 'セッティング',
        props: [
            { name: 'space_id', type: 'text', value: spaceId },
            { name: 'access_token', type: 'text', value: accessToken },
            { name: 'entry_id', type: 'text', value: entryId }
        ],
        blocks: [
            { type: 'heading1', value: 'ようこそ!' },
            { type: 'text', value: 'このインテグレーションは、表示するリッチページを作成できるCMS（コンテンツ管理システム）である[Contentful](https://app.contentful.com/)によって支えられています。 開始するには、以下の情報を提供してください。 [コンテンツガイド](https://www.notion.so/withtree/Contentful-a473d6ae70254bbba6e79a89970546a3)に従って開始してください。' },
            { type: 'heading3', value: 'Contentful構成'  },
            { type: 'input', bindToProp: 'space_id', value: spaceId, attrs: { label: 'スペース ID', placeholder: '隠す', display_type: 'legend' }},
            { type: 'input', bindToProp: 'access_token', value: accessToken, attrs: { label: 'アクセストークン', placeholder: '隠す', display_type: 'legend' }},
            { type: 'input', bindToProp: 'entry_id', value: entryId, attrs: { label: 'エントリー ID', placeholder: '隠す', display_type: 'legend' }},
            { type: 'text', value: '👉 [これらの値を見つけるにはどうすればよいですか?](https://www.notion.so/withtree/Contentful-a473d6ae70254bbba6e79a89970546a3#ce259e32a41c4e1da13e23790396a45c)', attrs: {size: 'small', appearance: 'light' }},
            { type: 'spacer' },
            { type: 'button', value: '参加', attrs: { action: 'submit', disabled: false }},
            { type: 'text', value: '注：フルアクセス権限を持つユーザーは、いつでもこの情報を更新できます。 メインページの下部にある 「⚙️ インテグレーションの構成」 リンクをタップしてください。', attrs: {size: 'small', appearance: 'light' }}
        ]
    };
}

const getSettingsBlocks = () => {
    return [
        { type: 'divider' },
        { type: 'link', value: '⚙️ インテグレーション構成', attrs: { pageId: PAGE_ID_SETTINGS }}
    ];
}

module.exports = cors(handler)
