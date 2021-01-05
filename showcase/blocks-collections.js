exports.page = {
    title: 'Collections',
    props: [
        {
            name: 'photos',
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
            type: 'divider',
        },
        {
            type: 'heading3',
            value: 'ギャラリービュー'
        },
        {
            type: 'collection',
            value: '${prop("photos")}',
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
                    ]
                }
            }
        },
        {
            type: 'collection',
            value: '${prop("photos")}',
            attrs: {
                viewType: 'gallery',
                itemSize: 'large',
                renderItem: {
                    blocks: [
                        {
                            type: 'image',
                            value: '${get(item, "photo")}',
                            attrs: {
                                format: 'square'
                            }
                        },
                    ]
                }
            }
        },
        {
            type: 'divider',
        },
        {
            type: 'heading3',
            value: 'リストビュー'
        },
        {
            type: 'collection',
            value: '${prop("photos")}',
            attrs: {
                viewType: 'list',
                renderItem: {
                    blocks: [
                        {
                            type: 'image',
                            value: '${get(item, "photo")}',
                            attrs: {
                                format: 'landscape',
                                caption: '${get(item, "title")}'
                            }
                        },
                    ]
                }
            }
        },
        {
            type: 'divider',
        },
        {
            type: 'heading3',
            value: '非同期データソース'
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
                        {
                            type: 'button',
                            value: 'Join',
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
    ]
}
