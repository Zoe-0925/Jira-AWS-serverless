import React from "react";
import { useSelector } from "react-redux"
import IssueFilter from "./IssueFilter"
import { Tooltip } from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupBy from "./GroupBy"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FilterButton from "./FilterButton"
import { selectEpics, selectLabels } from '../../Reducers/Selectors';

//TODO
//It receives an event handler to change filters
const BoardFilterList = () => {
    const labels = useSelector(selectLabels)
    const epics = useSelector(selectEpics)

    return (
        <div className="row filter-row">
            <IssueFilter className="item-1" />
            <AccountCircleIcon className="icon item-2" fontSize="large" />
            <Tooltip title="Add people" aria-label="Add people">
                <PersonAddIcon className="icon item-3" fontSize="large" />
            </Tooltip>
            {epics.length > 0 ? <FilterButton data={epics} buttonName="Epic" label="summary" handleSelect={setEpicFilter} /> : "Create Epic"}
            {labels.length > 0 ? <FilterButton data={labels} buttonName="Label" label="name" handleSelect={setLabelFilter} /> : "Create Label"}
            <GroupBy className="item-5" />
        </div>
    )
}

export default BoardFilterList