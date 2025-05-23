'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('upload-confirmation')
      .service('myService')
      .getWelcomeMessage();
  },
});
