// src/admin/custom/MediaLibrary.js
import React from 'react';
import { useNotifyAT } from '@strapi/helper-plugin';

const CustomMediaLibrary = ({ file }) => {
  const notify = useNotifyAT();

  const handleDownload = () => {
    // バックエンドからカスタムURLを取得
    const customUrl = file.customUrl || `https://my-default-url.com/${file.hash}`;

    // ダウンロード処理（例えば、新しいウィンドウで開く）
    window.open(customUrl, '_blank');
    notify.success('ダウンロードが開始されました');
  };

  return (
    <div>
      <button onClick={handleDownload}>
        ダウンロード
      </button>
    </div>
  );
};

export default CustomMediaLibrary;
