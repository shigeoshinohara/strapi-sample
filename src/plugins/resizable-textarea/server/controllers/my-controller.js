'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('resizable-textarea')
      .service('myService')
      .getWelcomeMessage();
  },
});
