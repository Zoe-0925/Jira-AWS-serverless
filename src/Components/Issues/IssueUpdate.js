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
    selectStatusById, selectLabels, selectProjectMembers,
    selectUserById, selectIssueUpdatedTimeById, selectAllStatusInArray
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
            maxWidth="md"
            fullWidth={true}
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

    const updatedTime = useSelector(selectIssueUpdatedTimeById(issue._id))
    const assignee = issue.assignee ? useSelector(selectUserById(issue.assignee)) : ""
    const reporter = issue.reporter ? issue.reporter : ""

    console.log("assignee", assignee, issue.assignee, "reporter", reporter)

    const currentLabels = []
    const defaultStatus = useSelector(selectStatusById(issue.status))
    const allStatus = useSelector(selectAllStatusInArray)
    let statusOptions = allStatus.map(each => { return { label: each.name, value: each._id } })

    const defaultAssignee = assignee === "" ? { label: "Not assigned", value: "" } : { label: assignee.name, value: assignee }

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

    function showEpic() {
    }

    return <div>
        <MuiDialogTitle disableTypography className="title">
            <Row>
                <Col>
                    <Breadcrumbs aria-label="breadcrumb" style={{ display: "inline" }}>
                        <Button className="add-epic-btn" onClick={showEpic}>
                            <CreateIcon className="cursor" size="small" onClick={showEpic} />
                            Add epic
                        </Button>
                        {issue.key}
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
            <Row>
                <Col sm="12" md="7">
                    <Row>
                        <div className="left-container">
                            <IssueSummaryInput id={issue._id} summary={issue.summary} />
                            <p className="label">Description</p>
                            <IssueDescriptionInput id={issue._id} description={issue.description} />
                            <Row></Row>
                            <Row></Row>
                            <Divider className="divider" />
                            <Row></Row>
                            <Row md="auto"></Row>
                            <CommentHOC />
                        </div>
                    </Row>
                    <Row>
                    </Row>
                </Col>
                <Col sm="12" md="5">
                    <Select
                        className="select"
                        classNamePrefix="select"
                        name="status"
                        defaultValue={{ label: defaultStatus.name, value: issue.status }}
                        options={statusOptions}
                        onChange={(e) => dispatch(chainUpdateIssueStatus({ _id: issue._id, value: e.value, attribute: "status" }, issue.status))}
                    />
                    <Row className="margin"></Row>
                    <Row className="margin">
                        <Col sm="4">
                            <p className="small-label">Assignee</p>
                        </Col>
                        <Col sm="8">
                            <Select
                                className="select"
                                classNamePrefix="select"
                                name="assignee"
                                defaultValue={defaultAssignee}
                                options={assigneeOptions}
                                onChange={(e) => dispatch(updateIssueAttribute({ _id: issue._id, value: e.value, attribute: "assignee" }))}
                            />
                        </Col>
                    </Row>
                    <Row className="margin">
                        <Col sm="4">
                            <p className="small-label">Labels</p>
                        </Col>
                        <Col sm="8">
                            <Select
                                className="select"
                                classNamePrefix="select"
                                isMulti
                                name="labels"
                                defaultValue={currentLabels}
                                options={labelOptions}
                                onChange={(e) => dispatch(updateIssueAttribute({ _id: issue._id, value: e.value, attribute: "labels" }))}
                            />
                        </Col>
                    </Row>
                    <Row className="margin">
                        <Col sm="4">
                            <p className="small-label">Reporter</p>
                        </Col>
                        <Col sm="8">
                            <Select
                                className="select"
                                classNamePrefix="select"
                                name="reporter"
                                defaultValue={{ label: reporter.name, value: reporter }}
                                options={reporterOptions}
                                onChange={(e) => dispatch(updateIssueAttribute({ _id: issue._id, value: e.value, attribute: "reporter" }))}
                            />
                        </Col>
                    </Row>
                    <Row className="margin"></Row>
                    <Divider />
                    <Row className="margin"></Row>
                    <p className="time">{"Created " + issue.created}</p>
                    <p className="time">{"Updated " + updatedTime}</p>
                </Col>
            </Row>
        </div>
    </div>
}


export default IssueDetail


