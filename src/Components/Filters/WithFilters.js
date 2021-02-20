import React, {useState} from "react";

import DragAndDrop from "../dragdrop/DragAndDrop"
import BoardFilterList from "./boardFilterList"

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