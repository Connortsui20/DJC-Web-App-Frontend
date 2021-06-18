import React from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

import HeaderScan from './components/HeaderScanPage';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    camera: {

        margin: theme.spacing(10, 0),
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }

}));


export default function BarcodeScanPage({ handleCloseBarcode, addBarcode, handleAddBarcode }) {

    const scanTheme = useStyles();

    const saveBarcode = (savedCode) => {
        handleAddBarcode(savedCode); //save the code (in App.js)
        handleCloseBarcode(); //return to home page once it is over
    }

    return (
        <div>
            <div>
                <HeaderScan handleCloseBarcode={handleCloseBarcode} />
            </div>
            <div className={scanTheme.camera}>
                <BarcodeScannerComponent
                    width={"100%"}
                    onUpdate={(err, savedCode) => {
                        // if (err) {
                        //     console.log("No Barcode Found DEBUG"); //for debugging
                        // }
                        if (savedCode) {
                            saveBarcode(savedCode.text);
                        }
                    }} />
            </div>
        </div>
    );

}