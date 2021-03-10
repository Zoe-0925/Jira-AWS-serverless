import React from "react";
import { v4 as uuidv4 } from 'uuid'
import { Container, Row, Col } from 'reactstrap';
import { Avatar, Tooltip, MenuItem, Box } from '@material-ui/core';
import { DotIconMenu } from "../Buttons/IconButtons"
import { makeStyles } from '@material-ui/core/styles';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const useStyles = makeStyles(() => ({
    sizeAvatar: {
        height: "1.8rem",
        width: "1.8em",
        cursor: "pointer"
    },
}));

const IssueCard = ({ handleClick, issue, handleDeleteIssue, anchorEl, isOpen, anchorRef, handleMenuOpen, handleMenuClose, toggleFlag }) => {
    const classes = useStyles();


    
    return (<>
        <Box boxShadow={1}
            key={uuidv4()} className={!issue.flag ? "issue-card" : "issue-card flagged"
            } >
            <Container>
                <Row >
                    <Col xs="10" onClick={() => handleClick(issue)}>
                        Task
                    </Col>
                    <Col xs="2">
                        <DotIconMenu className="dot-icon" anchorEl={anchorEl} isOpen={isOpen} anchorRef={anchorRef}
                            handleMenuClose={handleMenuClose} handleMenuOpen={handleMenuOpen}>
                            <MenuItem onClick={toggleFlag}>{!issue.flag ? "Add flag" : "Remove flag"}</MenuItem>
                            <MenuItem onClick={e => handleDeleteIssue(e, issue._id, issue.status)}>Delete</MenuItem>
                        </DotIconMenu>
                    </Col>
                </Row>
                <Row onClick={() => handleClick(issue)}>
                    <Col xs="1">
                        <Tooltip title="task" aria-label="task">
                        <CheckBoxIcon className="icon" style={{ color: "#5BC2F2" }} />
                        </Tooltip>
                    </Col>
                    <Col xs="8">
                        {issue.summary}
                    </Col>
                    <Col xs="2">
                        <Avatar className={classes.sizeAvatar} alt={issue.assignee} src={issue.assigneeAvatar} />
                    </Col>
                </Row>
            </Container>
        </Box>
    </>)
}

export default React.memo(IssueCard)