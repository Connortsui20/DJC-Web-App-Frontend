import React from "react"

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";


export default function ErrorPopup({ openError, handleCloseError, theme }) {
    //openError is a boolean, true brings up the popup, false closes it
    //handleCloseError closes the error popup

    return (
        <div><Dialog
            open={openError}
            onClose={handleCloseError}>
            <DialogTitle id="error">{"Error"}</DialogTitle>
            <DialogContent><DialogContentText id="error description">
                There is an error probably
            </DialogContentText></DialogContent>
            <DialogActions>
                <Button onClick={handleCloseError} color="primary" autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog></div>
    );

}