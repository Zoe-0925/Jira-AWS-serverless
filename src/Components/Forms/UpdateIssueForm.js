import React from 'react';
import { useSelector, useDispatch } from "react-redux"
import { IssueSummaryInput, IssueDescriptionInput } from "../EditableInput/IssueInputsFields"
import { Row, Col } from 'reactstrap';
import { Avatar, Divider, Breadcrumbs, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { selectUsers, selectUserById, selectStatus, selectStatusNameById, selectCurrentUserId } from "../../Reducers/Selectors"
import { updateTaskAttribute, chainDeleteIssue } from "../../Actions/issue.actions"
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { formatDate } from "../Util"
import { IssueDetailFormSelectField } from "./FormFields"
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CommentHOC from "../Comment/CommentBox"

export const UserAvatar = ({ name, avatar }) => (
    <Row>
        <Avatar className="avatar" style={{ cursor: "pointer" }} alt={name} src={avatar} />
        <span style={{ paddingLeft: "1rem" }}>{name}</span>
    </Row>
)

const IssueDetailForm = ({ issue, handleClose }) => {
    const dispatch = useDispatch()
    const assignee = useSelector(selectUserById(issue.assignee || ""))
    const reporter = useSelector(selectUserById(issue.reporter || ""))
    const allStatus = useSelector(selectStatus)
    const statusName = useSelector(selectStatusNameById(issue.status))

    let statusOptions = allStatus.map(each => { return { label: each.name, value: each._id } })
    const userOptions = useSelector(selectUsers).map(each => {
        return {
            label: (<UserAvatar name={each.name} avatar={each.avatar} />), value: each._id
        }
    })

    const defaultStatus = { label: statusName || "", value: issue.status }
    const defaultAssignee = assignee === "" ? { label: "Not assigned", value: "" } : { label: <UserAvatar name={assignee.name} avatar={assignee.avatar} />, value: assignee._id }
    const defaultReporter = reporter === "" ? { label: "Not assigned", value: "" } : { label: <UserAvatar name={reporter.name} avatar={reporter.avatar} />, value: reporter._id }


    const deleteIssue = () => {
        dispatch(chainDeleteIssue(issue._id, issue.status, issue.issueType))
    }

    const selectOptions = [
        { id: "status", label: "Status", default: defaultStatus, options: statusOptions },
        { id: "assignee", label: "Assignee", default: defaultAssignee, options: userOptions },
        { id: "reporter", label: "Reporter", default: defaultReporter, options: userOptions },
    ]

    const selects = selectOptions.map(each => (
        <IssueDetailFormSelectField key={each.id} id={each.id} inputLabel={each.label} options={each.options} defaultValue={each.default}
            handleChange={(e) => dispatch(updateTaskAttribute({ _id: issue._id, value: e.value, attribute: each.id }))} />
    ))

    return (
        <div>
            <MuiDialogTitle className="issue-detail-form">
                <Row>
                    <Col>
                        <Breadcrumbs aria-label="breadcrumb" style={{ display: "inline" }}>
                            <Row className="breadcrums"><CheckBoxIcon className="icon" style={{ color: "#5BC2F2" }} /><p>Task</p></Row>
                        </Breadcrumbs>
                    </Col>
                    <Col xs="auto"></Col>
                    <Col xs="auto">
                        <IconButton aria-label="delete" className="delete-btn" onClick={deleteIssue}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="close" className="close-btn" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Col>
                </Row>
            </MuiDialogTitle>
            <div className="issue-detail-form">
                <Row>
                    <Col xs="12" md="8">
                        <Row className="left-container">
                            <div className="left-container">
                                <IssueSummaryInput id={issue._id} summary={issue.summary} />
                                <p className="label">Description</p>
                                <IssueDescriptionInput id={issue._id} description={issue.description} />
                                <br />
                                <p className="label">Comments</p>
                                <CommentHOC issueId={issue._id}/>
                            </div>
                        </Row>
                        <br />
                    </Col>
                    <Col xs="12" md="4">
                        {selects}
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