import React from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function LogoutPopup({ logoutCheck, handleCloseLogoutCheck, Logout, theme }) {
    //logoutCheck is a boolean, true brings up the popup, false closes it
    //handleCloseLogoutCheck closes the logout popup check
    //Logout returns to login page

    const closeLogoutWindow = () => {
        handleCloseLogoutCheck();
        Logout();
    }

    return (
        <div><Dialog
            open={logoutCheck}
            onClose={handleCloseLogoutCheck}>
            <DialogTitle id="logout popup">{"Logout"}</DialogTitle>
            <DialogContent><DialogContentText id="logout query">
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