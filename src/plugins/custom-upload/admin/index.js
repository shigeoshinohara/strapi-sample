// backend-strapi/src/plugins/custom-upload/admin/src/index.js
import pluginId from './pluginId';
import UploadWrapper from './components/UploadWrapper';

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      name: 'custom-upload',
      isReady: true,
      load() {
        const plugin = app.getPlugin('upload');
        if (plugin) {
          const MediaLib = plugin.apis['media-library'];
          if (MediaLib) {
            const original = MediaLib.components.Input;
            MediaLib.components.Input = (props) => {
              console.log('Custom upload wrapper mounted'); // デバッグログ
              return <UploadWrapper original={original} {...props} />;
            };
          }
        }
      },
    });
  },
};
