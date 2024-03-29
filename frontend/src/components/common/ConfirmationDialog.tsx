import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IConfirmationDialogProps {
  open: boolean,
  title: string,
  content: string,
  yesLabel?: string,
  noLabel?: string,
  handleClose(): any,
  handleYes: any
}

export default function ConfirmationDialog({title, content, handleClose, open, yesLabel='Yes', noLabel='No', handleYes}:  IConfirmationDialogProps) {

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{noLabel}</Button>
          <Button onClick={handleYes} autoFocus>
            {yesLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}