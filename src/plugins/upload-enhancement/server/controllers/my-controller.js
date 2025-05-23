'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('upload-enhancement')
      .service('myService')
      .getWelcomeMessage();
  },
});
