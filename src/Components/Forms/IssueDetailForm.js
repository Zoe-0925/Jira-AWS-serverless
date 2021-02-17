import React from 'react';
import { useSelector, useDispatch } from "react-redux"
import { IssueSummaryInput, IssueDescriptionInput } from "../Issues/IssueInputsFields"
import IssueAddEpic from "../Issues/IssueAddEpic"
import { Row, Col } from 'reactstrap';
import { Divider, Breadcrumbs, IconButton } from '@material-ui/core';
import {
    selectStatusById, selectLabels, selectProjectMembers, selectUserById,selectAllStatusInArray
} from "../../Reducers/Selectors"
import { chainUpdateIssueStatus, updateIssueAttribute } from "../../Actions/issue.actions"
import CommentHOC from "../Comment/CommentHOC"
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { formatDate } from "../Util"
import { FormSelectField } from "../Shared/FormFields"

const IssueDetailForm = ({ issue, handleClose }) => {
    const dispatch = useDispatch()
    const assignee = useSelector(selectUserById(issue.assignee || ""))
    const reporter = issue.reporter ? issue.reporter : ""
    const currentLabels = useSelector(selectLabels)
    const defaultStatus = useSelector(selectStatusById(issue.status))
    const allStatus = useSelector(selectAllStatusInArray)
    let statusOptions = allStatus.map(each => { return { label: each.name, value: each._id } })
    const defaultAssignee = assignee === "" ? { label: "Not assigned", value: "" } : { label: assignee.name, value: assignee }

    const assigneeOptions = useSelector(selectProjectMembers).map(each => {
        return { label: each.name, value: each._id }
    }).push({ label: "Not assigned", value: "" })

    const labelOptions = currentLabels.map(each => {
        return { label: each.name, value: each._id }
    })

    const reporterOptions = ["Jira Outlook", "Jira Service Desk Widget",
        "Jira Spreadsheets", "Statuspage for Jira", "Trello"].map(each => {
            return { label: each, value: each }
        })

    const changeStatus = (e) => {
        dispatch(chainUpdateIssueStatus({ _id: issue._id, value: e.value, attribute: "status" }, issue.status))
    }

    const changeAssignee = (e) => {
        dispatch(updateIssueAttribute({ _id: issue._id, value: e.value, attribute: "assignee" }))
    }

    const changeLabels = (e) => {
        dispatch(updateIssueAttribute({ _id: issue._id, value: e.value, attribute: "labels" }))
    }

    const changeReporter = (e) => {
        dispatch(updateIssueAttribute({ _id: issue._id, value: e.value, attribute: "reporter" }))
    }

    return (
        <div>
            <MuiDialogTitle disableTypography className="title">
                <Row>
                    <Col>
                        <Breadcrumbs aria-label="breadcrumb" style={{ display: "inline" }}>
                            {issue ? <IssueAddEpic issueId={issue._id} /> : "Issue"}
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
                                <br />
                                <Divider className="divider" />
                                <br />
                                <CommentHOC />
                            </div>
                        </Row>
                        <br />
                    </Col>
                    <Col sm="12" md="5">
                        <FormSelectField id="status" inputLabel="Status" options={statusOptions} defaultValue={{ label: defaultStatus.name, value: issue.status }}
                            handleChange={changeStatus}
                        />
                        <br />
                        <br />
                        <FormSelectField id="assignee" inputLabel="Assignee" options={assigneeOptions} defaultValue={defaultAssignee}
                            handleChange={changeAssignee}
                        />
                        <br />
                        <FormSelectField id="labels" inputLabel="Labels" options={labelOptions} defaultValue={currentLabels} isMulti={true}
                            handleChange={changeLabels}
                        />
                        <br />
                        <FormSelectField id="reporter" inputLabel="Reporter" options={reporterOptions} defaultValue={{ label: reporter.name, value: reporter }}
                            handleChange={changeReporter} />
                        <br />
                        <Divider />
                        <br />
                        <p className="time">{"Created " + formatDate(issue.createdAt)}</p>
                        <p className="time">{"Updated " + formatDate(issue.updatedAt)}</p>
                    </Col>
                </Row>
            </div>
        </div>
    )
}


export default IssueDetailForm