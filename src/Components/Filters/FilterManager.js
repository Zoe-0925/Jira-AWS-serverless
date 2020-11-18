import React from 'react'
import { useSelector } from "react-redux"
import { selectUserName } from '../../Reducers/Selectors';
import IssueFilter from "./IssueFilter"
import { Tooltip } from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupBy from "./GroupBy"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default function FilterManager({ filters, setFilter }) {
    const userName = useSelector(selectUserName)


    return (
        <div className="row filter-row">
            <IssueFilter className="item-1" />
            <AccountCircleIcon className="icon item-2" fontSize="large" />
            <Tooltip title="Add people" aria-label="Add people">
                <PersonAddIcon className="icon item-3" fontSize="large" />
            </Tooltip>
            <GroupBy className="item-5" />
        </div>
    )
}
