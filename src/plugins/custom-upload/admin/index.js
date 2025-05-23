// backend-strapi/src/plugins/custom-upload/admin/src/index.js
import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginId from './pluginId';
import UploadWrapper from './components/UploadWrapper';

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      name: 'custom-upload',
      isReady: true,
    });

    // アップロードプラグインの拡張
    const plugin = app.getPlugin('upload');
    if (plugin) {
      const originalComponent = plugin.apis?.components['media-library']?.components?.InputMedia;
      if (originalComponent) {
        plugin.apis.components['media-library'].components.InputMedia = (props) => {
          return <UploadWrapper Component={originalComponent} {...props} />;
        };
      }
    }
  },

  bootstrap() {},
};
