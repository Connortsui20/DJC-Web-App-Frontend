import React, { useState, useEffect } from "react";

import HeaderIn from "../components/HeaderLoggedIn";
import ErrorPopup from "../components/ErrorPopup";
import LogoutPopup from "../components/LogoutPopup";
import DataTable from "../components/DataTable";

import { makeStyles } from "@material-ui/core/styles";


export default function Home({  Logout, handleOpenBarcode, handleOpenLogoutCheck, openError, handleCloseError,
    logoutCheck, handleCloseLogoutCheck, theme }) {

        const useStyles = makeStyles((theme) => ({

            form: { //padding to table
                padding: "0 5%"
            },
    
        }));
    
        const [rows, setRows] = useState([]);
        /*
        use useEffect() to call the api with GetData();
        pass through barcode, pass through token 
        */ 


        const tableTheme = useStyles();

    return (
        <div>
            <div>
                <HeaderIn handleOpenBarcode={handleOpenBarcode} handleOpenLogoutCheck={handleOpenLogoutCheck} />
            </div>
            <div className={tableTheme.form}>
                <ErrorPopup openError={openError} handleCloseError={handleCloseError} theme={theme} />
                <LogoutPopup logoutCheck={logoutCheck} handleCloseLogoutCheck={handleCloseLogoutCheck} Logout={Logout} theme={theme} />
                <DataTable rows={rows} />
            </div>
        </div>
    );

}