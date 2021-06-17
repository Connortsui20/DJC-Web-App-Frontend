import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



function LogoutPopup({logoutCheck, handleCloseLogoutCheck, Logout, theme}) {

    const closeLogoutWindow  = () => {
        handleCloseLogoutCheck();
        Logout();
    }
    
    return (
        <div><Dialog
            open={logoutCheck}
            onClose={handleCloseLogoutCheck}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
                <DialogContent><DialogContentText id="alert-dialog-description">
                        Are you sure you want to logout?
                    </DialogContentText></DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseLogoutCheck} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={closeLogoutWindow} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog></div>
    );

}


export default LogoutPopup;