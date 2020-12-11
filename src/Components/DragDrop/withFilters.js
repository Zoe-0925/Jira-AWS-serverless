import React from "react";
import { selectEpics, selectCurrentProject, selectLabels } from '../../Reducers/Selectors';
import { selectAllStatusInArrayWithIssues, selectLoading } from "../../Reducers/Selectors"
import DragAndDrop from "./DragAndDrop"
import BoardFilterList from "../Filters/BoardFilterList"

const withFilters = () => {

    const { filters, setFilters } = useState({ labels: [], epics: [] })

    const setLabelFilter = labelId => {
        setFilters({ ...filters, labels: [...filters.labels, labelId] })
    }

    const setEpicFilter = epicId => {
        setFilters({ ...filters, epics: [...filters.epics, epicId] })
    }

    return (
        <>
            <BoardFilterList />
            <DragAndDrop columns={columns} loading={loading} />
        </>
    )
}

export default withFilters