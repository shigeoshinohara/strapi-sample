'use strict';

module.exports = {
  admin: {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/check-file',
        handler: 'upload.checkFile',
        config: {
          policies: [],
        },
      },
    ],
  },
};
