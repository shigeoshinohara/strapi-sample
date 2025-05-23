import React from 'react';
import CustomMediaLibrary from './custom/MediaLibrary';

export default {
  register(app) {
    app.addMenuLink({
      to: '/media',
      icon: 'fa fa-image',
      label: 'カスタムメディアライブラリ',
    });

    app.addRoute('/media', CustomMediaLibrary);
  },
};
