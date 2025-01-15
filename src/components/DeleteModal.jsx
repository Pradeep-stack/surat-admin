import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DeleteModal = ({ open, onClose, onConfirm }) => {
  const handleClose = () => {
    onClose(false);
  };

  const handleConfirm = () => {
    onConfirm();
    onClose(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div className="delete-model-top">
          <Icon className="del-mod-icon" icon="charm:circle-cross" />
          <p className="delete-model-text">Are you sure you want to delete?</p>
        </div>

        <div className="delete-model-footer dividers" dividers>
          <Button className="del-mod-btn-cls" autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="del-mod-btn-conf"
            autoFocus
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>

        <DialogActions></DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default DeleteModal;
