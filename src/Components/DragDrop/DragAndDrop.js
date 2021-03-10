import React, { useState } from "react";
import { useSelector } from "react-redux"
import { MyDraggable, MyDroppable } from "./DraggableAndDroppable";
import Column from "../StatusColumn/Column"
import { v4 as uuidv4 } from 'uuid'
import IssueCardHOC from "../IssueCard/IssueCardHOC";
import { findItemById } from "../Util"
import IssueDetailDialog from "../Dialog/UpdateIssueDIalog"
import Filters from "../Filters/Filters"
import { selectTasks, selectStatus } from "../../Reducers/Selectors"
import { useFilter } from "../Hooks/Hooks"

const DragAndDrop = () => {
    const [isIssueDetailOpen, setOpen] = useState(false)
    const [currentIssue, setIssue] = useState()
    const status = useSelector(selectStatus)
    const tasks = useSelector(selectTasks)

    const { filteredTasks, filters, filterByCurrentUser, setUserFilter, clearFilter } = useFilter(tasks)

    const openIssueDetail = issue => {
        setOpen(true)
        setIssue(issue)
    }
    
    return (
        <>
            <Filters filtered={filters.filtered}
                filterByCurrentUser={filterByCurrentUser} setUserFilter={setUserFilter} clearFilter={clearFilter} />
            <div className="column-list">
                {status.map((el, ind) =>
                    <MyDroppable key={ind} el={el} ind={ind}>
                        <Column key={uuidv4()} status={el}>
                            {el.issues.map((issueId, index) =>
                                <MyDraggable key={uuidv4()} id={issueId} index={index}>
                                    <IssueCardHOC key={uuidv4()} issue={findItemById(!filters.filtered?tasks:filteredTasks, issueId)} handleClick={openIssueDetail} />
                                </MyDraggable>
                            )}
                        </Column>
                    </MyDroppable>
                )}
            </div>
            {isIssueDetailOpen && <IssueDetailDialog currentIssue={currentIssue} handleClose={() => setOpen(false)} open={isIssueDetailOpen}
            />}
        </>
    )
}

export default DragAndDrop
