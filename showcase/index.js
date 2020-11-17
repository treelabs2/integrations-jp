var http = require('http');
const fs = require('fs');
const request = require('request');

const welcome = require('./welcome');
const actions = require('./actions');
const operators = require('./operators');
const collections = require('./collections');
const blocks = require('./blocks');
const blocksBasic = require('./blocks-basic');
const blocksInput = require('./blocks-input');
const blocksCollections = require('./blocks-collections');
const blocksMedia = require('./blocks-media');
const blocksEmbed = require('./blocks-embed');
const qr = require('./qr');
const push = require('./push');

const store = {
    firstName: '',
    lastName: ''
};
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
	    return
    }

    var payload = '';
    req.on('data', function (chunk) {
        payload += chunk;
    });
    
    fs.readFile('test.jpg', 'base64', (date) => {
    let base64date = date;
    let message = "UIHOOK REQUEST FRON NODEJS" //画像の上に書きたいメッセージ

    let options = {
        uri: "https://outlook.office.com/webhook/f602d3c2-b80b-4d4b-9639-98ecfb9c9d00@b3eed7aa-69ce-49cd-8c52-5c0d5bda3eea/IncomingWebhook/e6392664847048c88e1185d3b4ce9801/cffe547b-59ea-4428-8145-4cdad2bcef06",
        headers: {
            "Content-type": "application/json",
        },
        json: {
            "text": JSON.stringify(payload)+message + "<br>" + "![]" + "(" + base64date + ")"
        }
    };
    request.post(options);  // postリクエスト送信
});

    req.on('end', function () {
        var body = JSON.parse(payload);
        var page;
        switch (body.page_id) {
            case 'actions': page = actions.page; break;
            case 'operators': page = operators.page; break;
            case 'collections': page = collections.page; break;
            case 'blocks': page = blocks.page; break;
            case 'blocks-basic': page = blocksBasic.page; break;
            case 'blocks-input': page = blocksInput.page; break;
            case 'blocks-collections': page = blocksCollections.page; break;
            case 'blocks-media': page = blocksMedia.page; break;
            case 'blocks-embed': page = blocksEmbed.page; break;
            case 'qr': page = qr.page; break;
            case 'push': page = push.page; break;
            default: page = welcome.page; break;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(page));
    });
})

app.listen(process.argv[2] || 3000);
