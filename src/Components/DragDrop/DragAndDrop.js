import React, { useState } from "react";
import { useSelector } from "react-redux"
import IssueDetail from "../Issues/IssueUpdate"
import { selectAllStatusInArray } from "../../Reducers/Selectors"
import { IssueDroppable } from "./Droppable";
import StatusCreate from "./StatusCreate"

export default function DragAndDrop({ filters }) {
    const columns = useSelector(selectAllStatusInArray)
    const [conlumnFiltered, setColumns] = useState(columns)

    useEffect(() => {
        let result = { ...conlumnFiltered }
        if (filters.labels) { //It is a list of label ids

        }
        if (filters.epics) {//It is a list of epic ids

        }

    }, [filters])


    const [open, setOpen] = useState(false)
    const [issueOpened, setIssue] = useState("")

    const openTaskDetail = (task) => {
        setOpen(true)
        setIssue(task)
    }

    return (
        <div className="epic-list">
            {open && <IssueDetail open={open} handleClose={() => setOpen(false)} issue={issueOpened} />}
            <IssueDroppable columns={conlumnFiltered} openTaskDetail={openTaskDetail} />
            <StatusCreate />
        </div>
    );
}
