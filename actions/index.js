var http = require('http');

const page = {
    props: [
        {
            name: 'counter',
            value: 1
        }
    ],
    blocks: [
        {
            type: 'button',
            value: '通知',
            attrs: {
                onClick: {
                    action: 'notify',
                    payload: {
                        message: 'Notification sent ${format(today())}.',
                        type: 'success'
                    }
                }
            }
        },
        {
            type: 'button',
            value: 'URLを開く',
            attrs: {
                onClick: {
                    action: 'open',
                    payload: {
                        url: 'https://withtree.com'
                    }
                }
            }
        },
        {
            type: 'button',
            value: 'ページを開く',
            attrs: {
                onClick: {
                    action: 'open',
                    payload: {
                        pageId: '1'
                    }
                }
            }
        },
        {
            type: 'button',
            value: 'カウンター ${prop("counter")}',
            attrs: {
                onClick: {
                    action: 'updateProps',
                    payload: {
                        props: [
                            {
                                name: 'counter',
                                newValue: '${add(prop("counter"), 1)}'
                            }
                        ]
                    }
                }
            }
        },
        {
            type: 'button',
            value: '写真を取得',
            attrs: {
                onClick: {
                    action: 'fetch',
                    payload: {
                        url: 'https://picsum.photos/v2/list?limit=10',
                    },
                    onSuccess: {
                        action: 'notify',
                        payload: {
                            message: '成功: got ${length(response)} results.'
                        }
                    },
                    onError: {
                        action: 'notify',
                        payload: {
                            message: '${get(error, "message")}'
                        }
                    }
                }
            }
        },
        {
            type: 'button',
            value: 'ピン',
            attrs: {
                onClick: {
                    action: 'post',
                    payload: {
                        url: 'https://httpbin.org/post',
                        params: {
                            message: 'ピン'
                        }
                    },
                    onSuccess: {
                        action: 'notify',
                        payload: {
                            message: '成功。 Got back: ${get(get(response, "json"), "message")}.'
                        }
                    },
                    onError: {
                        action: 'notify',
                        payload: {
                            message: 'エラー: ${get(error, "message")}'
                        }
                    }
                }
            }
        },
        {
            type: 'image',
            value: 'https://source.unsplash.com/800x600/?forest',
            attrs: {
                format: 'landscape',
                caption: '画像はクリック時にアクションを実行することもできます。',
                onClick: {
                    action: 'open',
                    payload: {
                        url: 'https://withtree.com'
                    }
                }
            }
        }
    ]
};

var app = http.createServer(function (req, res) {
    // Enable CORS, so that clients can call the Hook.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers',
        'Authorization, Accept, Content-Type');
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(page));
})

app.listen(process.argv[2] || 3000);
