import React from "react"

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useTranslation } from "react-i18next";


export default function ErrorPopup({ error, handleCloseError, handleCloseLoginError, theme }) {
    //handleCloseError closes the error popup and resets the error

    const { t } = useTranslation();

    const decideClose = () => {
        if (error.response?.status === 401){
            handleCloseLoginError(); //* specific step with extra precautions just in case a bug happens, not necessary
        } else {
            handleCloseError();
        }     
    }

    return (
        <div><Dialog
            open={!!error}
            onClose={decideClose}>
            <DialogTitle id="error">{t("Error Title")}</DialogTitle>
            <DialogContent><DialogContentText id="error description">
                {error.message}
            </DialogContentText></DialogContent>
            <DialogActions>
                <Button onClick={decideClose} color="primary" autoFocus>
                    {t("Ok")}
                </Button>
            </DialogActions>
        </Dialog></div>
    );

}