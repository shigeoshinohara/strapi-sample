// // import { prefixPluginTranslations } from '@strapi/helper-plugin';
// // import pluginPkg from '../../package.json';
// // import pluginId from './pluginId';
// // import Initializer from './components/Initializer';
// // import PluginIcon from './components/PluginIcon';
// //
// // const name = pluginPkg.strapi.name;
// //
// // export default {
// //   register(app) {
// //     app.addMenuLink({
// //       to: `/plugins/${pluginId}`,
// //       icon: PluginIcon,
// //       intlLabel: {
// //         id: `${pluginId}.plugin.name`,
// //         defaultMessage: name,
// //       },
// //       Component: async () => {
// //         const component = await import('./pages/App');
// //
// //         return component;
// //       },
// //       permissions: [
// //         // Uncomment to set the permissions of the plugin here
// //         // {
// //         //   action: '', // the action name should be plugin::plugin-name.actionType
// //         //   subject: null,
// //         // },
// //       ],
// //     });
// //     app.registerPlugin({
// //       id: pluginId,
// //       initializer: Initializer,
// //       isReady: false,
// //       name,
// //     });
// //   },
// //
//
// //   bootstrap(app) {},
// //   async registerTrads({ locales }) {
// //     const importedTrads = await Promise.all(
// //       locales.map((locale) => {
// //         return import(`./translations/${locale}.json`)
// //           .then(({ default: data }) => {
// //             return {
// //               data: prefixPluginTranslations(data, pluginId),
// //               locale,
// //             };
// //           })
// //           .catch(() => {
// //             return {
// //               data: {},
// //               locale,
// //             };
// //           });
// //       })
// //     );
// //
// //     return Promise.resolve(importedTrads);
// //   },
// // };
//
//
//
// // plugins/upload-enhancement/admin/src/index.js
// import React, { useState } from 'react';
// import { prefixPluginTranslations } from '@strapi/helper-plugin';
// import pluginPkg from '../../package.json';
// import pluginId from './pluginId';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from '@mui/material';
// import { useStrapiApp } from '@strapi/helper-plugin';
//
// const name = pluginPkg.strapi.name;
//
// export default {
//   register(app) {
//     app.registerPlugin({
//       id: pluginId,
//       name,
//     });
//   },
//
//   bootstrap(app) {
//     app.injectContentManagerComponent({
//       Component: () => {
//         const [isDialogOpen, setIsDialogOpen] = useState(false);
//         const [uploadFiles, setUploadFiles] = useState([]); // アップロードするファイルを保持
//         const { strapi } = useStrapiApp();
//
//         // アップロードボタンを取得する処理を実装
//         const uploadButton = document.querySelector('[data-testid="asset-add-new"] button');
//
//         // ボタンが存在しない場合があるので、監視する
//         const observer = new MutationObserver(() => {
//           const uploadButton = document.querySelector('[data-testid="asset-add-new"] button');
//           if (uploadButton) {
//             observer.disconnect(); // ボタンが見つかったら監視を停止
//             overrideUploadButton(uploadButton);
//           }
//         });
//
//         observer.observe(document.body, {
//           childList: true,
//           subtree: true,
//         });
//         //
//         // アップロードボタンの挙動をオーバーライド
//         const overrideUploadButton = (button) => {
//           if (!button) return;
//
//           const originalOnClick = button.onclick;
//
//           button.onclick = async (e) => {
//             e.preventDefault();
//             e.stopPropagation(); // イベントの伝播を停止
//
//             // ファイル選択の処理を模倣 (input要素を動的に作成)
//             const input = document.createElement('input');
//             input.type = 'file';
//             input.multiple = true; // 複数ファイルを選択可能にする
//             input.accept = 'image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv'; // 受け入れるファイルタイプ
//             input.style.display = 'none'; // input要素を非表示にする
//             document.body.appendChild(input);
//
//             input.onchange = (event) => {
//               if (event.target.files && event.target.files.length > 0) {
//                 const fileArray = Array.from(event.target.files);
//                 setUploadFiles(fileArray); // 選択されたファイルを state に保存
//                 setIsDialogOpen(true); // ダイアログを表示
//               }
//               document.body.removeChild(input);
//             };
//             input.click(); // input要素をクリックしてファイル選択ダイアログを開く
//           };
//         };
//
//         // アップロード処理
//         const handleUpload = async () => {
//           setIsDialogOpen(false);
//           try {
//             const formData = new FormData();
//             uploadFiles.forEach(file => {
//               formData.append('files', file);
//             });
//
//             // StrapiのアップロードAPIにリクエストを送信
//             const response = await strapi.request('POST', '/upload', {
//               data: formData,
//             });
//
//             strapi.notification.toggle({
//               type: 'success',
//               message: 'ファイルがアップロードされました。',
//             });
//             // アップロード成功後の処理 (例: メディアライブラリの更新)
//           } catch (error) {
//             strapi.notification.toggle({
//               type: 'error',
//               message: 'ファイルアップロードに失敗しました。',
//             });
//             console.error('アップロードエラー:', error);
//           } finally {
//             setUploadFiles([]);
//           }
//         };
//
//         // キャンセル処理
//         const handleCancel = () => {
//           setIsDialogOpen(false);
//           setUploadFiles([]);
//         };
//
//         return (
//           <Dialog
//             open={isDialogOpen}
//             onClose={handleCancel}
//             aria-labelledby="alert-dialog-title"
//             aria-describedby="alert-dialog-description"
//           >
//             <DialogTitle id="alert-dialog-title">{"確認"}</DialogTitle>
//             <DialogContent>
//               <DialogContentText id="alert-dialog-description">
//                 ファイルをアップロードしますか？
//               </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCancel}>キャンセル</Button>
//               <Button onClick={handleUpload} autoFocus>
//                 アップロード
//               </Button>
//             </DialogActions>
//           </Dialog>
//         );
//       },
//       target: 'content-manager-edit-page', // 適切なターゲットを選択
//     });
//   },
//
//   async registerTrads({ strapi }) {
//     const importedTrads = await Promise.resolve(
//       import(`./translations/${strapi.i18n.defaultLocale}.json`)
//     );
//     return prefixPluginTranslations(importedTrads.default, name);
//   },
// };



