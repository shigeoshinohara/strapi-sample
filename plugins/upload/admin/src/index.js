// plugins/upload/admin/src/index.js
import pluginPkg from '../../package.json';
import MediaLib from './components/MediaLib';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.registerPlugin({
      id: name,
      name,
      isReady: true,
      components: {
        MediaLib,
      },
    });
  },
  bootstrap(app) {},
};
