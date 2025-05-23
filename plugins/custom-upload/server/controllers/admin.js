'use strict';

module.exports = ({ strapi }) => ({
  async checkFile(ctx) {
    const { name } = ctx.query;

    try {
      const existingFile = await strapi.query('plugin::upload.file').findOne({
        where: { name },
      });

      ctx.body = {
        exists: !!existingFile,
      };
    } catch (error) {
      ctx.throw(500, error);
    }
  },
});
