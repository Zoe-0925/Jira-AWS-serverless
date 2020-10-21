import React, { Fragment } from "react"
import { Button } from "@material-ui/core"

export default function SaveCancelButtons({ isSubmitting, handleCancel, handleSave }) {
    return (
        <Fragment>
                <Button className="navbar-create-btn" disabled={isSubmitting} onClick={handleSave}>Save</Button>
                <Button className="cancel-btn" disabled={isSubmitting} onClick={handleCancel}>Cancel</Button>
        </Fragment>
    )
}
