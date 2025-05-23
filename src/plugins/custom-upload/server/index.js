// src/plugins/custom-upload/server/index.js
'use strict';

module.exports = {
  controllers: {
    admin: require('./controllers/admin'),
  },
  routes: require('./routes/admin'),
};
