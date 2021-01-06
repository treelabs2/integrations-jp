exports.page = {
    title: 'Blocks',
    blocks: [
        {
            type: 'heading2',
            value: 'ブロック'
        },
        {
            type: 'link',
            value: 'ベーシック',
            attrs: {
                pageId: 'blocks-basic',
                iconUrl: 'https://img.icons8.com/color/48/000000/text-color.png'
            }
        },
        {
            type: 'link',
            value: '入力',
            attrs: {
                pageId: 'blocks-input',
                iconUrl: 'https://img.icons8.com/color/48/000000/rename.png'
            }
        },
        {
            type: 'link',
            value: 'コレクション',
            attrs: {
                pageId: 'blocks-collections',
                iconUrl: 'https://img.icons8.com/color/48/000000/medium-icons.png'
            }
        },
        {
            type: 'link',
            value: 'メディア',
            attrs: {
                pageId: 'blocks-media',
                iconUrl: 'https://img.icons8.com/color/48/000000/image.png'
            }
        },
        {
            type: 'link',
            value: '埋め込み',
            attrs: {
                pageId: 'blocks-embed',
                iconUrl: 'https://img.icons8.com/color/48/000000/map-marker.png'
            }
        }
    ]
}
