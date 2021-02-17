import React, { Fragment } from 'react';
import { Form } from 'formik';
import { DialogActions, Dialog } from '@material-ui/core';
import { DialogCloseIcon } from "../Shared/Tabs"
import { SubmitCancelButtonSet } from "../Shared/Buttons"


export const DialogContentContainer = ({ handleClose, dialogClassName = "", title = "", subtitle = "", children, isSubmitting = false, handleSubmit, handleCancel, submitLabel = "" }) => (
    <Fragment>
        <DialogCloseIcon handleClose={handleClose} />
        <div className={dialogClassName}>
            <p className="title">{title}</p>
            <p className="sub-title">{subtitle}</p>
            <br />
            <Form onSubmit={handleSubmit}>
                {children}
                <DialogActions>
                    <SubmitCancelButtonSet isSubmitting={isSubmitting} handleSubmit={handleSubmit} handleCancel={handleCancel} submitLabel={submitLabel} />
                </DialogActions>
            </Form>
        </div>
    </Fragment>
)

export const MyDialog = ({ open, handleClose, maxWidth, children, fullWidth = false }) => (
    <Fragment>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            className="dialog-container"
        >
            {children}
        </Dialog>
    </Fragment>
)