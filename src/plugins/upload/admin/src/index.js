// import { prefixPluginTranslations } from '@strapi/helper-plugin';
// import pluginPkg from '../../package.json';
// import pluginId from './pluginId';
// import Initializer from './components/Initializer';
// import PluginIcon from './components/PluginIcon';
//
// const name = pluginPkg.strapi.name;
//
// export default {
//   register(app) {
//     app.addMenuLink({
//       to: `/plugins/${pluginId}`,
//       icon: PluginIcon,
//       intlLabel: {
//         id: `${pluginId}.plugin.name`,
//         defaultMessage: name,
//       },
//       Component: async () => {
//         const component = await import('./pages/App');
//
//         return component;
//       },
//       permissions: [
//         // Uncomment to set the permissions of the plugin here
//         // {
//         //   action: '', // the action name should be plugin::plugin-name.actionType
//         //   subject: null,
//         // },
//       ],
//     });
//     app.registerPlugin({
//       id: pluginId,
//       initializer: Initializer,
//       isReady: false,
//       name,
//     });
//   },
//
//   bootstrap(app) {},
//   async registerTrads({ locales }) {
//     const importedTrads = await Promise.all(
//       locales.map((locale) => {
//         return import(`./translations/${locale}.json`)
//           .then(({ default: data }) => {
//             return {
//               data: prefixPluginTranslations(data, pluginId),
//               locale,
//             };
//           })
//           .catch(() => {
//             return {
//               data: {},
//               locale,
//             };
//           });
//       })
//     );
//
//     return Promise.resolve(importedTrads);
//   },
// };


// plugins/upload/admin/src/index.js
import pluginPkg from '../../package.json';
import UploadAssetDialog from './components/UploadAssetDialog';

const name = pluginPkg.strapi.name;

export default {

  register(app) {
    console.log('UploadAssetDialog register');
    // 既存のメディアライブラリのアップロードボタンを置き換える
    app.addComponents([
      {
        name: 'UploadAssetDialog',
        Component: UploadAssetDialog,
      },
    ]);

    app.registerPlugin({
      id: name,
      name,
      isReady: true,
    });
  },

  bootstrap(app) {
    console.log('UploadAssetDialog bootstrap');
    // メディアライブラリのコンポーネントをカスタマイズ
    const mediaLibrary = app.getPlugin('upload').apis.components;
    if (mediaLibrary) {
      mediaLibrary.inject('content-manager.assets.upload', {
        Component: UploadAssetDialog,
      });
    }
  },
};
