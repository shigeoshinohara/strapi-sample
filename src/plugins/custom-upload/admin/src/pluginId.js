// backend-strapi/src/plugins/custom-upload/admin/src/pluginId.js
const pluginPkg = require('../../package.json');

const pluginId = pluginPkg.name.replace(/^(@[^-,.][\w,-]+\/|strapi-)plugin-/i, '');

module.exports = pluginId;
