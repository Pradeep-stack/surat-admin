import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    minWidth: "500px",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

const AddStallModal = ({
  open1,
  onClose1,
  onConfirm1,
  setStallNumber,
  setStallSize,
  setCompanyName,
  setMobileNumber,
  stallNumber,
  stallSize,
  companyName,
  mobileNumber,
}) => {
  const handleClose = () => onClose1(false);
  
  const handleConfirm = () => {
    onConfirm1();
    onClose1(false);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="stall-dialog-title"
      open={open1}
    >
      <DialogTitle 
        id="stall-dialog-title"
        sx={{ 
          fontSize: "1.2rem",
          fontWeight: 600,
          backgroundColor: "#f5f5f5",
          padding: "16px 24px",
          borderBottom: "1px solid #e0e0e0"
        }}
      >
        Edit Exhibitor
      </DialogTitle>
      
      <DialogContent dividers>
        <Box component="form" sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Stall Number"
                placeholder="Enter Stall Number"
                value={stallNumber}
                onChange={(e) => setStallNumber(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Stall Size"
                placeholder="Enter Stall Size"
                value={stallSize}
                onChange={(e) => setStallSize(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Company Name"
                placeholder="Enter Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Mobile Number"
                placeholder="Enter Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                variant="outlined"
                type="tel"
                inputProps={{ 
                  maxLength: 15,
                  pattern: "[0-9]*" 
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ padding: "16px 24px" }}>
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{
            textTransform: "none",
            padding: "8px 20px",
            borderRadius: "6px",
            borderColor: "#ccc",
            color: "#333",
            "&:hover": {
              borderColor: "#aaa",
            }
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          sx={{
            textTransform: "none",
            padding: "8px 24px",
            borderRadius: "6px",
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1565c0",
            }
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default AddStallModal;