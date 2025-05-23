// import { prefixPluginTranslations } from '@strapi/helper-plugin';
// import pluginPkg from '../../package.json';
// import pluginId from './pluginId';
// import Initializer from './components/Initializer';
// import PluginIcon from './components/PluginIcon';
//
// const name = pluginPkg.strapi.name;
//
// export default {
//   register(app) {
//     app.addMenuLink({
//       to: `/plugins/${pluginId}`,
//       icon: PluginIcon,
//       intlLabel: {
//         id: `${pluginId}.plugin.name`,
//         defaultMessage: name,
//       },
//       Component: async () => {
//         const component = await import('./pages/App');
//
//         return component;
//       },
//       permissions: [
//         // Uncomment to set the permissions of the plugin here
//         // {
//         //   action: '', // the action name should be plugin::plugin-name.actionType
//         //   subject: null,
//         // },
//       ],
//     });
//     app.registerPlugin({
//       id: pluginId,
//       initializer: Initializer,
//       isReady: false,
//       name,
//     });
//   },
//
//   bootstrap(app) {},
//   async registerTrads({ locales }) {
//     const importedTrads = await Promise.all(
//       locales.map((locale) => {
//         return import(`./translations/${locale}.json`)
//           .then(({ default: data }) => {
//             return {
//               data: prefixPluginTranslations(data, pluginId),
//               locale,
//             };
//           })
//           .catch(() => {
//             return {
//               data: {},
//               locale,
//             };
//           });
//       })
//     );
//
//     return Promise.resolve(importedTrads);
//   },
// };


import React from 'react';
import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import ConfirmUploadDialog from './components/ConfirmUploadDialog';
import { useStrapiApp } from '@strapi/helper-plugin';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      name,
    });
  },

  bootstrap(app) {
    app.injectContentManagerComponent({
      Component: () => {
        const [isDialogOpen, setIsDialogOpen] = React.useState(false);
        const [filesToUpload, setFilesToUpload] = React.useState([]);
        const { strapi } = useStrapiApp();

        // メディアライブラリのアップロードボタンを取得する処理を実装
        const uploadButton = document.querySelector('[data-testid="asset-add-new"] button');

        // 初期ロード時にボタンが存在しない場合があるので、監視する
        const observer = new MutationObserver(() => {
          const uploadButton = document.querySelector('[data-testid="asset-add-new"] button');
          if (uploadButton) {
            observer.disconnect(); // ボタンが見つかったら監視を停止
            overrideUploadButton(uploadButton);
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });

        // アップロードボタンの挙動をオーバーライド
        const overrideUploadButton = (button) => {
          if (!button) return;

          const originalOnClick = button.onclick;

          button.onclick = async (e) => {
            e.preventDefault();
            e.stopPropagation(); // イベントの伝播を停止

            // ファイル選択の処理を模倣 (input要素を動的に作成)
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true; // 複数ファイルを選択可能にする
            input.accept = 'image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv'; // 受け入れるファイルタイプ
            input.style.display = 'none'; // input要素を非表示にする
            document.body.appendChild(input);

            input.onchange = (event) => {
              if (event.target.files && event.target.files.length > 0) {
                const fileArray = Array.from(event.target.files);
                setFilesToUpload(fileArray);
                setIsDialogOpen(true);
              }
              document.body.removeChild(input);
            };
            input.click(); // input要素をクリックしてファイル選択ダイアログを開く
          };
        };


        const handleConfirmUpload = async () => {
          setIsDialogOpen(false);
          // 実際のアップロード処理をここで行う
          // 例えば、StrapiのAPIを使ってファイルをアップロードする
          try {
            const formData = new FormData();
            filesToUpload.forEach(file => {
              formData.append('files', file);
            });

            // StrapiのアップロードAPIにリクエストを送信
            const response = await strapi.request('POST', '/upload', {
              data: formData,
            });

            strapi.notification.toggle({
              type: 'success',
              message: 'ファイルがアップロードされました。',
            });
            // アップロード成功後の処理 (例: メディアライブラリの更新)
          } catch (error) {
            strapi.notification.toggle({
              type: 'error',
              message: 'ファイルアップロードに失敗しました。',
            });
            console.error('アップロードエラー:', error);
          } finally {
            setFilesToUpload([]);
          }
        };


        const handleCancelUpload = () => {
          setIsDialogOpen(false);
          setFilesToUpload([]);
        };

        return (
          <ConfirmUploadDialog
            open={isDialogOpen}
            onClose={handleCancelUpload}
            onConfirm={handleConfirmUpload}
            fileNames={filesToUpload.map(file => file.name)}
          />
        );
      },
      target: 'content-manager-edit-page', // 適切なターゲットを選択
    });
  },

  async registerTrads({ strapi }) {
    const importedTrads = await Promise.resolve(
      import(`./translations/${strapi.i18n.defaultLocale}.json`)
    );
    return prefixPluginTranslations(importedTrads.default, name);
  },
};
