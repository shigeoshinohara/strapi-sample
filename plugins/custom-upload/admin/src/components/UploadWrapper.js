// src/plugins/custom-upload/admin/src/components/UploadWrapper/index.js
import React, { useState } from 'react';
import { Dialog } from '@strapi/design-system/Dialog';
import { Button } from '@strapi/design-system/Button';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { useIntl } from 'react-intl';
import { useNotification } from '@strapi/helper-plugin';
import axios from 'axios';

const UploadWrapper = ({ Component, ...props }) => {
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();
  const [showDialog, setShowDialog] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);

  const checkFileExists = async (fileName) => {
    try {
      const response = await axios.get(
        `/custom-upload/check-file?name=${encodeURIComponent(fileName)}`
      );
      return response.data.exists;
    } catch (error) {
      console.error('File check failed:', error);
      return false;
    }
  };

  const handleBeforeUpload = async (files) => {
    if (!files || files.length === 0) return files;

    const file = files[0];
    const exists = await checkFileExists(file.name);

    if (exists) {
      setPendingFile(file);
      setShowDialog(true);
      return false;
    }

    return props.onBeforeUpload ? props.onBeforeUpload(files) : files;
  };

  return (
    <>
      <Component
        {...props}
        onBeforeUpload={handleBeforeUpload}
      />

      {showDialog && (
        <Dialog
          onClose={() => setShowDialog(false)}
          title="ファイルが既に存在します"
          isOpen={showDialog}
        >
          <Stack spacing={4}>
            <Typography>
              {`${pendingFile?.name} は既に存在します。上書きしますか？`}
            </Typography>
          </Stack>
          <Dialog.Footer>
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
          </Dialog.Footer>
        </Dialog>
      )}
    </>
  );
};

export default UploadWrapper;
