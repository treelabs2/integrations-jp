exports.page = {
    props: [
        {
            name: 'local_code',
            value: 'https://withtree.com'
        },
        {
            name: 'remote_code',
            value: 'https://withtree.com'
        }
    ],
    blocks: [
        {
            type: 'heading2',
            value: 'QRコード'
        },
        {
            type: 'divider'
        },
        {
            type: 'heading4',
            value: 'ランダムに生成'
        },
        {
            type: 'qr',
            value: '${prop("local_code")}'
        },
        {
            type: 'spacer'
        },
        {
            type: 'button',
            value: '新規生成',
            attrs: {
                fill: true,
                onClick: {
                    action: 'updateProps',
                    payload: {
                        props: [
                            {
                                name: 'local_code',
                                newValue: 'code:${toString(rand())}'
                            }
                        ]
                    }
                }
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading4',
            value: 'リモートエンドポイントから取得'
        },
        {
            type: 'qr',
            value: '${prop("remote_code")}'
        },
        {
            type: 'spacer'
        },
        {
            type: 'button',
            value: '新規生成',
            attrs: {
                fill: true,
                onClick: {
                    action: 'fetch',
                    payload: {
                        url: 'https://httpbin.org/get?q=${round(multiply(rand(), pow(10,10)))}'
                    },
                    onSuccess: {
                        action: 'updateProps',
                        payload: {
                            props: [
                                {
                                  name: 'remote_code',
                                  newValue: 'https://withtree.com/code=${get(get(response, "args"), "q")}'
                                }
                            ]
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
        }
    ]
}
