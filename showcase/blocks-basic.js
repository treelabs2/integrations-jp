exports.page = {
    title: 'Basic',
    blocks: [
        {
            type: 'heading2',
            value: 'Basic Blocks基本のブロック'
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: 'Textテキスト'
        },
        {
            type: 'text',
            value: 'Textテキスト'
        },
        {
            type: 'text',
            value: 'Light text軽いテキスト',
            attrs: {
                appearance: 'light'
            }
        },
        {
            type: 'text',
            value: 'Danger text危険テキスト',
            attrs: {
                appearance: 'danger'
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: 'Headings見出し'
        },
        {
            type: 'heading1',
            value: 'Big and small大と小'
        },
        {
            type: 'divider'
        },
        {
            type: 'bulletedlist',
            value: [ 'Bullet箇条書き１', 'Lists箇条書き２']
        },
        {
            type: 'numberedlist',
            value: [ 'Numbered数字付きリスト１', 'Lists数字付きリスト２']
        },
        {
            type: 'quote',
            value: 'Alone we go fast, together we go far.一人で速く行き、一緒に遠くへ行きます。'
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: 'Callouts吹き出し'
        },
        {
            type: 'callout',
            value: 'This is an note with an info message.これはインフォメッセージ付きのメモです。',
            attrs: {
                type: 'info'
            }
        },
        {
            type: 'callout',
            value: 'This is an note with a success message.これはサクセスメッセージ付きのメモです。',
            attrs: {
                type: 'success'
            }
        },
        {
            type: 'callout',
            value: 'This is an note with a warning message.これは警告メッセージ付きのメモです。',
            attrs: {
                type: 'warning'
            }
        },
        {
            type: 'callout',
            value: 'This is an note with an error message.これはエラーメッセージ付きのメモです。',
            attrs: {
                type: 'error'
            }
        },
        {
            type: 'callout',
            value: 'This is an note with a ~~custom icon~~ and **Markdown**.これは ~~カスタムアイコン~~ と **マークダウン** が付いたメモです。',
            attrs: {
                iconUrl: 'https://img.icons8.com/color/48/000000/accessibility2--v1.png'
            }
        },
        {
            type: 'callout',
            value: 'This is a note with small text.これは小さなテキストのメモです。',
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
            value: 'Codeコード'
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
            value: 'Linksリンク'
        },
        {
            type: 'link',
            value: 'Plain Linkプレーンなリンク',
            attrs: {
                pageId: 'welcome'
            }
        },
        {
            type: 'link',
            value: 'Link with Custom Icon カスタムアイコンとリンク',
            attrs: {
                url: 'https://withtree.com',
                iconUrl: 'https://img.icons8.com/color/48/000000/gallery.png'
            }
        },
        {
            type: 'link',
            value: 'Large Link with Image　画像付きの大きなリンク',
            attrs: {
                url: 'https://withtree.com',
                size: 'large',
                subtitle: 'Available in 10 min',
                iconUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80'
            }
        },
        {
            type: 'button',
            value: 'Button Link　ボタンリンク',
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
