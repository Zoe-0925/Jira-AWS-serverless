import React, { useState } from "react";
import { useSelector } from "react-redux"
import IssueFilter from "./IssueFilter"
//import { Tooltip } from '@material-ui/core'
//import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupBy from "./GroupBy"
import FilterButton from "./FilterButton"
import { selectEpics, selectLabels, selectUsers } from '../../Reducers/Selectors';
import { v4 as uuidv4 } from 'uuid'
import { Row } from 'reactstrap';
import { Tooltip, Avatar } from '@material-ui/core'


const Filters = () => {
    const labels = useSelector(selectLabels)
    const epics = useSelector(selectEpics)
    const users = useSelector(selectUsers)


    const [filters, setFilter] = useState({ labels: [], epics: [], issueId: "" })

    const setEpicFilter = (newList) => {
        setFilter({ ...filters, epics: newList })
    }

    const setLabelFilter = (newList) => {
        setFilter({ ...filters, labels: newList })
    }

    const avators = users.map(user => (
        <Tooltip key={user.name} title={user.name} aria-label={user.name}>
            <Avatar style={{ cursor: "pointer" }} alt={user.name} src={user.avator} sizes="1.3rem"/>
        </Tooltip>
    ))

    return (
        <Row key={uuidv4()} className="filter-row">
            <IssueFilter className="issue-search" />
            {avators}
            {epics.length > 0 && <FilterButton key={uuidv4()} data={epics} buttonName="Epic" label="summary" handleSelect={setEpicFilter} />}
            {labels.length > 0 && <FilterButton key={uuidv4()} data={labels} buttonName="Label" label="name" handleSelect={setLabelFilter} />}
            <GroupBy className="item-5" />
        </Row>
    )
}

export default Filters

/**
 * //deprecated
 *           <Tooltip title="Add people" aria-label="Add people">
                <PersonAddIcon className="icon item-3" fontSize="large" />
            </Tooltip>
 */