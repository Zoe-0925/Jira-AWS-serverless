import React, { useState, Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { DragDropContext } from 'react-beautiful-dnd';
import DragAndDrop from "./DragAndDrop"
import { chainReorder, chainMove } from "../../Actions/status.actions"
import { selectAllStatus, selectCurrentProject, selectUserName } from '../../Reducers/Selectors';
import FilterManager from "../Filters/FilterManager"

export default function DragContext() {
    const dispatch = useDispatch()
    const allStatus = useSelector(selectAllStatus)
    const currentProject = useSelector(selectCurrentProject)
    const statusOrder = currentProject ? currentProject.statusOrder : []
    const { filters, setFilters } = useState()

    useEffect(() => {
        //TODO 
        //update the host address
        const host = `ws://127.0.0.1:8000/ws/game/${id}?token=${localStorage.getItem('token')}`;
      //  dispatch(wsConnect(host));
    }, [])

    function onDragEnd(result) {
        const { source, destination } = result;

        if (!destination) { // dropped outside the list
            return;
        }

        const sInd = +source.droppableId;  //The index in statusOrder
        const dInd = +destination.droppableId;
        const sourceStatus = allStatus.get(statusOrder[0][sInd])
        const destinationStatus = allStatus.get(statusOrder[0][dInd])

        if (sInd === dInd) {
            dispatch(chainReorder(sourceStatus, sInd, dInd))
        } else {
            dispatch(chainMove(sourceStatus, destinationStatus, source.index, destination.index))
        }
    }

    return (
        <Fragment>
            <FilterManager filters={filters} setFilters={setFilters} />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="board-container">
                    <DragAndDrop filters={filters} />
                </div>
            </DragDropContext>
        </Fragment>
    )
}
