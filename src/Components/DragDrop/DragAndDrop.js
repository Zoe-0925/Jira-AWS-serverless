import React, { useState } from "react";
import { useSelector } from "react-redux"
import IssueDetail from "../Issues/IssueUpdate"
import { selectAllStatusInArrayWithIssues, selectLoading } from "../../Reducers/Selectors"
import { MyDraggable, MyDroppable } from "./Droppable";
import StatusCreate from "./StatusCreate"
import Column from "./Column"
import IssueCard from "../Issues/IssueCard"
import Skeleton from '@material-ui/lab/Skeleton';
import { filterByLabel, filterByEpic } from "../Util"

export default function DragAndDrop({ filters }) {
    const columns = useSelector(selectAllStatusInArrayWithIssues)
    const loading = useSelector(selectLoading)
    const [filteredIssueIds, setFilter] = useState([])

    useEffect(() => {
        if (filters) {
            const result = columns.map(each => {
                if (each && each.issues) {
                    let issuesFiltered = [...each.issues]
                    if (filters.labels) { issuesFiltered = filterByLabel(issuesFiltered, filters.labels) }
                    if (filters.epics) { issuesFiltered = filterByEpic(issuesFiltered, filters.epics) }
                    return issuesFiltered
                }
            })
            setFilter(result)
        } else {
            setFilter(columns.map(el => el.issues))
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
            {columns.length === 0 ? <div></div> : filteredIssueIds.map((el, ind) => {
                if (!loading) {
                    return <MyDroppable key={ind} el={el} ind={ind}>
                        <Column initialStatus={el}>
                            {el && el.map((issueId, index) => <MyDraggable id={issueId} index={index}>
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
