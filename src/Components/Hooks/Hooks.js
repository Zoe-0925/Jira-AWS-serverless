import { useState, useRef } from 'react';
import { useSelector } from "react-redux"
import { selectCurrentUserId, selectTasks, selectUserIds } from "../../Reducers/Selectors"
import { searchBySummary } from "../Util"

export function useSimpleState() {
    const [value, setValue] = useState(false)
    const handleTrue = () => {
        setValue(true)
    }

    const handleFalse = () => {
        setValue(false)
    }

    return (
        { value, handleTrue, handleFalse }
    )
}

export function useEditText(value) {
    const [state, setState] = useState({
        value: value !== undefined ? value : "",
        backup: value !== undefined ? value : ""
    })
    const [edit, setEdit] = useState(false)

    return { state, setState, edit, setEdit }
}

export const useDotIconMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const anchorRef = useRef(null);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return { anchorEl, isOpen, anchorRef, handleMenuClose, handleMenuOpen }
}

export const useFilter = (tasks = [] ) => {
    const [filters, setFilter] = useState({ filtered: false, users: [], currentUser: false, issueId: "" })
    const [query, setQuery] = useState("")
    const currentUserId = useSelector(selectCurrentUserId)
    const userIds = useSelector(selectUserIds)
    const [filteredTasks, setFilteredTasks] = useState([])

    const filterByCurrentUser = () => {
        setFilter({ filtered: true, users: [], currentUser: true })
        const result = tasks.filter(task => task.assignee === currentUserId)
        setFilteredTasks(result)
    }

    /**
     * 
     *  const handleQuery = (query) => {
        const searchResult = searchBySummary(query, tasks)
        setFilteredTasks(searchResult)
    }} id 
     */

    const setUserFilter = (id) => {
        let newFilters = { ...filters, filtered: true, currentUser: false }
        if (filters.users.includes(id)) { //Toggle remove the user id
            newFilters.users = newFilters.users.filter(userId => userId !== id)
        } else { //Toggle add the user id
            newFilters.users.push(id)
        }
        setFilter(newFilters)
        const result = tasks.filter(task => userIds.includes(task.assignee))
        setFilteredTasks(result)
    }

    const clearFilter = () => {
        setFilter({ filtered: false, users: [], currentUser: false, issueId: "" })
        setFilteredTasks([])
    }

    const handleChange = e => {
        setQuery(e.target.value)
    }

    return { filteredTasks, filters, filterByCurrentUser, setUserFilter, clearFilter }
}