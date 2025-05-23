'use strict';

module.exports = ({strapi}) => ({
  downloads: async (ctx) => {
    const { id } = ctx.params;
    const response = await fetch("https://www.sync-web.jp/uploads/logo_291813351d.svg");
    console.log("response", response);
    const arrayBuffer = await response.arrayBuffer();
   // console.log("response", response);
    console.log("arrayBuffer", arrayBuffer);


    // const blob = await response.blob();

    // console.log("blob", blob);
    // const body = response.body;

    // console.log("body", body);
    const buffer = Buffer.from(arrayBuffer);
    ctx.body =buffer;
    ctx.set('Content-Type', 'image/svg+xml');
    ctx.set('Content-Disposition', `attachment; filename="logo_291813351d.svg`);
    //   console.log("id", id)
  //   console.log("download strapi.service", strapi.service('plugin::upload.file'))
  //   console.log("download2 strapi.service", strapi.plugins['upload'].services.upload.findOne({query: {where: {$in: ["strapi"]}}}))
  //   // ファイルの情報を取得
  //   const file = await strapi.service('plugin::upload.file').findOne(id);
  //
  //
  //   if (!file) {
  //     return ctx.notFound('File not found');
  //   }
  //
  //   // ファイルをダウンロード
  //   ctx.set('Content-Disposition', `attachment; filename="${file.name}"`);
  //   ctx.set('Content-Type', file.mime);
  //   ctx.body = await strapi.service('plugin::upload.file').getBuffer(file.id);
  //
  //   // try {
  //   //   ctx.body = 'ok';
  //   // } catch (err) {
  //   //   ctx.body = err;
  //   // }
  },
  dltest: async (ctx) => {
    const { id } = ctx.params;
    console.log("download2 strapi.service", strapi.plugins['upload'])
    const file = await strapi.plugins['upload'].services.upload.findOne(id);

    if (!file) {
      return ctx.notFound('File not found');
    }

    const fileStream = await strapi.plugins['upload'].services.upload.getStream(file);
    ctx.set('Content-disposition', `attachment; filename="${file.name}"`);
    ctx.type = file.mime;
    ctx.body = fileStream;
   },
});

// const { createCoreController } = require('@strapi/strapi').factories;
//
// module.exports = createCoreController('api::download.download', ({ strapi }) => ({
//   async download(ctx) {
//     const { id } = ctx.params;
//
//     // ファイルの情報を取得
//     const file = await strapi.service('plugin::upload.file').findOne(id);
//
//     if (!file) {
//       return ctx.notFound('File not found');
//     }
//
//     // ファイルのパスを取得
//     const filePath = file.url;
//
//     // ファイルをダウンロード
//     ctx.set('Content-Disposition', `attachment; filename="${file.name}"`);
//     ctx.set('Content-Type', file.mime);
//     ctx.body = await strapi.service('plugin::upload.file').getBuffer(file.id);
//   },
// }));
