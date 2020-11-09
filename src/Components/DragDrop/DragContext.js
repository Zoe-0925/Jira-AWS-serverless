import React, {useEffect} from 'react'
import { useSelector,useDispatch } from "react-redux"
import { DragDropContext } from 'react-beautiful-dnd';
import DragAndDrop from "./DragAndDrop"
import { moveIssues } from "../../Actions/status.actions"
import { chainGetProjectData } from "../../Actions/project.actions"
import {selectCurrentProjectId} from "../../Reducers/Selectors"

export default function DragContext() {
    const dispatch = useDispatch()
    const projectId =  useSelector(selectCurrentProjectId)

    useEffect(async () => {
        if (status.length === 0) {
            dispatch(chainGetProjectData(projectId))
        }
    }, [])

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
