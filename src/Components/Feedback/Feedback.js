import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
