import React from "react"

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useTranslation } from "react-i18next";


export default function LogoutPopup({ logoutCheck, handleCloseLogoutCheck, Logout, theme }) {
    //logoutCheck is a boolean, true brings up the popup, false closes it
    //handleCloseLogoutCheck closes the logout popup check
    //Logout returns to login page

    const { t } = useTranslation();

    const closeLogoutWindow = () => {
        handleCloseLogoutCheck();
        Logout();
    }

    return (
        <div><Dialog
            open={logoutCheck}
            onClose={handleCloseLogoutCheck}>
            <DialogTitle id="logout popup">{t("Logout Title")}</DialogTitle>
            <DialogContent><DialogContentText id="logout query">
                {t("Logout Message")}
            </DialogContentText></DialogContent>
            <DialogActions>
                <Button onClick={handleCloseLogoutCheck} color="primary">
                    {t("Cancel")}
                </Button>
                <Button onClick={closeLogoutWindow} color="primary">
                    {t("Yes")}
                </Button>
            </DialogActions>
        </Dialog></div>
    );

}