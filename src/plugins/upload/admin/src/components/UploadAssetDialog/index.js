// plugins/upload/admin/src/components/UploadAssetDialog/index.js
import React, { useState } from 'react';
import { Dialog } from '@strapi/design-system/Dialog';
import { Button } from '@strapi/design-system/Button';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { useLibrary } from '@strapi/helper-plugin';
import { Upload } from '@strapi/icons';

const UploadAssetDialog = () => {
  console.log('UploadAssetDialog');
  const [isVisible, setIsVisible] = useState(false);
  const { components } = useLibrary();
  const originalUpload = components['media-library'].Component;

  const handleUploadClick = () => {
    console.log('Click');
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
