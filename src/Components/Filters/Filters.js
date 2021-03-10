import React from "react";
import { useSelector } from "react-redux"
import IssueSearchBox from "./IssueSearchBox"
import { v4 as uuidv4 } from 'uuid'
import { Row } from 'reactstrap';
import { Tooltip, Avatar, Button, Divider } from '@material-ui/core';
import {  selectUsers } from "../../Reducers/Selectors"

const Filters = ({  filtered, filterByCurrentUser, setUserFilter, clearFilter }) => {
    const users = useSelector(selectUsers)

    const avatars = users.map(user => (
        <Tooltip key={user.name} title={user.name} aria-label={user.name}>
            <Avatar className="avatar" onClick={() => setUserFilter(user._id)} style={{ cursor: "pointer" }} alt={user.name} src={user.avatar} />
        </Tooltip>
    ))

    return (
        <Row key={uuidv4()} className="filter-row">
            <IssueSearchBox handleChange={() => { }} />
            {avatars}
            <Button className="filter-btn" onClick={filterByCurrentUser}>Only My Issues</Button>
            {filtered && (
                <>
                    <Divider className="vertical-divider" orientation="vertical" flexItem />
                    <Button className="filter-btn" onClick={clearFilter}>Clear All</Button>
                </>)}
        </Row>
    )
}

export default Filters