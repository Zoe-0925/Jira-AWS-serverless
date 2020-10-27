import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const SuccessfulFeedback = ({ open, message }) => {

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <Snackbar open={open} autoHideDuration={3000}>
            <Alert autoHideDuration={3000} severity="success">
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SuccessfulFeedback