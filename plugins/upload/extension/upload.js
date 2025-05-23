module.exports = ({ strapi }) => {
  strapi.plugin('upload').service('upload').addProvider('custom-provider', {
    // 独自のファイルアップロード処理
    async upload(file) {
      const url = `https://cdn.example.com/${file.hash}`;  // ここでカスタムURLを生成
      return {
        ...file,
        url,
      };
    },
  });
};
