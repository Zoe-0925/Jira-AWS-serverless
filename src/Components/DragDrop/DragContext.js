import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { DragDropContext } from 'react-beautiful-dnd';
import DragAndDrop from "./DragAndDrop"
import { chainReorder, chainMove } from "../../Actions/status.actions"
import { selectAllStatus, selectStatusOrder } from '../../Reducers/Selectors';

export default function DragContext() {
    const dispatch = useDispatch()
    const allStatus = useSelector(selectAllStatus)
    const statusOrder = useSelector(selectStatusOrder)

    function onDragEnd(result) {
        const { source, destination } = result;

        if (!destination) { // dropped outside the list
            return;
        }

        const sInd = +source.droppableId;  //The index in statusOrder
        const dInd = +destination.droppableId;
        const sourceStatus = allStatus.get(statusOrder[sInd])
        if (sInd === dInd) {//reorder
            dispatch(chainReorder(sourceStatus, sInd, dInd))

        } else {
            console.log("sInd", sInd, "statusOrder[sInd]", statusOrder[sInd])
            console.log("dInd", dInd, "statusOrder[dInd]", statusOrder[dInd])
            const destinationStatus = allStatus.get(statusOrder[dInd])
            console.log("sourceStatus", sourceStatus, destinationStatus)
            dispatch(chainMove(sourceStatus, destinationStatus, source.index, destination.index))
        }

        // source.index is in issueOrder

    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board-container">
                <DragAndDrop />
            </div>
        </DragDropContext>
    )
}
