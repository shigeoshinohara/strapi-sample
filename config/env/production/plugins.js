const FRONT_END_URL = process.env.FRONT_END_BASE_URL;
module.exports = ({ env }) => ({
  // ...
  "content-versioning": {
    enabled: true,
  },
  "preview-button": {
    config: {
      contentTypes: [
        {
          uid: "api::page.page",
          draft: {
            url: `${FRONT_END_URL}page/preview/{id}`,
          },
          published: {
            url: `${FRONT_END_URL}page/{url}`,
          },
        },
      ],
    },
  },
});
