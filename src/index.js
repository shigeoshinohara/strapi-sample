'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
  // bootstrap({ strapi }) {
  //   strapi.db.lifecycles.subscribe({
  //     models: ['plugin::upload.file'],
  //     beforeCreate: async (event) => {
  //       const { data } = event.params;
  //       console.log('Before upload:', data);
  //
  //       // ファイル名の変更
  //       if (data.name) {
  //         data.name = `${Date.now()}-${data.name}`;
  //       }
  //
  //       // メタデータの追加
  //       data.metadata = {
  //         ...data.metadata,
  //         uploadedAt: new Date().toISOString(),
  //       };
  //     },
  //   });
  // },

};
