import React from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

import HeaderScan from "./components/HeaderScanPage";

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    camera: {

        margin: theme.spacing(10, 0),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000"
    },

}));


export default function BarcodeScanPage({ handleCloseBarcode, handleAddBarcode }) {
    //handleCloseBarcode closes the barcode scan page and return to home
    //handleAddBarcode adds the barcode that is detected to the data list

    const scanTheme = useStyles();

    const saveBarcode = (savedCode) => {
        handleAddBarcode(savedCode); //save the code (in App.js)
        handleCloseBarcode(); //return to home page once it is over
    }

    return (
        <div style={{"background-color": "#000"}}>
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