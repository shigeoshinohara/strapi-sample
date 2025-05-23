// backend-strapi/src/plugins/custom-upload/admin/src/components/UploadWrapper/index.js
import React, { useState, useEffect } from 'react';
import { Dialog } from '@strapi/design-system/Dialog';
import { Button } from '@strapi/design-system/Button';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { useNotification } from '@strapi/helper-plugin';
import axios from 'axios';

const UploadWrapper = ({ original: Original, ...props }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const toggleNotification = useNotification();

  useEffect(() => {
    console.log('UploadWrapper mounted with props:', props); // デバッグログ
  }, []);

// backend-strapi/src/plugins/custom-upload/admin/src/components/UploadWrapper/index.js
  const checkFileExists = async (fileName) => {
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
  };

  const handleBeforeUpload = async (files) => {
    console.log('handleBeforeUpload called with:', files); // デバッグログ
    if (!files || files.length === 0) return files;

    const file = files[0];
    const exists = await checkFileExists(file.name);

    if (exists) {
      setPendingFile(file);
      setShowDialog(true);
      return false;
    }

    return files;
  };

  return (
    <>
      <Original
        {...props}
        onBeforeUpload={handleBeforeUpload}
      />

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
                onClick={() => {
                  setShowDialog(false);
                  if (pendingFile) {
                    props.onUploadSucceed([pendingFile]);
                  }
                  setPendingFile(null);
                }}
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
