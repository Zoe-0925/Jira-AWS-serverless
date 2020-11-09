import React from 'react'
import { useDispatch } from "react-redux"
import { DragDropContext } from 'react-beautiful-dnd';
import DragAndDrop from "./DragAndDrop"
import { moveIssues } from "../../Actions/status.actions"
import { saveProjectIssues } from "../../Actions/issue.actions"
import { saveProjectStatus } from "../../Actions/status.actions"
import { saveProjectLabels } from "../../Actions/label.actions"
import API from '@aws-amplify/api';

export default function DragContext() {
    const dispatch = useDispatch()


    //TODO 
    //Haven't tested this yet
    useEffect(async () => {
        if (status.length === 0) {
            const [issues, status, labels] = await Promise.all(
                API.get("IssueApi", "/issues/project/" + projectId),
                API.get("StatusApi", "/status/project/" + projectId),
                API.get("LabelApi", "/labels/project/" + projectId)
            )
            await Promise.all([
                dispatch(saveProjectIssues(issues)),
                dispatch(saveProjectLabels(labels))
            ]);
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
