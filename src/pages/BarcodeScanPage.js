import React from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

import HeaderScan from "../components/HeaderScanPage";


//! The current barcode scanner could possibly take up a lot of memory, not sure why
export default function BarcodeScanPage({ handleCloseBarcode, handleAddBarcode, theme }) {
    //handleCloseBarcode closes the barcode scan page and return to home
    //handleAddBarcode adds the barcode that is detected to the data list

    const saveBarcode = (savedCode) => {
        handleAddBarcode(savedCode); //save the code (in App.js)
        handleCloseBarcode(); //return to home page once it is over
    }

    return (
        <div style={{ "backgroundColor": "#000" }}>
            <div>
                <HeaderScan handleCloseBarcode={handleCloseBarcode} />
            </div>
            <div className={theme.camera}>
                <BarcodeScannerComponent
                    width={"100%"}
                    onUpdate={(error, savedCode) => { //error is whenever the scanner doesn't detect anything
                        if (savedCode) {
                            saveBarcode(savedCode.text);
                        }
                    }} />
            </div>
        </div>
    );

}