import React, { useState } from "react";
import { useSelector } from "react-redux"
import IssueDetail from "../Issues/IssueUpdate"
import {  selectGroupBy, selectAllStatusInArray } from "../../Reducers/Selectors"
import { IssueDroppable } from "./Droppable";
import StatusCreate from "./StatusCreate"

export default function DragAndDrop() {
    const columns = useSelector(selectAllStatusInArray)
    //----------Filters----------------------
   // const groupBy = useSelector(selectGroupBy)
    //TODO


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
