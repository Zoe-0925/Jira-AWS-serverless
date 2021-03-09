import { useState, useRef, useEffect } from 'react';
import { useSelector } from "react-redux"
import { selectCurrentUserId, selectTasks } from "../../Reducers/Selectors"
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

export const useFilter = () => {
    const tasks = useSelector(selectTasks)
    const [filteredTasks, setFilteredTasks] = useState(tasks || [])
    const currentUserId = useSelector(selectCurrentUserId)

    useEffect(() => {
        setFilteredTasks(tasks)
    }, [tasks])

    const handleQuery = (query) => {
        const searchResult = searchBySummary(query, tasks)
        setFilteredTasks(searchResult)
    }

    const handleFilterByCurrentUser = () => {
        const result = tasks.filter(task => task.assignee === currentUserId)
        setFilteredTasks(result)
    }

    const handleUserFilter = userIds => {
        const result = tasks.filter(task => userIds.includes(task.assignee))

        setFilteredTasks(result)
    }

    const clearFilter = () => {
        setFilteredTasks(tasks)
    }

    console.log("filteredTasks", filteredTasks)

    return { handleQuery, filteredTasks, handleFilterByCurrentUser, handleUserFilter, clearFilter }
}

export const useLocalFilter = ({ handleFilterByCurrentUser, handleUserFilter, handleClearFilter }) => {
    const [filters, setFilter] = useState({ filtered: false, users: [], currentUser: false, issueId: "" })
    const [query, setQuery] = useState("")


 

    /** 
    useEffect(() => {
        setTimeout(handleQuery(query), 1500)
        return false
    }, [query])*/

    const filterByCurrentUser = () => {
        setFilter({ filtered: true, users: [], currentUser: true })
        handleFilterByCurrentUser()
    }

    const setUserFilter = (id) => {
        let newFilters = { ...filters, filtered: true, currentUser: false }
        if (filters.users.includes(id)) { //Toggle remove the user id
            newFilters.users = newFilters.users.filter(userId => userId !== id)
        } else { //Toggle add the user id
            newFilters.users.push(id)
        }
        setFilter(newFilters)
        handleUserFilter(newFilters.users)
    }

    const clearFilter = () => {
        setFilter({ filtered: false, users: [], currentUser: false, issueId: "" })
        handleClearFilter()
    }

    const handleChange = e => {
        setQuery(e.target.value)
    }

    return { filters, filterByCurrentUser,  setUserFilter, clearFilter }
}