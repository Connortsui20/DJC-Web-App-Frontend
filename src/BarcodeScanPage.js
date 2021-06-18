import React from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import Button from '@material-ui/core/Button';


import { Typography } from "@material-ui/core";



function BarcodeScanPage({handleCloseBarcode, addBarcode, handleAddBarcode}) {
    
    const saveBarcode = (savedCode) => {
      handleAddBarcode(savedCode);
      handleCloseBarcode();//just close for now
      }

      return(
      <div>
        <BarcodeScannerComponent
        width={400}
        height={300}
        onUpdate={(err, savedCode) => { 
          if (err) {
            console.log("No Barcode Found DEBUG");
          }
          if (savedCode) {
              saveBarcode(savedCode.text);
            }
        }} /> 

      <div><Typography variant="subtitle1">{addBarcode}</Typography></div>
      
        <Button onClick={handleCloseBarcode} color="primary" autoFocus>
                Cancel
            </Button>
      </div> 
      

      );
}


export default BarcodeScanPage;