'use strict';

module.exports = {
  controllers: {
    upload: require('./server/controllers/upload'),
  },
  routes: {
    admin: {
      type: 'admin',
      routes: [
        {
          method: 'GET',
          path: '/check-file',
          handler: 'upload.checkFile',
          config: {
            policies: [],
            auth: false,
          },
        },
      ],
    },
  },
  services: {},
};
