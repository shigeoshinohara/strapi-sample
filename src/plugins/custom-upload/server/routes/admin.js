// src/plugins/custom-upload/server/routes/admin.js
'use strict';

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/check-file',
      handler: 'admin.checkFile',
      config: {
        policies: [],
      },
    },
  ],
};
