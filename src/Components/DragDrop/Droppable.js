import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Column from "./Column"
import IssueCard from "../Issues/IssueCard"

export const MyDraggable = ({ id, index, ...props }) => {
    return id === undefined ? <div></div> : <Draggable
        className="draggable"
        key={id}
        draggableId={id}
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
                {props.children}
            </div>)}
    </Draggable>
}

export const MyDroppable = ({ el, ind, ...props }) => (<Droppable key={ind} droppableId={`${ind}`}>
    {(provided, snapshot) => (
        <div
            className={snapshot.isDraggingOver ? "column drag-over" : "epic-list"}
            ref={provided.innerRef}
            {...provided.droppableProps}
        >
            {props.children}
            {provided.placeholder}
        </div>
    )}
</Droppable>)

export const IssueDroppable = ({ columns, openTaskDetail }) => {

    /**
     *     const noneFilter = useSelector(selectNoneFilter)

    const filterByEpic = useSelector(selectFilterByEpic)
    const filterByAssignee = useSelector(selectFilterByAssignee)
    const filterByLabel = useSelector(selectFilterByLabel)
     */

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



    //TODO
    //filters should be handled here

    return columns.length === 0 ? <div></div> : columns.map((el, ind) => {
        return <MyDroppable key={ind} el={el} ind={ind}>
            <Column initialStatus={el}>
                {el && el.issues && el.issues.map((issueId, index) => <MyDraggable key={issueId} id={issueId} index={index}>
                    <IssueCard issueId={issueId} openTaskDetail={openTaskDetail} />
                </MyDraggable>)}
            </Column>
        </MyDroppable>
    })
}