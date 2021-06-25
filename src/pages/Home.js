import React, { useState, useEffect } from "react";

import HeaderIn from "../components/HeaderLoggedIn";
import ErrorPopup from "../components/ErrorPopup";
import LogoutPopup from "../components/LogoutPopup";
import DataTable from "../components/DataTable";

import { makeStyles } from "@material-ui/core/styles";




export default function Home({ GetRows, rows, date, token, Logout, handleOpenBarcode, handleOpenLogoutCheck, error, openError, handleCloseError, handleCloseLoginError,
    logoutCheck, handleCloseLogoutCheck, theme }) {

    const useStyles = makeStyles((theme) => ({
        form: { //padding to table
            padding: "0 5%"
        },
    }));
    const tableTheme = useStyles();

    useEffect(() => {
        GetRows(token);
    }, [date]); //there might be a better way to do this but this still works fine

    return (
        <div>
            <div>
                <HeaderIn handleOpenBarcode={handleOpenBarcode} handleOpenLogoutCheck={handleOpenLogoutCheck} />
            </div>
            <div className={tableTheme.form}>
                <ErrorPopup error={error} openError={openError} handleCloseError={handleCloseError} handleCloseLoginError={handleCloseLoginError} theme={theme} />
                <LogoutPopup logoutCheck={logoutCheck} handleCloseLogoutCheck={handleCloseLogoutCheck} Logout={Logout} theme={theme} />
                <DataTable rows={rows} />
            </div>
        </div>
    );

}