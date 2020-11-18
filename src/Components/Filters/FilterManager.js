import React from 'react'
import { selectUserName } from '../../Reducers/Selectors';

export default function FilterManager({ filters, setFilter }) {
    const userName = useSelector(selectUserName)


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
