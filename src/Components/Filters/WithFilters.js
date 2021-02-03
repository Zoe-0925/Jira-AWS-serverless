import React, {useState} from "react";
import { selectEpics, selectCurrentProject, selectLabels } from '../../Reducers/Selectors';
import { selectAllStatusInArrayWithIssues, selectLoading } from "../../Reducers/Selectors"
import DragAndDrop from "../DragDrop/DragAndDrop"
import BoardFilterList from "./BoardFilterList"

const WithFilters = () => {

    const { filters, setFilters } = useState({ labels: [], epics: [] })

    const setLabelFilter = labelId => {
        setFilters({ ...filters, labels: [...filters.labels, labelId] })
    }

    const setEpicFilter = epicId => {
        setFilters({ ...filters, epics: [...filters.epics, epicId] })
    }

    return (
        <div className="board-container">
            <BoardFilterList />
            <DragAndDrop />
        </div>
    )
}

export default WithFilters