import React, { useState } from "react";
import { useSelector } from "react-redux"
import IssueFilter from "./IssueFilter"
import GroupBy from "./GroupBy"
import FilterButton from "./FilterButton"
import { selectEpics, selectLabels, selectUsers, selectCurrentUserId } from '../../Reducers/Selectors';
import { v4 as uuidv4 } from 'uuid'
import { Row } from 'reactstrap';
import { Tooltip, Avatar ,Button , Divider} from '@material-ui/core';

const Filters = ({ users, handleUserFilter,  handleFilterByCurrentUser, handleClearFilter}) => {
    const [filters, setFilter] = useState({ filtered: false, users: [], currentUser:false, issueId: ""})
   
   //const labels = useSelector(selectLabels)
   // const epics = useSelector(selectEpics)
  
 const filterByCurrentUser = ()=>{
   setFilter({  filtered:true, users: [],currentUser:true })
   handleFilterByCurrentUser()
 }

    const setUserFilter = id => {
        let newFilters = {...filters, filtered:true,currentUser:false }
        if(filters.users.includes(id)){ //Toggle remove the user id
            newFilters.users=newFilters.users.filter(userId => userId!==id) 
        }else{ //Toggle add the user id
            newFilters.users.push(id)
        }
        setFilter(newFilters)
        handleUserFilter(newFilters.users)
    }

    const clearFilter = ()=>{
        setFilter({filtered:false,  users: [], currentUser:false, issueId: "" })
        handleClearFilter()
    }

    const avatars =  users.map(user => (
        <Tooltip key={user.name} title={user.name} aria-label={user.name}>
        <Avatar className="avatar" onClick={() => setUserFilter(user._id)} style={{ cursor: "pointer" }} alt={user.name} src={user.avatar} sizes="1.3rem" />
    </Tooltip>
    ))

    return (
        <Row key={uuidv4()} className="filter-row">
            <IssueFilter className="issue-search" />
            {avatars}
            <Button className="filter-btn" onClick={filterByCurrentUser}>Only My Issues</Button>
        {filters.filtered &&   ( 
            <>
            <Divider className="vertical-divider" orientation="vertical" flexItem/>
            <Button className="filter-btn" onClick={clearFilter}>Clear All</Button>
            </> )   }
          <GroupBy className="item-5" />
        </Row>
    )
}

export default Filters

 /**
  *    const setLabelFilter = (newList) => {
        setFilter({ ...filters, labels: newList })
    }
  * 
  * 
  *   {epics.length > 0 && <FilterButton key={uuidv4()} data={epics} buttonName="Epic" label="summary" handleSelect={setEpicFilter} />}
            {labels.length > 0 && <FilterButton key={uuidv4()} data={labels} buttonName="Label" label="name" handleSelect={setLabelFilter} />}
           
  */