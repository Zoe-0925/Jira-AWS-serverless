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
import { MyAvatar } from "../Shared/Tabs"

const Filters = () => {
   //const labels = useSelector(selectLabels)
   // const epics = useSelector(selectEpics)
    const users = useSelector(selectUsers)


    const [filters, setFilter] = useState({ user: [], issueId: "" })

 

    const setUserFilter = id => {
        setFilter({ ...filters, user: id })
    }

    return (
        <Row key={uuidv4()} className="filter-row">
            <IssueFilter className="issue-search" />
            {users.map(user => <MyAvatar name={user.name} id={user._id} src={user.avator} handleClick={setUserFilter} />)}
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

 /**
  *    const setLabelFilter = (newList) => {
        setFilter({ ...filters, labels: newList })
    }
  * 
  * 
  *   {epics.length > 0 && <FilterButton key={uuidv4()} data={epics} buttonName="Epic" label="summary" handleSelect={setEpicFilter} />}
            {labels.length > 0 && <FilterButton key={uuidv4()} data={labels} buttonName="Label" label="name" handleSelect={setLabelFilter} />}
           
  */