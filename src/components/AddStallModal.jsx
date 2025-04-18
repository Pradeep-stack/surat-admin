import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AddStallModal = ({ open1, onClose1, onConfirm1, setStallNumber }) => {
  const handleClose = () => {
    onClose1(false);
  };

  const handleConfirm = () => {
    onConfirm1();
    onClose1(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open1}
      >
        <div className="delete-model-top">
          <p className="delete-model-text">Plase Enter Stall Number</p>
            <input onChange={(e) => setStallNumber(e.target.value)} style={
                {    marginTop: "20px",
                    borderRadius: "5px",
                    padding: "5px"}
            } type="text" className="stall-input" placeholder="Stall No." />
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

export default AddStallModal;
