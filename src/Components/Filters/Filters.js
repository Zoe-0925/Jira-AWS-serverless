import React from "react";
import IssueSearchBox from "./IssueSearchBox"
import { v4 as uuidv4 } from 'uuid'
import { Row } from 'reactstrap';
import { useLocalFilter } from "../Hooks/Hooks"
import { Tooltip, Avatar, Button, Divider } from '@material-ui/core';

const Filters = ({ users, handleUserFilter, handleQuery, handleFilterByCurrentUser, handleClearFilter }) => {

    const { filters, filterByCurrentUser, setUserFilter, clearFilter } = useLocalFilter({ handleFilterByCurrentUser, handleUserFilter, handleClearFilter })

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
            {filters.filtered && (
                <>
                    <Divider className="vertical-divider" orientation="vertical" flexItem />
                    <Button className="filter-btn" onClick={clearFilter}>Clear All</Button>
                </>)}
        </Row>
    )
}

export default Filters