import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid'

export const MyDraggable = ({ id, index, ...props }) => {
    return id === undefined ? <div></div> : <Draggable
        className="draggable"
        key={uuidv4()}
        draggableId={id}
        index={index}
    >
        {(provided, snapshot) => (
            <div
                className={snapshot.isDragging ? "issue-card is-dragging" : "issue-card"}
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
            className={snapshot.isDraggingOver ? "column-list drag-over" : "column-list"}
            ref={provided.innerRef}
            {...provided.droppableProps}
        >
            {props.children}
            {provided.placeholder}
        </div>
    )}
</Droppable>)
