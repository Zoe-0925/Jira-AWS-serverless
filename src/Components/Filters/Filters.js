import React, { useState } from "react";
import IssueSearchBox from "./IssueSearchBox"
import FilterButton from "./FilterButton"
import { v4 as uuidv4 } from 'uuid'
import { Row } from 'reactstrap';
import { Tooltip, Avatar ,Button , Divider} from '@material-ui/core';

const Filters = ({ users, handleUserFilter, handleQuery, handleFilterByCurrentUser, handleClearFilter}) => {
    const [filters, setFilter] = useState({ filtered: false, users: [], currentUser:false, issueId: ""})
 
    

   // const epics = useSelector(selectEpics)
  
 const filterByCurrentUser = ()=>{
   setFilter({  filtered:true, users: [],currentUser:true })
   handleFilterByCurrentUser()
 }

    const setUserFilter = (id) => {
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

    const avatars = users.map(user => {
       return (
        <Tooltip key={user.name} title={user.name} aria-label={user.name}>
        <Avatar className="avatar" onClick={()=>setUserFilter(user._id)} style={{ cursor: "pointer" }} alt={user.name} src={user.avatar}/>
    </Tooltip>
    )
        })

    return (
        <Row key={uuidv4()} className="filter-row">
            <IssueSearchBox handleQuery={handleQuery} className="issue-search" />
            {avatars}
            <Button className="filter-btn" onClick={filterByCurrentUser}>Only My Issues</Button>
        {filters.filtered &&   ( 
            <>
            <Divider className="vertical-divider" orientation="vertical" flexItem/>
            <Button className="filter-btn" onClick={clearFilter}>Clear All</Button>
            </> )   }
        </Row>
    )
}

export default Filters

 /**

  * 
  *   {epics.length > 0 && <FilterButton key={uuidv4()} data={epics} buttonName="Epic" label="summary" handleSelect={setEpicFilter} />}
            
  */