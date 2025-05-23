'use strict';

module.exports = ({ strapi }) => ({
  async checkFile(ctx) {
    try {
      const { name } = ctx.query;

      const existingFile = await strapi.query('plugin::upload.file').findOne({
        where: { name },
      });

      return {
        exists: !!existingFile,
      };
    } catch (error) {
      ctx.throw(500, error);
    }
  },
});
