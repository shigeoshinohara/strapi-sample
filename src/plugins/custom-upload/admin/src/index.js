// src/plugins/custom-upload/admin/src/index.js
import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginId from './pluginId';
import UploadWrapper from './components/UploadWrapper';

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      name: 'Custom Upload',
    });

    // メディアライブラリのアップロードコンポーネントを置き換え
    const plugin = app.getPlugin('upload');
    if (plugin) {
      plugin.injectComponent('EditAssetDialog', 'content', {
        Component: UploadWrapper,
      });
    }
  },

  bootstrap() {},
};
