import React, { useState, Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { DragDropContext } from 'react-beautiful-dnd';
import DragAndDrop from "./DragAndDrop"
import { chainReorder, chainMove } from "../../Actions/status.actions"
import { selectAllStatus, selectCurrentProject } from '../../Reducers/Selectors';
import IssueFilter from "../Filters/IssueFilter"
import { Tooltip } from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupBy from "../Filters/GroupBy"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { wsConnect } from "../../Actions/websocket.actions"


export default function DragContext() {
    const dispatch = useDispatch()
    const allStatus = useSelector(selectAllStatus)
    const currentProject = useSelector(selectCurrentProject)
    const statusOrder = currentProject ? currentProject.statusOrder : []
    const { filters, setFilters } = useState()

    useEffect(() => {
        const host = `ws://127.0.0.1:80/}`;
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
            <div className="row filter-row">
                <IssueFilter className="item-1" />
                <AccountCircleIcon className="icon item-2" fontSize="large" />
                <Tooltip title="Add people" aria-label="Add people">
                    <PersonAddIcon className="icon item-3" fontSize="large" />
                </Tooltip>
                <GroupBy className="item-5" />
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="board-container">
                    <DragAndDrop filters={filters} />
                </div>
            </DragDropContext>
        </Fragment>
    )
}
