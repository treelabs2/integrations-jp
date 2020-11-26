# Treeインテグレーション: 本日のアジェンダ

この例は、OAuth2.0を介してユーザーのGoogleカレンダーからイベントを取得する方法を示しています。

## 前提条件

- [Node.js](https://nodejs.org)
- [Now CLI](https://zeit.co/download)
- [ngrok](https://ngrok.com)
- [Google OAuth Client Setup](https://console.developers.google.com)
- [FaunaDB](https://dashboard.fauna.com)

## ローカルで実行

Google Developer ConsoleとFaunaDBで構成された適切な値を使用して、 `now.json`で指定された変数を使用して` .env`ファイルを作成します。

次に、このUIフックをローカルで実行します。:

```bash
now dev
```

次に、ngrokを使用してポート3000でローカルホストへのトンネルを作成します。:

```bash
ngrok http 3000
```

ngrokによって作成された転送URL（「.ngrok.io」で終わる）をメモしておいてください。

次に、[Treeインテグレーション](https://treedocs.now.sh/docs/v1/getting-started/)を作成し、UIフックURLをngrok転送URLに設定します。

これで、Treeモバイルアプリにログインして、インテグレーションの動作を確認できます。

## 今すぐ展開

`now.json`で参照されるシークレット（`@`で始まる値）を追加します。

```bash
now secrets add @<secret-name> <secret-value>
```

次に、ユーザープロンプトに従って、Nowにデプロイします。：

```bash
now
```

## ライセンス

Treeドキュメントは、[MITLicense](https://github.com/treelabs/integrations/blob/master/LICENSE.md)の下でリリースされたオープンソースプロジェクトです。
