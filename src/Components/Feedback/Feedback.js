import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { DialogContentContainer } from "../Dialog/Dialog"

export const SuccessfulFeedback = ({ open, message }) => {

    const Alert = (props) => {
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
