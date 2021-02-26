import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { DragDropContext } from 'react-beautiful-dnd';
import DragAndDrop from "./DragAndDrop"
import Filters from "../Filters/Filters"
import { selectUsers, selectCurrentUserId } from "../../Reducers/Selectors"
import { searchBySummary, handleDrag } from "../Util"

const statusData = [{ _id: "9729f490-fd5f-43ab-8efb-40e8d132bc68", issues: ["issueId1", "issueId2"], name: "TO DO", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" },
{ _id: "efe83b13-9255-4339-a8f5-d5703beb9ffc", issues: [], name: "IN PROGRESS", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" },
{ _id: "439c3d96-30eb-497d-b336-228873048bc3", issues: [], name: "TESTING", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" },
{ _id: "f3a0e59f-635a-4b75-826f-b0f5bf24b5c4", issues: [], name: "DONE", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" }]

const taskData = [{
    _id: "issueId1", summary: "Code feature A", description: "Coding...", updatedAt: "", createdAt: "", issueType: "task",
    labels: [], status: "9729f490-fd5f-43ab-8efb-40e8d132bc68", project: "7c1f9838-dbd7-4432-b52c-aae87022d578", assignee: "tsidadsjkdhiueiurt", assigneeAvatar: "https://cdn.pixabay.com/photo/2016/06/15/23/20/woman-1460150_960_720.jpg"
},
{
    _id: "issueId2", summary: "Code feature B", description: "Coding...", updatedAt: "", createdAt: "", issueType: "task",
    labels: [], status: "9729f490-fd5f-43ab-8efb-40e8d132bc68", project: "7c1f9838-dbd7-4432-b52c-aae87022d578", assignee: "user2", assigneeAvatar: "https://cdn.pixabay.com/photo/2020/06/02/08/30/man-5249991_960_720.jpg"
}]


export default function DragContext() {
    const users = useSelector(selectUsers)
    const [status, setStatus] = useState(statusData)
    const [filteredTasks, setFilteredTasks] = useState(taskData)
    const currentUserId = useSelector(selectCurrentUserId)

    const handleQuery = (query) => {
        const searchResult = searchBySummary(query, taskData)
        setFilteredTasks(searchResult)
    }

    const handleFilterByCurrentUser = () => {
        const result = taskData.filter(task => task.assignee === currentUserId)
        setFilteredTasks(result)
    }

    const handleUserFilter = userIds => {
        const result = taskData.filter(task => userIds.includes(task.assignee))
        setFilteredTasks(result)
    }

    function onDragEnd(result) {
        const { source, destination } = result;
        if (!source || !destination) { // dropped outside the list
            return;
        }
        alert("sInd", sInd, "dInd", dInd)
        const sInd = +source.droppableId;  //The index in statusOrder
        const dInd = +destination.droppableId;
        if(sInd && dInd){
            const statusUpdated = handleDrag(sInd, dInd, [...status])
            setStatus(statusUpdated)
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Filters users={users} handleUserFilter={handleUserFilter} handleQuery={handleQuery}
                handleFilterByCurrentUser={handleFilterByCurrentUser} handleClearFilter={() =>setFilteredTasks(taskData)} />
            <DragAndDrop status={status} filteredTasks={filteredTasks} />
        </DragDropContext>
    )
}
