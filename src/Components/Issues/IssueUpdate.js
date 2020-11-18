import React, { Fragment } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { IssueSummaryInput, IssueDescriptionInput } from "./IssueInputs"
import IssueAddEpic from "./IssueAddEpic"
import { Row, Col } from 'reactstrap';
import Select from 'react-select';
import {
    Divider,
    Breadcrumbs,
    IconButton, Dialog
} from '@material-ui/core';
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
import { formatDate } from "../Util"
import Skeleton from '@material-ui/lab/Skeleton';

const IssueDetailSkeleton = ({ handleClose }) => <div>
    <MuiDialogTitle disableTypography className="title">
        <Row>
            <Col>
                <Breadcrumbs aria-label="breadcrumb" style={{ display: "inline" }}>
                    Issue
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
                        <Skeleton variant="rect" animation="wave" width="inherit" height={50} style={{ marginBottom: "0.5rem" }} />
                        <Skeleton variant="rect" animation="wave" width="70%" height={50} style={{ marginBottom: "3rem" }} />
                        <Skeleton variant="rect" animation="wave" width="80%" height={30} style={{ marginBottom: "0.5rem" }} />
                        <Skeleton variant="rect" animation="wave" width="inherit" height={30} style={{ marginBottom: "0.5rem" }} />
                        <Skeleton variant="rect" animation="wave" width="60%" height={30} style={{ marginBottom: "0.5rem" }} />
                        <br />
                        <br />
                        <br />
                        <Skeleton variant="rect" animation="wave" width="40%" height={30} style={{ marginBottom: "2rem" }} />
                        <Skeleton variant="rect" animation="wave" width="inherit" height={80} style={{ marginBottom: "2rem" }} />

                    </div>
                </Row>
                <Row>
                </Row>
            </Col>
            <Col sm="12" md="5">
                <Skeleton variant="rect" animation="wave" width="50%" height={20} style={{ marginBottom: "1rem" }} />
                <Skeleton variant="rect" animation="wave" width="95%" height={50} style={{ marginBottom: "2rem" }} />
                <Skeleton variant="rect" animation="wave" width="70%" height={20} style={{ marginBottom: "1rem" }} />
                <Skeleton variant="rect" animation="wave" width="80%" height={50} style={{ marginBottom: "2rem" }} />
                <Skeleton variant="rect" animation="wave" width="60%" height={20} style={{ marginBottom: "1rem" }} />
                <Skeleton variant="rect" animation="wave" width="90%" height={50} style={{ marginBottom: "2rem" }} />
            </Col>
        </Row>
    </div>
</div>


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
            {(issue === undefined || issue === "") && <IssueDetailSkeleton handleClose={handleClose} />}
            {issue !== "" && <IssueDetailForm issue={issue} handleClose={handleClose} />}
        </Dialog>
    </Fragment>)
}

const IssueDetailForm = ({ issue, handleClose }) => {
    const dispatch = useDispatch()

    const updatedTime = useSelector(selectIssueUpdatedTimeById(issue._id))
    const assignee = issue.assignee ? useSelector(selectUserById(issue.assignee)) : ""
    const reporter = issue.reporter ? issue.reporter : ""


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

    return <div>
        <MuiDialogTitle disableTypography className="title">
            <Row>
                <Col>
                    <Breadcrumbs aria-label="breadcrumb" style={{ display: "inline" }}>
                        <IssueAddEpic issueId={issue._id} />
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
                    <p className="time">{"Created " + formatDate(issue.createdAt)}</p>
                    <p className="time">{"Updated " + formatDate(updatedTime)}</p>
                </Col>
            </Row>
        </div>
    </div>
}


export default IssueDetail


