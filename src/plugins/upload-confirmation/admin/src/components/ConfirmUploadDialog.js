import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const ConfirmUploadDialog = ({ open, onClose, onConfirm, fileNames }) => {
  const fileNameList = fileNames.join(', ');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"ファイルアップロードの確認"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`以下のファイルをアップロードしますか？: ${fileNameList}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          アップロード
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmUploadDialog;
