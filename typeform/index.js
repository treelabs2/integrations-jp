const { json, send } = require('micro');
const { get, find, defaultTo } = require('lodash');
const cors = require('micro-cors')();
const { fetchWorkspaces, getForms, getForm } = require('./typeform');
const { loadConfiguration, saveConfiguration } = require('./db');

const PAGE_ID_SETTINGS = 'settings';
const PAGE_ID_SELECT_WORKSPACE = 'select_workspace';
const PAGE_ID_FORM = 'form';
const ACTION_SUBMIT_ACCESS_KEY = 'submit_access_key';
const ACTION_SUBMIT_WORKSPACE = 'submit_workspace';

const handler = async (req, res) => {
    // Only accept POST requests
    if (req.method !== 'POST') {
        return sendMessage(res, 404, 'ページが見つかりません。');
    }

    const payload = await json(req);

    if (!hasAccess(payload)) {
        return sendMessage(res, 401, 'このコンテンツにアクセスすることはできません。');
    }

    const hasFullAccess = get(payload, 'permissions', []).includes('full_access');
    const installationId = payload.installation_id;

    if (!installationId) {
        return sendMessage(res, 400, 'インストールIDは提供されていません。')
    }

    const action = defaultTo(payload.action, '');
    try {
        if (action === ACTION_SUBMIT_ACCESS_KEY) {
            const personalAccessToken = parseAccessTokenFromProps(payload);
            await saveConfiguration(installationId, personalAccessToken, null);
            return sendRedirect(res, null, '構成が保存されました。');
        } else if (action === ACTION_SUBMIT_WORKSPACE) {
            const config = await getConfig(installationId);
            const personalAccessToken = get(config, 'personalAccessToken', null);
            const workspaces = await fetchWorkspaces(personalAccessToken);
            const workspaceId = parseWorkspaceIdFromProps(payload, workspaces);
            await saveConfiguration(installationId, null, workspaceId);
            return sendRedirect(res, null, 'Configuration has been saved.');
        }
    } catch (error) {
        return sendNotification(res, `構成の保存中にエラーが発生しました。 ${defaultTo(error.message, '')}`);
    }


    const config = await getConfig(installationId);
    const personalAccessToken = get(config, 'personalAccessToken', null);
    if (personalAccessToken === null) {
        return sendNeedsConfiguration(res, hasFullAccess);
    }

    const pageId = get(payload, 'page_id', null);
    if (pageId !== null && pageId.startsWith(`${PAGE_ID_FORM}/`) && get(pageId.split('/'), '[1]', '').length > 0) {
        try {
            const formId = get(pageId.split('/'), '[1]', '');
            const form = await getForm(personalAccessToken, formId);
            return sendPage(res, 200, renderFormPage(form.title, get(form, '_links.display', null)));
        } catch (error) {
        }
    } else if (pageId === PAGE_ID_SETTINGS) {
        return sendPage(res, 200, renderSettingsForm());
    } else if (pageId === PAGE_ID_SELECT_WORKSPACE) {
        if (hasFullAccess) {
            const workspaces = await fetchWorkspaces(personalAccessToken);
            return sendPage(res, 200, renderWorkspaceSelector(get(workspaces, 'items', [])));
        } else {
            return sendNotYetConfigured(res);
        }
    }

    const workspaceId = get(config, 'workspaceId', null);
    if (workspaceId === null) {
        if (hasFullAccess) {
            const workspaces = await fetchWorkspaces(personalAccessToken);
            return sendPage(res, 200, renderWorkspaceSelector(get(workspaces, 'items', [])));
        } else {
            return sendNotYetConfigured(res);
        }
    }

    try {
        const forms = await getForms(personalAccessToken, workspaceId);
        return sendPage(res, 200, renderActiveForms(get(forms, 'items', []), hasFullAccess));
    } catch (e) {
        return sendPage(res, 200, renderActiveForms([], hasFullAccess));
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

const sendNeedsConfiguration = (res, hasFullAccess) => {
    if (hasFullAccess) {
        sendPage(res, 200, renderSettingsForm());
    } else {
        sendNotYetConfigured(res);
    }
}

const sendNotYetConfigured = (res) => {
    sendMessage(res, 501, 'この統合はまだ構成されていません。 フルアクセス権限を持つユーザーのみが実行できます。');
}

const getConfig = async (installationId) => {
    const config = await loadConfiguration(installationId);
    if (config) {
        const data = get(config, 'data', null);
        return data;
    }
    return null;
}

const hasAccess = (payload) => {
    return get(payload, 'permissions', []).length > 0;
}

const parseAccessTokenFromProps = (payload) => {
    const personalAccessToken = getPropValue(payload.props, 'personal_access_token');
    if (personalAccessToken === '') {
        throw new Error('パーソナルアクセストークンを入力してください。');
    }
    return personalAccessToken;
}

const parseWorkspaceIdFromProps = (payload, workspaces) => {
    const workspaceSelectedIndex = getPropValue(payload.props, 'workspace_selected_index');
    const workspaceId = get(workspaces, `items[${workspaceSelectedIndex}].id`, null);
    if (workspaceId === null) {
        throw new Error('ワークスペースを選択してください。');
    }
    return workspaceId;
}

const getPropValue = (props, name) => {
    return get(find(props, (prop) => get(prop, 'name', '') === name), 'value', '');
}

const renderSettingsForm = (personalAccessToken) => {
    return {
        title: 'セッティング',
        props: [
            {
                name: 'personal_access_token',
                type: 'text', value: personalAccessToken
            },
        ],
        blocks: [
            {
                type: 'heading1',
                value: 'ようこそ!'
            },
            {
                type: 'text',
                value: 'このインテグレーションは、オンラインフォームおよび調査サービスである[タイプフォーム](https://www.typeform.com/)によって支えられています。 開始するには、以下の情報を提供してください。 [タイプフォームガイド](https://www.notion.so/withtree/Typeform-8314af0825ab4d8caec124fee95de1c0)に従って開始してください。'
            },
            {
                type: 'heading3',
                value: 'タイプフォーム構成' 
            },
            {
                type: 'input',
                bindToProp: 'personal_access_token',
                value: personalAccessToken,
                attrs: {
                    label: 'パーソナルアクセストークン',
                    placeholder: '隠す',
                    display_type: 'legend'
                }
            },
            {
                type: 'text',
                value: '👉[パーソナルアクセストークンを見つけるには？](https://www.notion.so/withtree/Typeform-8314af0825ab4d8caec124fee95de1c0)',
                attrs: {
                    size: 'small',
                    appearance: 'light'
                }
            },
            {
                type: 'spacer'
            },
            {
                type: 'button',
                value: '参加',
                attrs: {
                    action: ACTION_SUBMIT_ACCESS_KEY,
                    disabled: false
                }
            },
            {
                type: 'text',
                value: '注：フルアクセス権限を持つユーザーは、いつでもこの情報を更新できます。 メインページの下部にある「⚙️統合の構成」リンクをタップしてください。',
                attrs: {
                    size: 'small',
                    appearance: 'light'
                }
            }
        ]
    };
}

const renderWorkspaceSelector = (workspaces) => {
    if (workspaces.length === 0) {
        return {
            title: 'ワークスペースを選択',
            blocks: [
                {
                    type: 'text',
                    value: 'まだワークスペースがありません。 [Typeform]（https://admin.typeform.com/）にアクセスして作成してください。', 
                    attrs: {
                        appearance: 'light'
                    }
                }
            ]
        }
    }
    return {
        title: 'ワークスペースを選択',
        props: [
            {
                name: 'workspace_selected_index',
                type: 'number',
                value: -1
            },
        ],
        blocks: [
            {
                type: 'heading2',
                value: 'どのワークスペースを使用しますか？'
            },
            {
                type: 'spacer'
            },
            {
                'type': 'singleselect',
                'bindToProp': 'workspace_selected_index',
                'value': {
                    'items': workspaces.map((w) => w.name)
                },
                'attrs': {
                    'label': 'ワークスペースを選択してください...'
                }
            },
            {
                type: 'spacer'
            },
            {
                type: 'button',
                value: '保存',
                attrs: {
                    action: ACTION_SUBMIT_WORKSPACE,
                    disabled: false
                }
            },
            ...configureBlocks()
        ]
    };
}

const renderActiveForms = (forms, hasFullAccess) => {
    let blocks = [];
    if (defaultTo(forms, []).length === 0) {
        blocks = [
            {
                type: 'heading2',
                value: 'アクティブな投票はありません。'
            },
        ]
    } else {
        blocks = [
            {
                type: 'heading2',
                value: 'アクティブ投票'
            },
            {
                type: 'spacer'
            },
            ...forms.map((form) => {
                return {
                    type: 'link',
                    value: `📋 ${defaultTo(form.title, '無題のフォーム')}`, 
                    attrs: {
                        pageId: `${PAGE_ID_FORM}/${form.id}`
                    } }
            })
        ]
    }
    if (hasFullAccess) {
        blocks = blocks.concat(configureBlocks());
    }
    return {
        title: '投票',
        blocks
    };
}

const configureBlocks = () => {
    return [
        {
            type: 'divider'
        },
        {
            type: 'link',
            value: '⚙️ インテグレーション構成',
            attrs: {
                pageId: PAGE_ID_SETTINGS
            }
        },
        {
            type: 'link',
            value: '🗂 ワークスペースを選択',
            attrs: {
                pageId: PAGE_ID_SELECT_WORKSPACE
            }
        },
    ];
}

const renderFormPage = (name, url) => {
    return {
        title: defaultTo(name, '無題のフォーム'),
        blocks: [
            {
                type: 'typeform',
                value: url,
                attrs: {
                    fullscreen: true
                }
            }
        ]
    };
}

module.exports = cors(handler)
