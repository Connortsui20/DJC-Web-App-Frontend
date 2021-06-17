import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



function ErrorPopup({openError, handleCloseError, theme}) {
    
    return (
        <div><Dialog
            open={openError}
            onClose={handleCloseError}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
                <DialogContent><DialogContentText id="alert-dialog-description">
                        There is an error probably
                    </DialogContentText></DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseError} color="primary">
                        +button?
                    </Button>
                    <Button onClick={handleCloseError} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog></div>
    );

}


export default ErrorPopup;