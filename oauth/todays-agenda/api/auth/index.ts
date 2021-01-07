import { NowRequest, NowResponse } from '@now/node';
import { handleAuthorizationCodeGrant } from '../../lib/oauth';
import { saveUser } from '../../lib/db';

export default async (req: NowRequest, res: NowResponse) => {
  const host = req.headers.host;
  const url = req.url;
  if (!url || !host) {
      res.writeHead(400, '無効なURL');
      res.end();
      return;
  }

  try {
    const [user, redirectUrl ] = await handleAuthorizationCodeGrant(host, url);

    try {
      await saveUser(user);
    } catch (err) {
      console.error('ユーザーの保存に失敗しました： ', err);
      res.writeHead(500, 'ユーザーの保存に失敗しました：');
      res.end();
      return;
    }

    res.writeHead(302, {
      'Location': redirectUrl
    });
    res.end();
    return;
  } catch (err) {
    console.error('認証コードの処理に失敗しました: ', err);
    res.writeHead(500, '認証コードの処理に失敗しました');
    res.end();
    return;
  }
};
