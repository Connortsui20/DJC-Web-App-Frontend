import React from "react"

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";


export default function ErrorPopup({ error, openError, handleCloseError, handleResetError, theme }) {
    //openError is a boolean, true brings up the popup, false closes it
    //handleCloseError closes the error popup

    const closeErrorMessage = () => {
        handleCloseError();
        handleResetError();
    }

    return (
        <div><Dialog
            open={openError}
            onClose={handleCloseError}>
            <DialogTitle id="error">{"Error"}</DialogTitle>
            <DialogContent><DialogContentText id="error description">
                {error.message}
            </DialogContentText></DialogContent>
            <DialogActions>
                <Button onClick={closeErrorMessage} color="primary" autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog></div>
    );

}