const FRONT_END_URL = process.env.FRONT_END_BASE_URL;


module.exports = ({ env }) => ({
  "content-versioning": {
    enabled: true,
  },

  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: "A",
            secretAccessKey: "W",
          },
          region: "ap-northeast-1",
          params: {
            ACL: env('AWS_ACL', 'public-read'),
            signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
            Bucket: "strapi-aws-s3-images-bucket-001",
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
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
  // 'upload-enhancement': {
  //   enabled: true,
  //   resolve: './src/plugins/upload-enhancement'
  // },
  // 'custom-upload': {
  //   enabled: true,
  //   resolve: './src/plugins/upload'
  // },
  'custom-upload': {
    enabled: true,
    resolve: './plugins/custom-upload'
  },

});


