import React, { Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { DragDropContext } from 'react-beautiful-dnd';
import WithFilters from "../Filters/WithFilters"
import { chainReorder, chainMove } from "../../Actions/status.actions"
import { selectAllStatus, selectStatusOrder } from '../../Reducers/Selectors';

export default function DragContextContainer() {
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
        const sourceStatus = allStatus.get(statusOrder[0][sInd])
        const destinationStatus = allStatus.get(statusOrder[0][dInd])

        if (sInd === dInd) {
            dispatch(chainReorder(sourceStatus, sInd, dInd))
        } else {
            dispatch(chainMove(sourceStatus, destinationStatus, source.index, destination.index))
        }
    }

    return <DragContext onDragEnd={onDragEnd} />
}


export const DragContext = ({ onDragEnd }) => (
    <Fragment>
        <DragDropContext onDragEnd={onDragEnd}>
                <WithFilters />
        </DragDropContext>
    </Fragment>
)