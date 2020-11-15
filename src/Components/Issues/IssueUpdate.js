import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { IssueSummaryInput, IssueDescriptionInput } from "./IssueInputs"
import { Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import {
    Divider,
    Link,
    Breadcrumbs,
    IconButton, Button, Dialog
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import {
    selectStatusById, selectStatus, selectLabels, selectProjectMembers,
    selectMemberNames, selectLabelNames, selectUserById,
} from "../../Reducers/Selectors"
import {
    chainUpdateIssueStatus, updateIssueAttribute
} from "../../Actions/issue.actions"
import CommentHOC from "../Comment/CommentHOC"
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

const IssueDetail = ({ issue, open, handleClose }) => {

    return (<Fragment>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
            maxWidth="lg"
            className="dialog-container"
        >
            <IssueDetailForm issue={issue} handleClose={handleClose} />
        </Dialog>
    </Fragment>)
}

const IssueDetailForm = ({ issue, handleClose }) => {
    const dispatch = useDispatch()
    //TODO
    //add loading reducer
    //disable buttons when loading.

    const assignee = useSelector(selectUserById(issue.assignee))
    const reportee = useSelector(selectUserById(issue.reportee))
    const currentLabels = []
    const defaultStatus = useSelector(selectStatusById(issue.status))
    const allStatus = useSelector(selectStatus)
    let statusOptions = allStatus.map(each => { return { label: each.name, value: each._id } })


    //TODO call the thunk to get all users, and save to the store
    const assigneeOptions = useSelector(selectProjectMembers).map(each => {
        return { label: each.name, value: each._id }
    }).push({ label: "Not assigned", value: "" })

    const labelOptions = useSelector(selectLabels).map(each => {
        return { label: each.name, value: each._id }
    })

    const reporterOptions = ["Jira Outlook", "Jira Service Desk Widget",
        "Jira Spreadsheets", "Statuspage for Jira", "Trello"].map(each => {
            return { label: each, value: each }
        })

    //TODO
    // Call the thunk to get a list of user objects
    // and then select them from the store
    const projectMembers = []

    function showEpic() {
    }


    //TODO
    // use effect for updated time


    return <Fragment>
        <MuiDialogTitle disableTypography className="title">
            <Row>
                <Col>
                    <Breadcrumbs aria-label="breadcrumb" style={{ display: "inline" }}>
                        <Button className="add-epic-btn" onClick={showEpic}>
                            <CreateIcon className="cursor" size="small" onClick={showEpic} />
                            Add epic
                        </Button>
                        <Link color="inherit" href="/" onClick={() => { }}>
                            {issue.key}
                        </Link>
                    </Breadcrumbs>
                </Col>
                <Col md="auto"></Col>
                <Col xs lg="1">
                    <IconButton aria-label="close" className="close-btn" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Col>
            </Row>
        </MuiDialogTitle>
        <div className="issue-detail-form">
            <Container>
                <Row>
                    <Col sm="12" md="7">
                        <IssueSummaryInput id={issue._id} summary={issue.summary} />
                        <p className="label">Description</p>
                        <IssueDescriptionInput id={issue._id} description={issue.description} />
                        <Row></Row>
                        <Row></Row>
                        <Divider />
                        <Row></Row>
                        <Row></Row>
                        <CommentHOC />
                    </Col>
                    <Col sm="12" md="5">
                        <Select
                            className="select"
                            classNamePrefix="select"
                            name="issueType"
                            defaultValue={{ label: defaultStatus.name, value: issue.status }}
                            options={statusOptions}
                            onChange={(e) => dispatch(chainUpdateIssueStatus({ _id: issue._id, value: e.value, attribute: "status" }, issue.status))}
                        />
                        <Row></Row>
                        <p className="label">Assignee</p>
                        <Select
                            className="select"
                            classNamePrefix="select"
                            name="assignee"
                            defaultValue={{ label: assignee.name, value: assignee }}
                            options={assigneeOptions}
                            onChange={(e) => dispatch(updateIssueAttribute({ _id: issue._id, value: e.value, attribute: "assignee" }))}
                            isClearable={true}
                        />
                        <Row></Row>
                        <p className="label">Labels</p>
                        <Select
                            className="select"
                            classNamePrefix="select"
                            isMulti
                            name="labels"
                            defaultValue={currentLabels}
                            options={labelOptions}
                            onChange={(e) => dispatch(updateIssueAttribute({ _id: issue._id, value: e.value, attribute: "labels" }))}
                            isClearable={true}
                        />
                        <Row></Row>
                        <p className="label">Reporter</p>
                        <Select
                            className="select"
                            classNamePrefix="select"
                            name="reportee"
                            defaultValue={{ label: reportee.name, value: reportee }}
                            options={reporterOptions}
                            onChange={(e) => dispatch(updateIssueAttribute({ _id: issue._id, value: e.value, attribute: "reporter" }))}
                        />
                        <Row></Row>
                        <Divider />
                        <Row></Row>
                        <p className="time">{"Created " + issue.created}</p>
                        <p className="time">{"Updated " + issue.updated}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    </Fragment>
}


export default IssueDetail


