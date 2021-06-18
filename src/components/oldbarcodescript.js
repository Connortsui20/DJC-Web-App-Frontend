/*import React from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Typography } from "@material-ui/core";

 
function BarcodeScan({openBarcode, handleCloseBarcode, addBarcode, handleAddBarcode}) {
 
  const saveBarcode = (savedCode) => {
    handleCloseBarcode(savedCode);//just close for now
    //save the barcode into a hook or something
  }
 
  return (
    <div><Dialog
            open={openBarcode}
            onClose={handleCloseBarcode}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"Add Barcode"}</DialogTitle>
      <BarcodeScannerComponent
        width={400}
        height={300}
        onUpdate={(err, result) => {
          if (result) {
              saveBarcode(result.text);
            }
          else handleAddBarcode('Not Barcode Found');
        }}
      />
        <DialogActions>
            <Button onClick={handleCloseBarcode} color="primary" autoFocus>
                Cancel
            </Button>
        </DialogActions>

      <div><Typography variant="subtitle1">{addBarcode}</Typography></div>
      </Dialog></div>
  )
}
 
export default BarcodeScan;*/