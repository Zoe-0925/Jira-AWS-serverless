import React from "react";
import { v4 as uuidv4 } from 'uuid'
import { Container, Row, Col } from 'reactstrap';
import { Avatar, Tooltip, MenuItem, Box } from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { DotIconMenu } from "../Buttons/IconButtons"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    sizeAvatar: {
        height: "1.8rem",
        width: "1.8em",
        cursor: "pointer"
    },
}));

const IssueCard = ({ handleClick, issue, handleDeleteIssue, anchorEl, isOpen, anchorRef, handleMenuOpen, handleMenuClose, toggleFlag, reorderToBotttom }) => {
    const classes = useStyles();

    return (<>
        <Box boxShadow={1}
            key={uuidv4()} className={!issue.flag ? "epic-body" : "epic-body flagged"
            } >
            <Container>
                <Row className="mt-0">
                    <Col sm="10" onClick={() => handleClick(issue)}>
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
                <Row className="mt-0" onClick={() => handleClick(issue)}>
                    <Col sm="1">
                        <Tooltip title={issue.issueType || ""} aria-label={issue.issueType || ""}>
                            <CheckBoxIcon className="icon" style={{ color: "#5BC2F2" }} />
                        </Tooltip>
                    </Col>
                    <Col sm="8">
                        {issue.summary}
                    </Col>
                    <Col sm="2">
                        <Avatar className={classes.sizeAvatar} alt={issue.assignee} src={issue.assigneeAvatar} />
                    </Col>
                </Row>
            </Container>
        </Box>
    </>)
}

export default IssueCard