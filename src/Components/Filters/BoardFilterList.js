import React, { useState } from "react";
import { useSelector } from "react-redux"
import IssueFilter from "./IssueFilter"
import { Tooltip } from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupBy from "./GroupBy"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FilterButton from "./FilterButton"
import { selectEpics, selectLabels } from '../../Reducers/Selectors';
import { v4 as uuidv4 } from 'uuid'
import { Row } from 'reactstrap';

//TODO
//It receives an event handler to change filters
const BoardFilterList = () => {
    const labels = useSelector(selectLabels)
    const epics = useSelector(selectEpics)

    const [filters, setFilter] = useState({ labels: [], epics: [], issueId: "" })

    const setEpicFilter = (newList) => {
        setFilter({ ...filters, epics: newList })
    }

    const setLabelFilter = (newList) => {
        setFilter({ ...filters, labels: newList })
    }

    return (
        <Row key={uuidv4()} className="filter-row">
            <IssueFilter className="item-1" />
            <AccountCircleIcon className="icon item-2" fontSize="large" />
            <Tooltip title="Add people" aria-label="Add people">
                <PersonAddIcon className="icon item-3" fontSize="large" />
            </Tooltip>
            {epics.length > 0 && <FilterButton key={uuidv4()} data={epics} buttonName="Epic" label="summary" handleSelect={setEpicFilter} />}
            {labels.length > 0 && <FilterButton key={uuidv4()} data={labels} buttonName="Label" label="name" handleSelect={setLabelFilter} />}
            <GroupBy className="item-5" />
        </Row>
    )
}

export default BoardFilterList