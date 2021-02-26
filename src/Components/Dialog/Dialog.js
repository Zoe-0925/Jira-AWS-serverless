import React, { Fragment } from 'react';
import { Form } from 'formik';
import { DialogActions, Dialog } from '@material-ui/core';
import { DialogCloseIcon } from "../Buttons/IconButtons"
import { SubmitCancelButtonSet } from "../Buttons/Buttons"
import { Row, Col } from 'reactstrap';


export const DialogContentContainer = ({ handleClose, dialogClassName = "", title = "", subtitle = "", children, isSubmitting = false, handleSubmit, handleCancel, submitLabel = "" }) => (
    <Fragment>
        <Row>
            <Col><p className="title">{title}</p></Col>
            <Col md="auto"> <DialogCloseIcon handleClose={handleClose} /></Col>
        </Row>
        <div className={dialogClassName}>
            <p className="sub-title">{subtitle}</p>
            <Form onSubmit={handleSubmit}>
                {children}
                <DialogActions>
                    <SubmitCancelButtonSet isSubmitting={isSubmitting} handleSubmit={handleSubmit} handleCancel={handleCancel} submitLabel={submitLabel} />
                </DialogActions>
            </Form>
        </div>
    </Fragment>
)

const dialogStyles = theme => ({
    dialogCustomizedWidth: {
        'max-width': '80%'
    }
});

export const MyDialog = ({ open, handleClose, maxWidth, fullWidth = false, children, fullScreen = false }) => (
    <Fragment>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            fullScreen={fullScreen}
            className="dialog-container"
        >
            {children}
        </Dialog>
    </Fragment>
)

//TODO Fix dialog max width width
//https://stackoverflow.com/questions/51781244/how-can-i-make-dialog-take-80-of-the-screen-in-material-ui/51782463