import React, { useState, useEffect } from 'react';
import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
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
    console.log("!!!!!!!!!!!!!!!uploadFiles!!!!!!!!!!!!!!!!!!!");
  },
  //
  // bootstrap(app) {
  //   app.injectContentManagerComponent({
  //     Component: () => {
  //       const [isDialogOpen, setIsDialogOpen] = useState(false);
  //       const [uploadFiles, setUploadFiles] = useState([]);
  //       const { strapi } = useStrapiApp();
  //       console.log("uploadFiles!!!!!!!!!!!!!!!!!!!");
  //
  //       useEffect(() => {
  //         console.log("!!!!!!!!!!!!!!!uploadFiles!!!!!!!!!!!!!!!!!!!");
  //
  //         // MutationObserver を使用して、Asset 追加ダイアログを監視
  //         const observer = new MutationObserver((mutations) => {
  //           mutations.forEach((mutation) => {
  //             if (mutation.addedNodes) {
  //               mutation.addedNodes.forEach((node) => {
  //                 // ダイアログが追加されたら、ボタンを探す
  //                 if (node.nodeType === Node.ELEMENT_NODE) {
  //                   // 仮のクラス名
  //                   const submitButton = node.querySelector('button[type="submit"]');
  //
  //                   if (submitButton) {
  //                     console.log("Submit button found:", submitButton);
  //
  //                     // ボタンのクリックイベントをインターセプト
  //                     submitButton.addEventListener('click', (e) => {
  //                       e.preventDefault();
  //                       e.stopPropagation();
  //
  //                       console.log('Upload button clicked!');
  //                       setIsDialogOpen(true);
  //                     });
  //
  //                     observer.disconnect(); // 監視を停止
  //                   } else {
  //                     console.log("Submit button not found!");
  //                   }
  //                 }
  //               });
  //             }
  //           });
  //         });
  //
  //         // 監視を開始
  //         observer.observe(document.body, {
  //           childList: true,
  //           subtree: true,
  //         });
  //
  //         return () => observer.disconnect(); // クリーンアップ
  //       }, []);
  //
  //       // ダイアログのロジック
  //
  //       return (
  //         <Dialog
  //           open={isDialogOpen}
  //           onClose={() => setIsDialogOpen(false)}
  //           aria-labelledby="alert-dialog-title"
  //           aria-describedby="alert-dialog-description"
  //         >
  //           <DialogTitle id="alert-dialog-title">{"確認"}</DialogTitle>
  //           <DialogContent>
  //             <DialogContentText id="alert-dialog-description">
  //               ファイルをアップロードしますか？
  //             </DialogContentText>
  //           </DialogContent>
  //           <DialogActions>
  //             <Button onClick={() => setIsDialogOpen(false)}>キャンセル</Button>
  //             <Button
  //               onClick={() => {
  //                 // アップロード処理
  //                 setIsDialogOpen(false);
  //                 // ...
  //               }}
  //               autoFocus
  //             >
  //               アップロード
  //             </Button>
  //           </DialogActions>
  //         </Dialog>
  //       );
  //     },
  //     // target プロパティは削除
  //   });
  // },


  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({default: data}) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
  // async registerTrads({ strapi }) {
  //   console.log(`${strapi.i18n.defaultLocale}`)
  //    const importedTrads = await Promise.resolve(
  //     // import(`./translations/${strapi.i18n.defaultLocale}.json`)
  //   import(`./translations/en.json`)
  //    );
  //    return prefixPluginTranslations(importedTrads.default, name);
  //  // return strapi;
  // },
};




// plugins/upload/admin/src/components/UploadAssetDialog/index.js
import React, { useState } from 'react';
import { Dialog } from '@strapi/design-system/Dialog';
import { Button } from '@strapi/design-system/Button';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { useLibrary } from '@strapi/helper-plugin';
import { Upload } from '@strapi/icons';

const UploadAssetDialog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { components } = useLibrary();
  const originalUpload = components['media-library'].Component;

  const handleUploadClick = () => {
    setIsVisible(true);
  };

  return (
    <>
      <Button
        variant="secondary"
        startIcon={<Upload />}
        onClick={handleUploadClick}
      >
        Upload 1 asset to the library
      </Button>

      {isVisible && (
        <Dialog onClose={() => setIsVisible(false)} title="ファイルアップロード" isOpen>
          <Dialog.Body>
            <Stack spacing={2}>
              <Typography variant="omega">
                同じファイル名が存在する場合は確認が必要です。
                続行しますか？
              </Typography>
            </Stack>
          </Dialog.Body>
          <Dialog.Footer
            startAction={
              <Button onClick={() => setIsVisible(false)} variant="tertiary">
                キャンセル
              </Button>
            }
            endAction={
              <Button
                onClick={() => {
                  setIsVisible(false);
                  // 既存のアップロード処理を呼び出す
                  originalUpload.open();
                }}
              >
                続行
              </Button>
            }
          />
        </Dialog>
      )}
    </>
  );
};

export default UploadAssetDialog;
