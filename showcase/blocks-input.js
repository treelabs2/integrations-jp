exports.page = {
    title: 'Input',
    blocks: [
          {
                    type: 'input',
                    bindToProp: 'firstName',
                    attrs: {
                        label: '名前'
                    }
                },
                {
                    type: 'input',
                    bindToProp: 'lastName',
                    attrs: {
                        label: '苗字'
                    }
                },
                {
                    type: 'button',
                    value: 'Submit',
                    attrs: {
                        onClick: {
                            action: 'post',
                            payload: {
                                url: 'https://httpbin.org/post',
                                params: {
                                    firstName: '${prop("firstName")}',
                                    lastName: '${prop("lastName")}'
                                }
                            },
                            onSuccess: {
                                action: 'notify',
                                payload: {
                                    message: 'Success. Response: ${response}.'
                                }
                            },
                            onError: {
                                action: 'notify',
                                payload: {
                                    message: 'Error: ${get(error, "message")}'
                                }
                            }
                        }
                    }
                },
        {
            type: 'heading2',
            value: 'Input'
        },
        {
            type: 'divider',
        },
        {
            type: 'heading3',
            value: 'ボタン'
        },
        {
            type: 'button',
            value: '成功',
            attrs: {
                type: 'success'
            }
        },
        {
            type: 'button',
            value: 'エラー',
            attrs: {
                type: 'error'
            }
        },
        {
            type: 'button',
            value: '危険',
            attrs: {
                type: 'warning'
            }
        },
        {
            type: 'button',
            value: 'Secondary',
            attrs: {
                type: 'secondary'
            }
        },
        {
            type: 'button',
            value: 'テキスト',
            attrs: {
                type: 'text'
            }
        },
        {
            type: 'button',
            value: '無効',
            attrs: {
                disabled: true
            }
        },
        {
            type: 'heading4',
            value: 'サイズ'
        },
        {
            type: 'button',
            value: '小',
            attrs: {
                type: 'success',
                size: 'small'
            }
        },
        {
            type: 'button',
            value: '中',
            attrs: {
                type: 'success',
                size: 'normal'
            }
        },
        {
            type: 'button',
            value: '大',
            attrs: {
                type: 'success',
                size: 'large'
            }
        },
        {
            type: 'divider',
        },
        {
            type: 'heading3',
            value: '入力'
        },
        {
            type: 'input',
            attrs: {
                placeholder: 'Enter your name',
                label: 'Name',
                capitalize: 'characters'
            }
        },
        {
            type: 'input',
            value: '123456',
            attrs: {
                label: 'Password',
                secure: true
            }
        },
        {
            type: 'input',
            value: '無効',
            attrs: {
                label: 'Status',
                disabled: true
            }
        },
        {
            type: 'heading4',
            value: 'コメント'
        },
        {
            type: 'input',
            attrs: {
                placeholder: 'Enter a comment',
                multiline: true
            }
        },
        {
            type: 'heading3',
            value: '選択'
        },
        {
            type: 'singleselect',
            value: {
                items: [
                    'Rock',
                    'Scissor',
                    'Paper'
                ]
            },
            attrs: {
                label: 'Select a hand...'
            }
        },
        {
            type: 'multiselect',
            value: {
                items: [
                    'ハノイ',
                    'カイロ',
                    'ロサンゼルス',
                    'サンフランシスコ',
                    'パリ'
                ]
            },
            attrs: {
                label: 'Select cities...'
            }
        },
        {
            type: 'switch',
            value: true,
            attrs: {
                label: 'Dark Mode'
            }
        },
        {
            type: 'divider',
        },
        {
            type: 'heading3',
            value: 'Date Picker'
        },
        {
            type: 'datepicker',
            attrs: {
                label: 'Pick a date and time range...',
                allowEndDate: true,
                allowTime: true
            }
        },
        {
            type: 'datepicker',
            attrs: {
                label: 'Pick a single date...',
                allowEndDate: false,
                allowTime: false
            }
        }
    ]
}
