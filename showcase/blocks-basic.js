exports.page = {
    title: 'Basic',
    blocks: [
        {
            type: 'heading2',
            value: '基本のブロック'
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: 'テキスト'
        },
        {
            type: 'text',
            value: 'テキスト'
        },
        {
            type: 'text',
            value: '薄いテキスト',
            attrs: {
                appearance: 'light'
            }
        },
        {
            type: 'text',
            value: '赤字のテキスト',
            attrs: {
                appearance: 'danger'
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: '見出し'
        },
        {
            type: 'heading1',
            value: '大と小'
        },
        {
            type: 'divider'
        },
        {
            type: 'bulletedlist',
            value: [ '箇条書き１', '箇条書き２']
        },
        {
            type: 'numberedlist',
            value: [ '数字付きリスト１', '数字付きリスト２']
        },
        {
            type: 'quote',
            value: '速く行きたければ、ひとりで行け。遠くまで行きたければ、みんなで行け。'
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: '吹き出し'
        },
        {
            type: 'callout',
            value: 'これはインフォメッセージ付きの文章です。',
            attrs: {
                type: 'info'
            }
        },
        {
            type: 'callout',
            value: 'これはサクセスメッセージ付きの文章です。',
            attrs: {
                type: 'success'
            }
        },
        {
            type: 'callout',
            value: 'これは警告メッセージ付きの文章です。',
            attrs: {
                type: 'warning'
            }
        },
        {
            type: 'callout',
            value: 'これはエラーメッセージ付きの文章です。',
            attrs: {
                type: 'error'
            }
        },
        {
            type: 'callout',
            value: 'これは ~~カスタムアイコン~~ と **マークダウン** が付いた文章です。',
            attrs: {
                iconUrl: 'https://img.icons8.com/color/48/000000/accessibility2--v1.png'
            }
        },
        {
            type: 'callout',
            value: 'これは小さなテキストの文章です。',
            attrs: {
                type: 'info',
                small: true
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: 'コード'
        },
        {
            type: 'code',
            value: 'var http = require("http")\n\nvar app = http.createServer(function(req, res) {\n    var page = {\n        title: "My First Integration",\n        blocks: [\n            {\n                type: "text",\n                value: "Hello World!"\n            }\n        ]\n    }\n\n    res.writeHead(200, { "Content-Type": "application/json" })\n    res.end(JSON.stringify(page))\n})\n\napp.listen(process.argv[2] || 3000)'
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: 'リンク'
        },
        {
            type: 'link',
            value: 'プレーンなリンク',
            attrs: {
                pageId: 'welcome'
            }
        },
        {
            type: 'link',
            value: 'カスタムアイコンとリンク',
            attrs: {
                url: 'https://withtree.com',
                iconUrl: 'https://img.icons8.com/color/48/000000/gallery.png'
            }
        },
        {
            type: 'link',
            value: '画像付きの大きなリンク',
            attrs: {
                url: 'https://withtree.com',
                size: 'large',
                subtitle: '10分で利用可能',
                iconUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80'
            }
        },
        {
            type: 'button',
            value: 'ボタンリンク',
            attrs: {
                onClick: {
                    action: 'open',
                    payload: {
                        url: 'https://withtree.com'
                    }
                }
            }
        }
    ]
}
