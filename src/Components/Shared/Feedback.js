import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const SuccessfulFeedback = ({ open, message }) => {

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <Snackbar open={open} autohideduration={3000}>
            <Alert autohideduration={3000} severity="success">
                {message}
            </Alert>
        </Snackbar>
    )
}

export const WarningFeedback = ({ open, title, message, handleClose, handleConfirm }) => {

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirm} className="confirm-btn">
                        Delete
            </Button>
                    <Button onClick={handleClose} className="cancel-btn" autoFocus>
                        Cancel
            </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}