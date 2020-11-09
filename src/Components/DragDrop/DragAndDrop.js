import React, { useState, useEffect } from "react";
import {useStore} from "react-redux"
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux"
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Column from "./Column"
import {
    selectStatusOrder, selectTasks, selectNoneFilter, selectStatusReducer,
    selectFilterByEpic, selectFilterByLabel, selectFilterByAssignee, selectGroupBy, selectProjectReducer
} from "../../Reducers/Selectors"
import { useIssueDetailModal } from "./CustomHooks"
import IssueCard from "../Issues/IssueCard"
import IssueDetail from "../Issues/IssueDetail"


export const MyDraggable = (task, index, openTaskDetail) => {
    return task === undefined ? <div></div> : <Draggable
        className="draggable"
        key={task._id}
        draggableId={task._id}
        index={index}
    >
        {(provided, snapshot) => (
            <div
                className={snapshot.isDragging ? "is-dragging" : "epic-box"}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={provided.draggableProps.style}
            >
                <IssueCard task={task} openTaskDetail={openTaskDetail} />
            </div>)}
    </Draggable>
}


export default function DragAndDrop() {
    const status = useSelector(selectStatusReducer).status
    const tasks = useSelector(selectTasks)
    const projectId = useSelector(selectProjectReducer).currentProjectId
    const columnOrder = useSelector(selectProjectReducer).projects.find(item => item._id === projectId).statusOrder

    const [columns, setColumns] = useState([])

    //  const { createNewColumn } = useCreateStatus(initialStatus._id)
    const [showNewEditable, setShowEditable] = useState(false)
    const noneFilter = useSelector(selectNoneFilter)

    const filterByEpic = useSelector(selectFilterByEpic)
    const filterByAssignee = useSelector(selectFilterByAssignee)
    const filterByLabel = useSelector(selectFilterByLabel)

    useEffect(() => {
        const value = columnOrder.map(each => status.get(each))
        setColumns(value)
    }, [columnOrder])

    useEffect(() => {
        const value = columnOrder.map(each => status.get(each))
        setColumns(value)
    }, [status])

    //----------Filters----------------------
    const groupBy = useSelector(selectGroupBy)
    //TODO

    const emptyStatus = {
        name: "",
        project: "",
        issues: []
    }

    const { open, setOpen, issueOpened, openTaskDetail } = useIssueDetailModal()
    //Add column:
    // dispatch(createSuccessfulStatus(statusName))
    //Delete column: 
    // dispatch(deleteSuccessfulStatus(statusId))

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

    return (
        <div className="epic-list">
            {open && <IssueDetail open={open} handleClose={() => setOpen(false)} issue={issueOpened} />}
            {columns.map((el, ind) => (
                <Droppable key={ind} droppableId={`${ind}`}>
                    {(provided, snapshot) => (
                        <div
                            className={snapshot.isDraggingOver ? "column drag-over" : "epic-list"}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <Column initialStatus={el}>
                                {noneFilter && el.issues.map((issueId, index) => MyDraggable(tasks.get(issueId), index, openTaskDetail))}
                            </Column>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            ))}
            <div className="add-column-icon">
                {!showNewEditable && <AddBoxRoundedIcon />}
                {showNewEditable && <Column initialStatus={emptyStatus} />}
            </div>
        </div>
    );
}
