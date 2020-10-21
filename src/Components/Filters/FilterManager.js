import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Tooltip } from '@material-ui/core';
import IssueFilter from "./IssueFilter"
//import Label from "./Label"
import GroupBy from "./GroupBy"

export default function FilterManager() {
    //TODO
    //Retrieve the user name from the server
    const userName = "Zoe"

    return (
        <div className="row filter-row">
            <IssueFilter className="item-1" />
            <Tooltip title={userName} aria-label={userName}>
                <AccountCircleIcon className="icon item-2" fontSize="large" />
            </Tooltip>
            <Tooltip title="Add people" aria-label="Add people">
            <PersonAddIcon className="icon item-3" fontSize="large" />
            </Tooltip>
            <GroupBy className="item-5" />
        </div>
    )
}

// No filter
// Filter by issue summary
// Filter by epic
// filter by label
// group by assignee
// group by epic
// group by subtask 

// 选中了什么 filter 还要显示数字（local state）

//Group by view
//Now we have none group by view