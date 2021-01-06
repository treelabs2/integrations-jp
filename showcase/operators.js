const WEEKDAYS = ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'];
const PHRASE = 'Workwellへようこそ';
const ICONS = ['calendar', 'christmas-tree', 'faq'];
const IMAGES = {
    Mountain: {
        url: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        caption: 'スイスのヴェルビエで撮影された美しい日の出。'
    },
    Forest: {
        url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        caption: 'カリフォルニア州ミルバレーの森。'
    },
    Beach: {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2106&q=80',
        caption: 'ドミニカ共和国、プンタカナの白い砂浜。'
    }
};
const IMAGE_URLS = Object.keys(IMAGES).map((key) => { return IMAGES[key].url; });
const IMAGE_CAPTIONS = Object.keys(IMAGES).map((key) => { return IMAGES[key].caption; });

exports.page = {
    props: [
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
            type: 'heading2',
            value: 'オペレーター'
        },
        {
            type: 'link',
            value: 'Documentation: Operators →',
            attrs: {
                url: 'https://treedocs.vercel.app//docs/v1/advanced/operators/'
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: 'ブール演算子'
        },
        {
            type: 'switch',
            value: false,
            bindToProp: 'accepted',
            attrs: {
                label: 'Accept Terms'
            }
        },
        {
            type: 'button',
            value: '継続する',
            attrs: {
                disabled: '${not(prop("accepted"))}',
                onClick: {
                    action: 'notify',
                    payload: {
                        message: 'Terms accepted at ${format(now(), "HH:mm")}',
                        type: 'success'
                    }
                }
            }
        },
        {
            type: 'text',
            value: 'Status: ${if(prop("accepted"), "Thank you!", "Please accept the terms")}',
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: '日付と算術演算子'
        },
        {
            type: 'callout',
            value: `Today is day **\${weekday(today())}** of the week. It is **\${elementAt(${JSON.stringify(WEEKDAYS)}, weekday(today())-1)}**. In 697 days, it will be a **\${elementAt(${JSON.stringify(WEEKDAYS)}, weekday(addToDate(today(), 697, "days")))}**, and the 9th digit of π divided by *e* is **\${mod(floor(multiply(pow(10,9), divide(pi(), exp()))), 10)}**. If we replace "Workwell" with "Tree" in "${PHRASE}", we get **"\${replace("${PHRASE}", "Workwell", "Tree")}"**.`,
            attrs: {
                type: 'info'
            }
        },
        {
            type: 'heading5',
            value: '開催日',
        },
        {
            type: 'datepicker',
            value: {
                startDate: '2020-03-20T00:00:00+01',
                endDate: '2020-03-24T00:00:00+01',
                includeTime: false,
            },
            attrs: {
                label: 'Select event date...',
                allowEndDate: true,
                allowTime: true,
            },
            bindToProp: 'eventDate',
        },
        {
            type: 'text',
            value: `Event lasts **\${if(
                    not(isEmpty(get(prop("eventDate"), "endDate"))),
                    round(dateDifference(
                        get(prop("eventDate"), "endDate"),
                        get(prop("eventDate"), "startDate"),
                        "days"
                    )) + 1,
                    "1"
                )}** day(s).`,
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: '文字列演算子'
        },
        {
            type: 'input',
            bindToProp: 'name',
            attrs: {
                placeholder: 'Enter your name',
                label: 'Name'
            }
        },
        {
            type: 'input',
            attrs: {
                placeholder: 'Enter a password',
                label: 'Password',
                disabled: false,
                secure: true,
            }
        },
        {
            type: 'input',
            value: 'アクティブ',
            attrs: {
                label: 'Status',
                disabled: true,
            }
        },
        {
            type: 'button',
            value: '保存',
            attrs: {
                type: 'success',
                disabled: '${smallerThan(length(prop("name")), 3)}',
                onClick: {
                    action: 'notify',
                    payload: {
                        message: '保存されました!',
                        type: 'success'
                    }
                }
            }
        },
        {
            type: 'text',
            value: '${if(smallerThan(length(prop("name")), 3), "3文字以上の名前を入力してください", "入力はOKです👍")}',
            attrs: {
                appearance: 'light',
                size: 'small'
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: '配列演算子'
        },
        {
            type: 'heading5',
            value: 'Hands',
        },
        {
            type: 'multiselect',
            value: {
                items: ['Rock', 'Scissors', 'Paper'],
            },
            bindToProp: 'hands',
            attrs: {
                label: 'Select one or more hands...',
            }
        },
        {
            type: 'text',
            value: 'You have selected **${if(isEmpty(prop("hands")), "no", length(prop("hands")))}** hands.',
        },
        {
            type: 'divider'
        },
        {
            type: 'heading5',
            value: 'Theme',
        },
        {
            type: 'singleselect',
            value: {
                items: ICONS,
            },
            bindToProp: 'icon',
            attrs: {
                label: 'アイコンを選択してください...',
            }
        },
        {
            type: 'link',
            value: 'マイアイテム',
            attrs: {
                iconUrl: `https://img.icons8.com/color/48/000000/\${elementAt(${JSON.stringify(ICONS)}, prop("icon"))}.png`
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading5',
            value: 'イメージ',
        },
        {
            type: 'singleselect',
            value: {
                items: Object.keys(IMAGES),
                selectedIndex: 0
            },
            bindToProp: 'image',
            attrs: {
                label: 'イメージを選択してください...',
            }
        },
        {
            type: 'image',
            value: `\${elementAt(${JSON.stringify(IMAGE_URLS)}, prop("image"))}`,
            attrs: {
                format: 'square',
                caption: `\${elementAt(${JSON.stringify(IMAGE_CAPTIONS)}, prop("image"))}`,
            }
        }
    ]
}
