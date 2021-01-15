exports.page = {
    title: 'Media',
    props: [
        {
            type: 'text',
            name: 'photo_url',
            value: 'https://images.unsplash.com/photo-1496776574435-bf184935f729'
        }
    ],
    blocks: [
        {
            type: 'heading2',
            value: 'メディア'
        },
        {
            type: 'divider',
        },
        {
            type: 'heading3',
            value: 'イメージ'
        },
        {
            type: 'image',
            value: '${prop("photo_url")}',
            attrs: {
                caption: 'カリフォルニア州ミルバレーの木々（クリックして開く）。',
                format: 'landscape',
                onClick: {
                    action: 'open',
                    payload: {
                        url: 'https://withtree.com'
                    }
                }
            }
        },
        {
            type: 'image',
            value: ['https://images.unsplash.com/photo-1496776574435-bf184935f729','https://images.unsplash.com/photo-1496776574435-bf184935f729','https://images.unsplash.com/photo-1496776574435-bf184935f729'],
            attrs: {
                format: 'square',
                caption: 'スクエア'
            }
        },
        {
            type: 'image',
            value: '${prop("photo_url")}',
            attrs: {
                format: 'original',
                caption: 'オリジナル'
            }
        },
        {
            type: 'divider',
        },
        {
            type: 'heading3',
            value: 'QRコード'
        },
        {
            type: 'qr',
            value: 'https://withtree.com'
        }
    ]
}
