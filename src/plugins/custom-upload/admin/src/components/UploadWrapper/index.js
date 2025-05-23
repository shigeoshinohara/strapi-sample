// backend-strapi/src/plugins/custom-upload/admin/src/components/UploadWrapper/index.js
import React, { useState, useCallback } from 'react';
import { Dialog } from '@strapi/design-system/Dialog';
import { Button } from '@strapi/design-system/Button';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { useNotification } from '@strapi/helper-plugin';
import axios from 'axios';

const UploadWrapper = ({ children }) => {
  console.log('UploadWrapper rendering');
  const [showDialog, setShowDialog] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const toggleNotification = useNotification();

  const checkFileExists = useCallback(async (fileName) => {
    try {
      console.log('Checking file existence:', fileName);
      const response = await axios.get(
        `/admin/custom-upload/check-file?name=${encodeURIComponent(fileName)}`
      );
      console.log('API response:', response.data);
      return response.data.data.exists;
    } catch (error) {
      console.error('File check failed:', error);
      toggleNotification({
        type: 'warning',
        message: 'ファイルチェックに失敗しました',
      });
      return false;
    }
  }, [toggleNotification]);

  const handleBeforeUpload = useCallback(async (files) => {
    console.log('handleBeforeUpload called with files:', files);

    if (!files || files.length === 0) return files;

    const file = files[0];
    console.log('Checking file:', file.name);

    const exists = await checkFileExists(file.name);
    console.log('File exists:', exists);

    if (exists) {
      setPendingFile(file);
      setShowDialog(true);
      return false;
    }

    return files;
  }, [checkFileExists]);

  const handleOverwrite = useCallback(() => {
    setShowDialog(false);
    // ここでファイルのアップロード処理を行う
    console.log('Overwriting file:', pendingFile);
    setPendingFile(null);
    toggleNotification({
      type: 'success',
      message: 'ファイルを上書きしました',
    });
  }, [pendingFile, toggleNotification]);

  return (
    <>
      {children && React.cloneElement(children, { onBeforeUpload: handleBeforeUpload })}

      {showDialog && (
        <Dialog
          onClose={() => setShowDialog(false)}
          title="ファイルが既に存在します"
          isOpen={showDialog}
        >
          <Dialog.Body>
            <Stack spacing={4}>
              <Typography>
                {`${pendingFile?.name} は既に存在します。上書きしますか？`}
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
                キャンセル
              </Button>
            }
            endAction={
              <Button
                onClick={handleOverwrite}
                variant="danger-light"
              >
                上書きする
              </Button>
            }
          />
        </Dialog>
      )}
    </>
  );
};

export default UploadWrapper;
