import React, { useState } from "react";
import { useSelector } from "react-redux"
import IssueDetail from "../Issues/IssueUpdate"
import { selectAllStatus, selectGroupBy } from "../../Reducers/Selectors"
import { IssueDroppable } from "./Droppable";
import StatusCreate from "./StatusCreate"

//TODO 
//Update this to accept children


//TODO
//Inside the draggable
//  <IssueCard task={task} openTaskDetail={openTaskDetail} />

export default function DragAndDrop() {
    const columns = useSelector(selectAllStatus)

    //  const { createNewColumn } = useCreateStatus(initialStatus._id)

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
