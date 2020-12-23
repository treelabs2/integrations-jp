var http = require('http');

const page = {
    props: [
        {
            name: 'news',
            type: 'array',
            value: {
                items: [
                    {
                        title: '森',
                        photo: 'https://source.unsplash.com/800x600/?forest',
                    },
                    {
                        title: '海',
                        photo: 'https://source.unsplash.com/800x600/?beach',
                    },
                    {
                        title: '山',
                        photo: 'https://source.unsplash.com/800x600/?mountain',
                    },
                    {
                        title: '砂漠',
                        photo: 'https://source.unsplash.com/800x600/?desert',
                    }
                ]
            }
        },
    ],
    blocks: [
        {
            type: 'heading2',
            value: '非同期フェッチ'
        },
        {
            type: 'collection',
            value: '${prop("news")}',
            attrs: {
                viewType: 'gallery',
                itemSize: 'small',
                renderItem: {
                    blocks: [
                        {
                            type: 'image',
                            value: '${get(item, "photo")}',
                            attrs: {
                                format: 'square',
                            }
                        },
                        {
                            type: 'button',
                            value: '参加',
                            attrs: {
                                fill: true,
                                onClick: {
                                    action: 'notify',
                                    payload: {
                                        message: "参加しました！"
                                    }
                                }
                            }
                        },
                    ]
                }
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading2',
            value: '非同期フェッチ'
        },
        {
            type: 'collection',
            value: {
                source: 'https://picsum.photos/v2/list?limit=10&page=${round(10*rand())}'
            },
            attrs: {
                viewType: 'gallery',
                itemSize: 'medium',
                renderItem: {
                    blocks: [
                        {
                            type: 'image',
                            value: '${get(item, "download_url")}',
                            attrs: {
                                format: 'square',
                                caption: '著者: ${get(item, "author")}',
                            }
                        },
                    ]
                }
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading2',
            value: 'ボタングリッド'
        },
        {
            type: 'collection',
            value: {
                items: [
                    {
                        label: 'アクション 1',
                        pageId: '1'
                    },
                    {
                        label: 'アクション 2',
                        pageId: '2'
                    },
                    {
                        label: 'アクション 3',
                        pageId: '3'
                    },
                    {
                        label: 'アクション 4',
                        pageId: '4'
                    }
                ],
            },
            attrs: {
                viewType: 'gallery',
                itemSize: 'medium',
                renderItem: {
                    blocks: [
                        {
                            type: 'button',
                            value: '${get(item, "label")}',
                            attrs: {
                                fill: true,
                            }
                        },
                    ]
                }
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading2',
            value: 'リストビュー'
        },
        {
            type: 'collection',
            value: '${prop("news")}',
            attrs: {
                viewType: 'list',
                renderItem: {
                    blocks: [
                        {
                            type: 'heading3',
                            value: '${get(item, "title")}'
                        },
                        {
                            type: 'image',
                            value: '${get(item, "photo")}',
                            attrs: {
                                format: 'landscape'
                            }
                        },
                        {
                            type: 'link',
                            value: 'さらに見る →',
                            attrs: {
                                url: '${get(item, "photo")}'
                            }
                        },
                    ]
                }
            }
        }
    ]
};

var app = http.createServer(function (req, res) {
    // Enable CORS, so that clients can call the Hook.
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers',
        'Authorization, Accept, Content-Type')

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(page));
})

app.listen(process.argv[2] || 3000);
