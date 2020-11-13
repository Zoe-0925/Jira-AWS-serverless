import React from "react";
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from "react-redux"
import { Tooltip, MenuItem, Box } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Container, Row, Col } from 'reactstrap';
import { DotIconMenu } from "../Shared/Tabs"
import { chainDeleteIssue, toggleFlag } from "../../Actions/issue.actions"
import { selectTaskById } from "../../Reducers/Selectors"

const IssueCard = ({ issueId, openTaskDetail }) => {
    const dispatch = useDispatch()
    const task = useSelector(selectTaskById(issueId))
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isOpen = Boolean(anchorEl);
    const anchorRef = React.useRef(null);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const reorderToBotttom = (e, id, status) => {
        e.preventDefault()

        //TODO
        //reorder to bottom

        
        handleMenuClose()
    }

    const handleDeleteTask = (e, id, status) => {
        e.preventDefault()
        dispatch(chainDeleteIssue(id, status, "task"))
        handleMenuClose()
    }

    if (!task) return <div></div>

    if (task) {
        return (<Box boxShadow={1}
            key={uuidv4()} className={!task.flag ? "epic-body" : "epic-body flagged"
            } >
            <Container>
                <Row className="mt-0">
                    <Col sm="10" onClick={() => openTaskDetail(task)}>
                        <p>{task.summary}</p>
                    </Col>
                    <Col sm="2">
                        <DotIconMenu className="dot-icon" anchorEl={anchorEl} isOpen={isOpen} anchorRef={anchorRef}
                            handleMenuClose={handleMenuClose} handleMenuOpen={handleMenuOpen}>
                            <MenuItem onClick={() => dispatch(toggleFlag(task._id, !task.flag))}>{!task.flag ? "Add flag" : "Remove flag"}</MenuItem>
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
                        <Tooltip title={task.issueType} aria-label={task.issueType}>
                            <CheckBoxIcon className="icon" style={{ color: "#5BC2F2" }} />
                        </Tooltip>
                    </Col>
                    <Col sm="8">
                        <p>{task.summary}</p>
                    </Col>
                    <Col sm="1">
                        <Tooltip title={task.assignee} aria-label={task.assignee}>
                            <AccountCircleIcon /></Tooltip>
                    </Col>
                </Row>
            </Container>
        </Box>)
    }
}

export default IssueCard