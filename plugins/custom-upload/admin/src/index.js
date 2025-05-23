// plugins/custom-upload/admin/src/index.js
import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import UploadWrapper from './components/UploadWrapper';

const pluginName = pluginPkg.strapi.name;

export default {
  register(app) {
    console.log("register")

    // オリジナルのアップロードコンポーネントを拡張
    app.addComponents([
      {
        name: 'UploadWrapper',
        Component: UploadWrapper,
      },
    ]);
  },

  bootstrap(app) {
    console.log("bootstrap")

    // アップロードプラグインのコンポーネントを置き換え
    app.getPlugin('upload').injectComponent('upload.main', {
      Component: UploadWrapper,
    });
  },
};
