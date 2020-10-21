import React from 'react'
import CustomSelect from "../Shared/CustomSelect"
import { useDispatch } from "react-redux"
import { groupBy } from "../../Actions/filter.actions"

export default function GroupBy() {
    const items = [{ name: "None", value: "" }, { name: "Epic", value: "epic" }, { name: "Assignee", value: "assignee" }]
    const dispatch = useDispatch()

    const handleFilter = (value) => {
        dispatch(groupBy(value))
    }

    //TODO
    //Edit the Tooltip

    return (
        <CustomSelect className="group-by-filter" label="GROUP BY" items={items} onChange={handleFilter} />
    )
}
