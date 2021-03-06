# Treeインテグレーション: カウンター

[アクション](https://treedocs.now.sh/docs/v1/hooks/ui/actions)の例として、カウンターをインクリメントするボタンを備えたページを提供する[UIフック](https://treedocs.now.sh/docs/v1/hooks/ui/introduction/)。

## 前提条件

- [Node.js](https://nodejs.org)
- [ngrok](https://ngrok.com)

## ローカルで実行

次のコマンドを使用して、UIフックをローカルで実行します。:

```bash
node index.js 3000
```

次に、ngrokを使用してポート3000でローカルホストへのトンネルを作成します。:

```bash
ngrok http 3000
```

ngrokによって作成された転送URL（「.ngrok.io」で終わる）をメモしておいてください。

次に、[Treeインテグレーション](https://treedocs.now.sh/docs/v1/getting-started/)を作成し、UIフックURLをngrok転送URLに設定します。

これで、Treeモバイルアプリにログインして、インテグレーションの動作を確認できます。