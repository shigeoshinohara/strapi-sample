// plugins/custom-upload/admin/src/components/UploadWrapper.js
import React, { useState } from 'react';
import { Dialog } from '@strapi/design-system/Dialog';
import { Button } from '@strapi/design-system/Button';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { useIntl } from 'react-intl';
import { useNotification } from '@strapi/helper-plugin';

const UploadWrapper = ({ children }) => {
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();
  const [showDialog, setShowDialog] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);

  // ファイルの存在チェック
  const checkFileExists = async (fileName) => {
    console.log("checkFileExists")
    try {
      const response = await fetch(`/upload/api/check-file?name=${encodeURIComponent(fileName)}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('File check failed:', error);
      return false;
    }
  };

  // アップロード前の処理
  const handleBeforeUpload = async (files) => {
    console.log("handleBeforeUpload")
    if (!files || files.length === 0) return files;

    const file = files[0];
    const exists = await checkFileExists(file.name);

    if (exists) {
      setPendingFile(file);
      setShowDialog(true);
      // アップロードを一時停止
      return false;
    }

    return files;
  };

  return (
    <>
      {React.cloneElement(children, {
        onBeforeUpload: handleBeforeUpload,
      })}

      {showDialog && (
        <Dialog
          onClose={() => setShowDialog(false)}
          title={formatMessage({
            id: 'upload.overwrite.title',
            defaultMessage: 'ファイルが既に存在します'
          })}
          isOpen={showDialog}
        >
          <Dialog.Body>
            <Stack spacing={4}>
              <Typography>
                {formatMessage({
                  id: 'upload.overwrite.message',
                  defaultMessage: `${pendingFile?.name} は既に存在します。上書きしますか？`
                })}
              </Typography>
            </Stack>
          </Dialog.Body>
          <Dialog.Footer
            startAction={
              <Button
                onClick={() => {
                  setShowDialog(false);
                  setPendingFile(null);
                  toggleNotification({
                    type: 'info',
                    message: 'アップロードをキャンセルしました'
                  });
                }}
                variant="tertiary"
              >
                {formatMessage({
                  id: 'upload.overwrite.cancel',
                  defaultMessage: 'キャンセル'
                })}
              </Button>
            }
            endAction={
              <Button
                onClick={() => {
                  setShowDialog(false);
                  // 上書きアップロードを実行
                  if (pendingFile) {
                    // オリジナルのアップロード処理を呼び出し
                    children.props.onUploadSucceed([pendingFile]);
                  }
                  setPendingFile(null);
                }}
                variant="danger-light"
              >
                {formatMessage({
                  id: 'upload.overwrite.confirm',
                  defaultMessage: '上書きする'
                })}
              </Button>
            }
          />
        </Dialog>
      )}
    </>
  );
};

export default UploadWrapper;
