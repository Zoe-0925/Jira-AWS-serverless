export const FILTER_BY_EPIC = "FILTER_BY_EPIC"
export const FILTER_BY_LABEL = "FILTER_BY_LABEL"
export const FILTER_BY_ASSIGNEE = "FILTER_BY_ASSIGNEE"
export const CLEAN_FILTER = "CLEAN_FILTER"
export const GROUP_BY= "GROUP_BY"
export const ADD_EPIC = "ADD_EPIC"
export const REMOVE_EPIC="REMOVE_EPIC"

export const addEpicToFilter = (id) => {
    return {
        type: ADD_EPIC,
        id:id
    }
}

export const removeEpicFromFilter = (id) => {
    return {
        type: REMOVE_EPIC,
        id:id
    }
}



export const filterByEpic = (data) => {
    return {
        type: FILTER_BY_EPIC,
        data: data
    }
}

export const filterByLabel = (data) => {
    return {
        type: FILTER_BY_LABEL,
        data: data
    }
}

export const filterByAssignee = (data) => {
    return {
        type: FILTER_BY_ASSIGNEE,
        data: data
    }
}

export const groupBy = (data) => {
    return {
        type: GROUP_BY,
        data:data
    }
}

export const cleanFilter = ()=>{
    return {
        type: CLEAN_FILTER,
    }
}