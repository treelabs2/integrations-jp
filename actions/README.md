# Treeインテグレーション: アクション

[アクション](https://treedocs.now.sh/docs/v1/hooks/ui/actions/)を使用してページを動的に変更したり、外部サービスとやり取りしたりする方法を示す[UIフック](https://treedocs.now.sh/docs/v1/hooks/ui/introduction/)です。

## 前提条件

- [Node.js](https://nodejs.org)
- [ngrok](https://ngrok.com)

## ローカルで実行

このUIフックをローカルで実行します。

```bash
node index.js 3000
```

次に、ngrokを使用してポート3000でローカルホストへのトンネルを作成します。

```bash
ngrok http 3000
```

ngrokによって作成された転送URL（「.ngrok.io」で終わる）をメモしておいてください。

次に、[Treeインテグレーション](https://treedocs.now.sh/docs/v1/getting-started/)を作成し、UIフックURLをngrok転送URLに設定します。

これで、Treeモバイルアプリにログインして、インテグレーションの動作を確認できます。