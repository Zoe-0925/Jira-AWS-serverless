import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from "react-redux"
import { Container, Row, Col } from 'reactstrap';
import { Tooltip, MenuItem, Box } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { DotIconMenu } from "../Shared/Tabs"
import { useDotIconMenu } from "../Shared/CustomHooks"
import { chainDeleteIssue, updateIssueAttribute } from "../../Actions/issue.actions"
import UpdateIssueDialog from "../Issues/UpdateIssueDialog"

const IssueCardHOC = ({ issue }) => {
    const dispatch = useDispatch()

    const { anchorEl, isOpen, anchorRef, handleMenuClose, handleMenuOpen } = useDotIconMenu()

    const reorderToBotttom = (e, id, status) => {
        e.preventDefault()

        //TODO
        //reorder to bottom


        handleMenuClose()
    }

    const handleDeleteIssue = (e, id, status) => {
        e.preventDefault()
        dispatch(chainDeleteIssue(id, status, "task", issue.updatedAt))  //TODO update
        handleMenuClose()
    }

    const toggleFlag = () => {
        dispatch(updateIssueAttribute({ _id: issue._id, attribute: "flag", value: !issue.flag }))
    }

    return (!issue ? <div></div> : <IssueCard issue={issue} handleDeleteIssue={handleDeleteIssue} anchorEl={anchorEl}
        isOpen={isOpen} anchorRef={anchorRef} handleMenuOpen={handleMenuOpen} issue={issue}
        handleMenuClose={handleMenuClose} toggleFlag={toggleFlag} reorderToBotttom={reorderToBotttom}
    />)
}

const IssueCard = ({ issue, handleDeleteIssue, anchorEl, isOpen, anchorRef, handleMenuOpen, handleMenuClose, toggleFlag, reorderToBotttom }) => {
    const [isIssueDetailOpen, setOpen] = useState(false)

console.log("issue in issue card", issue, "isIssueDetailOpen", isIssueDetailOpen)

    return (<>
        {isIssueDetailOpen && issue && <UpdateIssueDialog open={isIssueDetailOpen} handleClose={() => setOpen(false)} issue={issue} />}
        <Box boxShadow={1}
            key={uuidv4()} className={!issue.flag ? "epic-body" : "epic-body flagged"
            } >
            <Container>
                <Row className="mt-0">
                    <Col sm="10" onClick={() => setOpen(true)}>
                        {issue.summary}
                    </Col>
                    <Col sm="2">
                        <DotIconMenu className="dot-icon" anchorEl={anchorEl} isOpen={isOpen} anchorRef={anchorRef}
                            handleMenuClose={handleMenuClose} handleMenuOpen={handleMenuOpen}>
                            <MenuItem onClick={toggleFlag}>{!issue.flag ? "Add flag" : "Remove flag"}</MenuItem>
                            <MenuItem >Add parent</MenuItem>
                            <MenuItem >Add label</MenuItem>
                            <MenuItem onClick={e => handleDeleteIssue(e, issue._id, issue.status)}>Delete</MenuItem>
                            <MenuItem onClick={e => reorderToBotttom(e, issue._id, issue.status)} >Bottom of column</MenuItem>
                        </DotIconMenu>
                    </Col>
                </Row>
                <Row className="mt-0">
                    {issue.labels && issue.labels.length > 0 && issue.labels.map(each => <Col key={uuidv4()}><p key={uuidv4()} className="label">{each}</p></Col>)}
                </Row>
                <Row className="mt-0" onClick={() => setOpen(true)}>
                    <Col sm="1">
                        <Tooltip title={issue.issueType || ""} aria-label={issue.issueType || ""}>
                            <CheckBoxIcon className="icon" style={{ color: "#5BC2F2" }} />
                        </Tooltip>
                    </Col>
                    <Col sm="8">
                        {issue.summary}
                    </Col>
                    <Col sm="1">
                        <Tooltip title={issue.assignee || ""} aria-label={issue.assignee || ""}>
                            <AccountCircleIcon /></Tooltip>
                    </Col>
                </Row>
            </Container>
        </Box>
    </>)
}

export default IssueCardHOC