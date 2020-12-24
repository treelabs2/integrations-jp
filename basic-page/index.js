var http = require('http');

var app = http.createServer(function (req, res) {
    // Enable CORS, so that clients can call the Hook.
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers',
        'Authorization, Accept, Content-Type')
    
    if (req.method !== 'POST') {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Not found');
        res.end();
    }

    var page = {
        blocks: [
            {
                type: 'image',
                value: 'https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
                attrs: {
                    format: 'landscape'
                }
            },
            {
                type: 'heading1',
                value: 'ようこそ'
            },
            {
                type: 'text',
                value: '最初のページです!'
            },
            {
                type: 'bulletedlist',
                value: ['箇条書き１', '箇条書き２', '箇条書き３']
            },
            {
                type: 'divider'
            },
            {
                type: 'quote',
                value: '引用'
            },
            {
                type: 'heading3',
                value: 'セクション見出し'
            },
            {
                type: 'text',
                value: 'そして、複数の行にまたがるいくつかの長い文章。'
            }
        ]
    };

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(page));
})

app.listen(process.argv[2] || 3000);
