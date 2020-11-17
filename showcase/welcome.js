exports.page = {
    blocks: [
        {
            type: 'heading2',
            value: 'Showcase from git 一定間隔で更新　画面確認用',
        },
        {
            type: 'collection',
            value: {
                items: [
                    'Actions',
                    'Collections',
                    'Operators',
                ]
            },
            attrs: {
                viewType: 'gallery',
                itemSize: 'medium',
                renderItem: {
                    blocks: [
                        {
                            type: 'button',
                            value: '${item}',
                            attrs: {
                                fill: 'true',
                                onClick: {
                                    action: 'open',
                                    payload: {
                                        pageId: '${lowercase(item)}'
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: 'Examples',
        },
        {
            type: 'link',
            value: 'Blocks Gallery',
            attrs: {
                pageId: 'blocks',
                iconUrl: 'https://img.icons8.com/color/48/000000/stack-of-photos.png'
            }
        },
        {
            type: 'link',
            value: 'PUSHTEST',
            attrs: {
                pageId: 'push',
                iconUrl: 'https://img.icons8.com/color/48/000000/stack-of-photos.png'
            }
        },
        {
            type: 'link',
            value: 'QR Code',
            attrs: {
                pageId: 'qr',
                iconUrl: 'https://img.icons8.com/color/48/000000/qr-code.png'
            }
        },
    ]
}
