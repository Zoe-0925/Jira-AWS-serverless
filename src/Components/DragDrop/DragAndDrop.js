import React, { useState } from "react";
import { useSelector } from "react-redux"
import IssueDetail from "../Issues/IssueUpdate"
import { selectAllStatusInArrayWithIssues } from "../../Reducers/Selectors"
import { IssueDroppable } from "./Droppable";
import StatusCreate from "./StatusCreate"

export default function DragAndDrop({ filters }) {
    const columns = useSelector(selectAllStatusInArrayWithIssues)

    //Filter
    const columnFiltered = columns.map(each => {
        if(each && filters && each.issues){
            let issuesFiltered = [...each.issues]
            if (filters.labels) { issuesFiltered = filterByLabel(issuesFiltered) }
            if (filters.epics) { issuesFiltered = filterByEpic(issuesFiltered) }
            each.issuesFiltered = issuesFiltered.map(each => each._id)
            return each
        }
    })
    
    /**
     *     {filterByEpic !== "" && el.issues.filter(item => { item.parent === filterByEpic }).map((issueId, index) =>
                                    draggable(issues.get(issueId), index, openTaskDetail)
                                )}
                                {filterByLabel !== "" && el.issues.filter(item => { item.label === filterByLabel }).map((issueId, index) =>
                                    draggable(issues.get(issueId), index, openTaskDetail)
                                )}
                                {filterByAssignee && el.issues.filter(item => { item.filterByAssignee === filterByAssignee }).map((issueId, index) =>
                                    draggable(issues.get(issueId), index, openTaskDetail)
                                )}
     */



    const [open, setOpen] = useState(false)
    const [issueOpened, setIssue] = useState("")

    const openTaskDetail = (task) => {
        setOpen(true)
        setIssue(task)
    }

    return (
        <div className="epic-list">
            {open && <IssueDetail open={open} handleClose={() => setOpen(false)} issue={issueOpened} />}
            <IssueDroppable columns={columns} openTaskDetail={openTaskDetail} />
            <StatusCreate />
        </div>
    );
}
