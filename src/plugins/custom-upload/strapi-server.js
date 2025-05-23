// backend-strapi/src/plugins/custom-upload/strapi-server.js
'use strict';

module.exports = ({ strapi }) => {
  // プラグインサービスの定義
  const services = {};

  // プラグインコントローラーの定義
  const controllers = {
    upload: {
      async checkFile(ctx) {
        try {
          console.log('Checking file:', ctx.query.name);
          const { name } = ctx.query;

          const existingFile = await strapi.query('plugin::upload.file').findOne({
            where: { name },
          });

          return {
            data: {
              exists: !!existingFile
            }
          };
        } catch (error) {
          console.error('Error checking file:', error);
          ctx.throw(500, error);
        }
      },
    },
  };

  // プラグインルートの定義
  const routes = {
    admin: {
      type: 'admin',
      routes: [
        {
          method: 'GET',
          path: '/check-file',
          handler: 'upload.checkFile',
          config: {
            policies: [],
            auth: false,
          },
        },
      ],
    },
  };

  return {
    controllers,
    routes,
    services,
  };
};
