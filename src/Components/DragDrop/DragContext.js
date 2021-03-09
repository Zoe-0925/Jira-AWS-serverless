import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { DragDropContext } from 'react-beautiful-dnd';
import DragAndDrop from "./DragAndDrop"
import Filters from "../Filters/Filters"
import { selectUsers, selectStatus } from "../../Reducers/Selectors"
import { chainMove } from "../../Actions/status.actions"
import { useFilter } from "../Hooks/Hooks"

export default function DragContext() {
    const dispatch = useDispatch()
    const users = useSelector(selectUsers)
    const status = useSelector(selectStatus)

    const { handleQuery, filteredTasks, handleFilterByCurrentUser, handleUserFilter, clearFilter } = useFilter()

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
            <Filters users={users} handleUserFilter={handleUserFilter} handleQuery={handleQuery}
                handleFilterByCurrentUser={handleFilterByCurrentUser} handleClearFilter={clearFilter} />
            <DragAndDrop status={status} filteredTasks={filteredTasks} />
        </DragDropContext>
    )
}
