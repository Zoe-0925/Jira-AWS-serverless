import React, { useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import API from '@aws-amplify/api';
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from "react-redux"
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Column from "./Column"
import {
    selectStatus, selectStatusOrder, selectTasks, selectNoneFilter, selectCurrentProject,
    selectFilterByEpic, selectFilterByLabel, selectFilterByAssignee, selectGroupBy, selectProjectReducer
} from "../../Reducers/Selectors"
import { useIssueDetailModal, useCreateStatus } from "./CustomHooks"
import IssueCard from "../Issues/IssueCard"
import IssueDetail from "../Issues/IssueDetail"
import { saveProjectIssues } from "../../Actions/issue.actions"
import { saveProjectStatus } from "../../Actions/status.actions"
import { saveProjectLabels } from "../../Actions/label.actions"


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
    const dispatch = useDispatch()
    const columnOrder = useSelector(selectStatusOrder) // droppableId = the index of each column in order
    const status = useSelector(selectStatus)
    const columnsFromStore = columnOrder.map(each => status.get(each))
    const tasks = useSelector(selectTasks)
    const projectReducer = useSelector(selectProjectReducer)
    const projectId = projectReducer.currentProjectId

    const [columns, setColumns] = useState(columnsFromStore)

    //  const { createNewColumn } = useCreateStatus(initialStatus._id)
    const [showNewEditable, setShowEditable] = useState(false)
    const noneFilter = useSelector(selectNoneFilter)
    const filterByEpic = useSelector(selectFilterByEpic)
    const filterByAssignee = useSelector(selectFilterByAssignee)
    const filterByLabel = useSelector(selectFilterByLabel)

    useEffect(async () => {
        if (columnOrder.length === 0) {
            const [issues, status, labels] = await Promise.all(
                API.get("IssueApi", "/issues/project/" + projectId),
                API.get("StatusApi", "/status/project/" + projectId),
                API.get("LabelApi", "/labels/project/" + projectId)
            )
            await Promise.all([
                dispatch(saveProjectIssues(issues)),

                //TODO where do we get the statusOrder from? Project object?
                dispatch(saveProjectStatus(status)), //TODO need status order from the project object,
                dispatch(saveProjectLabels(labels))
            ]);
        }
    }, [])

    useEffect(() => {
        setColumns(columnOrder.map(each => status.get(each)))
    }, [columnOrder])

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
