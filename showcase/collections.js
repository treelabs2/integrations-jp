exports.page = {
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
            value: 'コレクション'
        },
        {
            type: 'link',
            value: 'ドキュメント：コレクション→',
            attrs: {
                url: 'https://treedocs.vercel.app//docs/v1/blocks/collection/'
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: '修正項目'
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
                                format: 'square'
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
                                        message: "参加しました!"
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
            type: 'heading3',
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
                                caption: 'Author: ${get(item, "author")}',
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
            type: 'heading3',
            value: 'ボタングリッド'
        },
        {
            type: 'collection',
            value: {
                items: [
                    {
                        label: 'Action 1',
                        pageId: '1'
                    },
                    {
                        label: 'Action 2',
                        pageId: '2'
                    },
                    {
                        label: 'Action 3',
                        pageId: '3'
                    },
                    {
                        label: 'Action 4',
                        pageId: '4'
                    }
                ],
            },
            attrs: {
                viewType: 'gallery',
                itemSize: 'large',
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
            type: 'heading3',
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
                            value: 'もっと見る →',
                            attrs: {
                                url: '${get(item, "photo")}'
                            }
                        },
                    ]
                }
            }
        }
    ]
}
