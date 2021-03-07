import React from 'react'
import { Button } from '@material-ui/core';
import { Row } from "reactstrap"


export const SubmitCancelButtonSet = ({ isSubmitting, handleSave, handleCancel, submitLabel }) => (
    <Row className="action-btns">
        <Button className="navbar-create-btn" disabled={isSubmitting} onClick={handleSave}>{submitLabel}</Button>
        <Button className="cancel-btn" disabled={isSubmitting} onClick={handleCancel}>Cancel</Button>
    </Row>
)

