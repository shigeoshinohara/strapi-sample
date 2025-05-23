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

    const plugin = app.getPlugin('upload');
    if (plugin) {
      const original = plugin.apis.components['media-library'].components;
      plugin.apis.components['media-library'].components = {
        ...original,
        MediaLibraryInput: {
          ...original.MediaLibraryInput,
          component: UploadWrapper,
        },
      };
    }
  },

  bootstrap() {},
};
