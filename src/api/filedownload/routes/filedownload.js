module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/filedownload/:id',
      handler: 'filedownload.downloads',
      config: {
        auth: false, // 認証が必要な場合はtrueに変更
      },
    },
    {
      method: 'GET',
      path: '/downloadTest:id',
      handler: 'filedownload.dltest',
      config: {
        auth: false, // 認証が必要な場合はtrueに変更
      },
    },
  ],
};
