import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col } from 'reactstrap';
import { Tooltip, MenuItem, Box } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { DotIconMenu } from "../Shared/Tabs"
import { useDotIconMenu } from "../Shared/CustomHooks"
import { chainDeleteIssue, updateIssueAttribute } from "../../Actions/issue.actions"
import { selectTaskById } from "../../Reducers/Selectors"
import IssueDetail from "../Issues/IssueUpdateForm"

const IssueCardContainer = ({ issueId }) => {
    const dispatch = useDispatch()
    const task = useSelector(selectTaskById(issueId))

    const { anchorEl, isOpen, anchorRef, handleMenuClose, handleMenuOpen } = useDotIconMenu()

    const reorderToBotttom = (e, id, status) => {
        e.preventDefault()

        //TODO
        //reorder to bottom


        handleMenuClose()
    }

    const handleDeleteTask = (e, id, status) => {
        e.preventDefault()
        dispatch(chainDeleteIssue(id, status, "task", task.updatedAt))
        handleMenuClose()
    }

    const toggleFlag = () => {
        dispatch(updateIssueAttribute({ _id: task._id, attribute: "flag", value: !task.flag, updatedAt: task.updatedAt }))
    }

    return (!task ? <div></div> : <IssueCard task={task} handleDeleteTask={handleDeleteTask} anchorEl={anchorEl}
        isOpen={isOpen} anchorRef={anchorRef} handleMenuOpen={handleMenuOpen} issueId={issueId}
        handleMenuClose={handleMenuClose} toggleFlag={toggleFlag} reorderToBotttom={reorderToBotttom}
    />)
}

const IssueCard = ({ task, handleDeleteTask, anchorEl, isOpen, anchorRef, issueId, handleMenuOpen, handleMenuClose, openTaskDetail, toggleFlag, reorderToBotttom }) => {
    const [openDetail, setOpen] = useState(false)

    return (<>
        {openDetail && <IssueDetail open={openDetail} handleClose={() => setOpen(false)} issue={issueId} />}
        <Box boxShadow={1}
            key={uuidv4()} className={!task.flag ? "epic-body" : "epic-body flagged"
            } >
            <Container>
                <Row className="mt-0">
                    <Col sm="10" onClick={() => openTaskDetail(task)}>
                        {task.summary}
                    </Col>
                    <Col sm="2">
                        <DotIconMenu className="dot-icon" anchorEl={anchorEl} isOpen={isOpen} anchorRef={anchorRef}
                            handleMenuClose={handleMenuClose} handleMenuOpen={handleMenuOpen}>
                            <MenuItem onClick={toggleFlag}>{!task.flag ? "Add flag" : "Remove flag"}</MenuItem>
                            <MenuItem >Add parent</MenuItem>
                            <MenuItem >Add label</MenuItem>
                            <MenuItem onClick={e => handleDeleteTask(e, task._id, task.status)}>Delete</MenuItem>
                            <MenuItem onClick={e => reorderToBotttom(e, task._id, task.status)} >Bottom of column</MenuItem>
                        </DotIconMenu>
                    </Col>
                </Row>
                <Row className="mt-0">
                    {task.labels.length !== 0 && task.labels.map(each => <Col key={uuidv4()}><p key={uuidv4()} className="label">{each}</p></Col>)}
                </Row>
                <Row className="mt-0" onClick={() => openTaskDetail(task)}>
                    <Col sm="1">
                        <Tooltip title={task.issueType || ""} aria-label={task.issueType || ""}>
                            <CheckBoxIcon className="icon" style={{ color: "#5BC2F2" }} />
                        </Tooltip>
                    </Col>
                    <Col sm="8">
                        {task.summary}
                    </Col>
                    <Col sm="1">
                        <Tooltip title={task.assignee || ""} aria-label={task.assignee || ""}>
                            <AccountCircleIcon /></Tooltip>
                    </Col>
                </Row>
            </Container>
        </Box>
    </>)
}

export default IssueCardContainer