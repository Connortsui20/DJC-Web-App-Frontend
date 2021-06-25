import React from "react"

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";


export default function ErrorPopup({ error,  openError, handleCloseError, handleCloseLoginError, theme }) {
    //openError is a boolean, true brings up the popup, false closes it
    //handleCloseError closes the error popup and resets the error

    const decideClose = () => { //? again there is probably a better way to do this but I'll do it when I finish everything else
        if (error.response.status === 401){
            //console.log(error.response.status);
            handleCloseLoginError();
        } else {
            handleCloseError();
        }
        
    }

    return (
        <div><Dialog
            open={openError}
            onClose={decideClose}>
            <DialogTitle id="error">{"Error"}</DialogTitle>
            <DialogContent><DialogContentText id="error description">
                {error.message}
            </DialogContentText></DialogContent>
            <DialogActions>
                <Button onClick={decideClose} color="primary" autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog></div>
    );

}