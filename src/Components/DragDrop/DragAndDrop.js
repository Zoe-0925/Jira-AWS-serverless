import React, { useState } from "react";
import { useSelector } from "react-redux"
import IssueDetail from "../Issues/IssueUpdate"
import { selectAllStatusInArrayWithIssues, selectLoading } from "../../Reducers/Selectors"
import { MyDraggable, MyDroppable } from "./Droppable";
import StatusCreate from "./StatusCreate"
import Column from "./Column"
import IssueCard from "../Issues/IssueCard"
import Skeleton from '@material-ui/lab/Skeleton';

export default function DragAndDrop({ filters }) {
    const columns = useSelector(selectAllStatusInArrayWithIssues)
    const loading = useSelector(selectLoading)

    //Filter
    const columnFiltered = columns.map(each => {
        if (each && filters && each.issues) {
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
            {columns.length === 0 ? <div></div> : columns.map((el, ind) => {
                if (!loading) {
                    return <MyDroppable key={ind} el={el} ind={ind}>
                        <Column initialStatus={el}>
                            {el && el.issues && el.issues.map((issueId, index) => <MyDraggable id={issueId} index={index}>
                                <IssueCard key={uuidv4()} issueId={issueId} openTaskDetail={openTaskDetail} />
                            </MyDraggable>)}
                        </Column>
                    </MyDroppable>
                }
                return <Skeleton key={uuidv4()} variant="rect" animation="wave" width={230} height={240} style={{ marginRight: "1rem" }} />
            })}
            <StatusCreate />
        </div>
    );
}
