import React from 'react'
import { useDispatch } from "react-redux"
import { DragDropContext } from 'react-beautiful-dnd';
import DragAndDrop from "./DragAndDrop"
import { moveIssues } from "../../Actions/status.actions"

export default function DragContext() {
    const dispatch = useDispatch()

    function onDragEnd(result) {
        const { source, destination } = result;

        if (!destination) { // dropped outside the list
            return;
        }

        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        //If sInd===dInd => reorder, else, move the issue
        dispatch(moveIssues(sInd, dInd, source.index, destination.index))
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board-container">
                <DragAndDrop />
            </div>
        </DragDropContext>
    )
}
