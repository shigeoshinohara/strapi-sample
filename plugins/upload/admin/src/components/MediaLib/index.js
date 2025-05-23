// plugins/upload/admin/src/components/MediaLib/index.js
import { Dialog } from '@strapi/design-system';
import { useEffect, useState } from 'react';

const MediaLib = ({ ...props }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [existingFile, setExistingFile] = useState(null);

  const checkFileExists = async (file) => {
    console.log("abcdtestertetetetetetet")
    try {
      const response = await fetch(`/upload/files?filters[name][$eq]=${file.name}`);
      const data = await response.json();
      return data.results.length > 0 ? data.results[0] : null;
    } catch (error) {
      console.error('Error checking file:', error);
      return null;
    }
  };

  const handleUpload = async (file) => {
    const existing = await checkFileExists(file);

    if (existing) {
      setExistingFile(existing);
      setFileToUpload(file);
      setShowConfirmDialog(true);
      return;
    }

    // 通常のアップロード処理を実行
    proceedWithUpload(file);
  };

  const proceedWithUpload = (file) => {
    // 既存のアップロード処理をここに記述
  };

  return (
    <>
      {/* 既存のMedia Libraryコンポーネント */}
      {console.log("aaaaaaaaa")}
      {showConfirmDialog && (
        <Dialog
          onClose={() => setShowConfirmDialog(false)}
          title="ファイルが既に存在します"
          isOpen={showConfirmDialog}
        >
          <Dialog.Body>
            <p>
              ファイル "{fileToUpload?.name}" は既にアップロードされています。
              上書きしますか？
            </p>
          </Dialog.Body>
          <Dialog.Footer>
            <button onClick={() => {
              setShowConfirmDialog(false);
              proceedWithUpload(fileToUpload);
            }}>
              上書きする
            </button>
            <button onClick={() => setShowConfirmDialog(false)}>
              キャンセル
            </button>
          </Dialog.Footer>
        </Dialog>
      )}
    </>
  );
};

export default MediaLib;
