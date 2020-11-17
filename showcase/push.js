exports.page = {
    props: [
         {
      "name": "agreement",
      "type": "text"
    },
        {
      "name": "title",
      "type": "text"
    },
    {
      "name": "subtitle",
      "type": "text"
    },
    {
      "name": "message",
      "type": "text"
    },
        {
            name: 'local_code',
            value: 'https://withtree.com'
        },
        {
            name: 'remote_code',
            value: 'https://withtree.com'
        },
        {
            name: 'firstName',
            type: 'text',
            value: 'firstName'
        },
        {
            name: 'lastName',
            type: 'text',
                    value: 'lastName'
        },
        {
            name: 'accepted',
            type: 'boolean',
            value: false
        },
        {
            name: 'hands',
            type: 'array',
            value: []
        },
        {
            name: 'eventDate',
            type: 'date',
            value: {
                startDate: '2020-03-20T00:00:00+01',
                endDate: '2020-03-24T00:00:00+01',
                includeTime: false,
            },
        },
        {
            name: 'name',
            type: 'string',
            value: ''
        },
        {
            name: 'icon',
            type: 'number',
            value: 0
        },
        {
            name: 'image',
            type: 'number',
            value: 0
        }
        
    ],
    blocks: [
    {
            type: 'link',
            value: 'Documentation: Actions →',
            attrs: {
                url: 'https://treedocs.vercel.app/docs/v1/hooks/ui/actions/'
            }
        },
         {
                type: 'text',
                value: '送信グループ選択'
            },
        {
    "type": "dropdown",
    "value": {
        "items": ["全員",],
    },
     "attrs": {
                disabled: true
            }
},
         {
      "type": "text",
      "value": "送信内容"
    },
    {
      "type": "input",
      "attrs": {
        "placeholder": "タイトルを入力してください"
      },
      "bindToProp": "title"
    },
    {
      "type": "input",
      "attrs": {
        "placeholder": "サブタイトルを入力してください"
      },
      "bindToProp": "subtitle"
    },
    {
      "type": "input",
      "attrs": {
        "placeholder": "メッセージを入力してください"
      },
      "bindToProp": "title"
    },
    {
      "type": "text",
      "value": "確認"
    },
    {
      "type": "dropdown",
      "value": {
        "items": ["", "PUSH通知を送信する"],
        "selectedIndex": 0
      },
      "bindToProp": "agreement"
    },
         {
            type: 'button',
            value: 'PUSH通知を送ります',
            "disabled": "${if(or(isEmpty(prop('message')), isEmpty(prop('agreement'))), true, false)}",
            attrs: {
                "disabled": "${if(or(isEmpty(prop('message')), isEmpty(prop('agreement'))), true, false)}",
                onClick: {
                    action: 'post',
                    payload: {
                        url: 'https://*********/api/v1/sendPush/',
                        params: {
                            message: '239399dklwiudsljewjljewewjlew',test:'ssssssssssssss',
                            firstName: '${prop("firstName")}',
                            lastName: '${prop("lastName")}'
                        }
                    },
                    onSuccess: {
                        action: 'notify',
                        payload: {
                            message: 'Success. Got back: ${get(get(response, "json"), "message")}.'
                        }
                    },
                    onError: {
                        action: 'notify',
                        payload: {
                            message: 'Error: ${get(error, "message")}'
                        }
                    }
                },
            }
        },
      
    ]
}
