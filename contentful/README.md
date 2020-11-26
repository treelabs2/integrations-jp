# Treeインテグレーション: Contentful

[Contentful](https://www.contentful.com/)で作成されたページを提供する[UIフック](https://treedocs.now.sh/docs/v1/hooks/ui/introduction/)。.

## 前提条件

- [Node.js](https://nodejs.org)
- [ngrok](https://ngrok.com)

## ローカルで実行

次のコマンドを使用して、UIフックをローカルで実行します。:

```bash
npm start
```

次に、ngrokを使用してポート3000でローカルホストへのトンネルを作成します。:

```bash
ngrok http 3000
```

ngrokによって作成された転送URL（「.ngrok.io」で終わる）をメモしておいてください。

次に、[Treeインテグレーション](https://treedocs.now.sh/docs/v1/getting-started/)を作成し、UIフックURLをngrok転送URLに設定します。

これで、Treeモバイルアプリにログインして、インテグレーションの動作を確認できます。

### FaunaDBへのアクセス

`.env`という名前のファイルを作成し、以下を追加します。:

```
FAUNADB_TYPEFORM_SECRET_KEY=<your_secret_key>
```

このファイルは必ずgitignoreしてください。

## 今すぐ展開

FaunaDBのsecret keyをNowに追加します。:

```bash
now secrets add FAUNADB_TYPEFORM_SECRET_KEY <your_secret_key>
```

## UIフック

このインテグレーションのインスタンスは次の場所で実行されています。:

```
https://tree-contentful-integration.now.sh
```

事前定義されたContentfulエントリでこのインテグレーションを使用する場合は、インテグレーションのUIフックのURLでそれらを指定するだけです。

```
https://tree-contentful-integration.now.sh?\
    spaceId=<your_contentful_space_id>&\
    accessToken=<your_contentful_access_token>&\
    entryId=<your_contentful_entry_id>
```