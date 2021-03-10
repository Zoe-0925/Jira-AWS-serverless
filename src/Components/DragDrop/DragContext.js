import React from 'react'
import { useDispatch } from "react-redux"
import { DragDropContext } from 'react-beautiful-dnd';
import DragAndDrop from "./DragAndDrop"
import { chainMove } from "../../Actions/status.actions"

export default function DragContext() {
    const dispatch = useDispatch()

    function onDragEnd(result) {
        const { source, destination } = result;
        if (!source || !destination) { // dropped outside the list
            return;
        }
        const sInd = +source.droppableId;  //The index in statusOrder
        const dInd = +destination.droppableId;
        dispatch(chainMove(sInd, dInd, source.index, destination.index))
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <DragAndDrop />
        </DragDropContext>
    )
}
