import React, { Fragment } from 'react';
import { Form } from 'formik';
import { DialogActions, Dialog } from '@material-ui/core';
import { DialogCloseIcon } from "../buttons/iconButtons"
import { SubmitCancelButtonSet } from "../buttons/buttons"
import { Row, Col } from 'reactstrap';


export const DialogContentContainer = ({ handleClose, dialogClassName = "", title = "", subtitle = "", children, isSubmitting = false, handleSubmit, handleCancel, submitLabel = "" }) => (
    <Fragment>
        <Row>
            <Col><p className="title">{title}</p></Col>
            <Col xs="auto"> <DialogCloseIcon handleClose={handleClose} /></Col>
        </Row>
        <div className={dialogClassName}>
            <p className="sub-title">{subtitle}</p>
            <Form onSubmit={handleSubmit}>
                {children}
                <DialogActions>
                    <SubmitCancelButtonSet isSubmitting={isSubmitting} handleSave={handleSubmit} handleCancel={handleCancel} submitLabel={submitLabel} />
                </DialogActions>
            </Form>
        </div>
    </Fragment>
)

export const MyDialog = ({ open, handleClose, maxWidth, fullWidth = false, children, fullScreen = false }) => (
    <Fragment>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            fullScreen={fullScreen}
        >
            {children}
        </Dialog>
    </Fragment>
)
