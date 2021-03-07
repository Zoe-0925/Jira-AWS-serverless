import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { DragDropContext } from 'react-beautiful-dnd';
import DragAndDrop from "./DragAndDrop"
import Filters from "../Filters/Filters"
import { selectUsers, selectCurrentUserId, selectTasks, selectStatus } from "../../Reducers/Selectors"
import { searchBySummary } from "../Util"
import { chainMove } from "../../Actions/status.actions"

export default function DragContext() {
    const dispatch = useDispatch()
    const users = useSelector(selectUsers)
    const status = useSelector(selectStatus)
    const tasks = useSelector(selectTasks)
    const [filtered, setFiltered] = useState(false)
    const [filteredTasks, setFilteredTasks] = useState()
    const currentUserId = useSelector(selectCurrentUserId)

    const handleQuery = (query) => {
        const searchResult = searchBySummary(query, tasks)
        setFilteredTasks(searchResult)
    }

    const handleFilterByCurrentUser = () => {
        const result = tasks.filter(task => task.assignee === currentUserId)
        setFilteredTasks(result)
    }

    const handleUserFilter = userIds => {
        const result = tasks.filter(task => userIds.includes(task.assignee))
        setFilteredTasks(result)
    }

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
                handleFilterByCurrentUser={handleFilterByCurrentUser} handleClearFilter={() => setFilteredTasks(tasks)} />
            <DragAndDrop status={status} filteredTasks={!filtered ? tasks : filteredTasks} />
        </DragDropContext>
    )
}
