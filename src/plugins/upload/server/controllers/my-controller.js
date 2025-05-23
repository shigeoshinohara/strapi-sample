'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('upload')
      .service('myService')
      .getWelcomeMessage();
  },
});
