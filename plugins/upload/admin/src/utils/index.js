// plugins/upload/admin/src/utils/index.js
import { prefixPluginTranslations } from '@strapi/helper-plugin';

export const getTrad = (id) => `upload.${id}`;

export const getPrefixedFormats = (array) =>
  array.map((format) => prefixPluginTranslations(format));
