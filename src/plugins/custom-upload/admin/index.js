// backend-strapi/src/plugins/custom-upload/admin/src/index.js
import pluginId from './pluginId';
import UploadWrapper from './components/UploadWrapper';

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      name: 'custom-upload',
      isReady: true,
    });
  },

  bootstrap(app) {
    // upload プラグインが初期化された後に実行される
    try {
      const uploadPlugin = app.getPlugin('upload');
      if (uploadPlugin) {
        console.log('Upload plugin found, extending media library');

        // メディアライブラリのコンポーネントを拡張
        app.injectContentManagerComponent('upload', 'asset-dialog', {
          name: 'custom-upload-wrapper',
          Component: UploadWrapper,
        });
      } else {
        console.warn('Upload plugin not found, cannot extend media library');
      }
    } catch (error) {
      console.error('Failed to extend media library:', error);
    }
  },
};
