import API from '@aws-amplify/api';
import history from "../history"

export const LOADING_PROJECT = "LOADING_PROJECT"
export const ERROR_PROJECT = "ERROR_PROJECT"
export const CREATE_SUCCESS_PROJECT = "CREATE_SUCCESS_PROJECT"
export const DELETE_SUCCESS_PROJECT = "DELETE_SUCCESS_PROJECT"
export const UPDATE_SUCCESS_MEMBERS = "UPDATE_MEMBERS"
export const UPDATE_SUCCESS_PROJECT = "UPDATE_SUCCESS_PROJECT"
export const UPDATE_SUCCESS_PROJECT_NAME_AND_ASSIGNEE = "UPDATE_SUCCESS_PROJECT_NAME_AND_ASSIGNEE"
export const APPEND_SUCCESS_PROJECTS = "APPEND_SUCCESS_PROJECTS"
export const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT"
export const APPEDN_CURRENT_PROJECT = "APPEDN_CURRENT_PROJECT"
export const LEAVE_PROJECT = "LEAVE_PROJECT"  //Remove a user from a project...
export const UPDATE_SUCCESS_STATUS_ORDER = "UPDATE_SUCCESS_STATUS_ORDER"
export const REMOVE_SUCCESS_STATUS_FROM_ORDER = "REMOVE_SUCCESS_STATUS_FROM_ORDER"

/***************** Actions  ***********************/
export function updateSuccessfulMembers(data) {
    return {
        type: UPDATE_SUCCESS_MEMBERS,
        data: data
    }
}


export function createSuccessfulProject(data) {
    return {
        type: CREATE_SUCCESS_PROJECT,
        data: data
    }
}

export function appendSuccessfulProject(data) {
    return {
        type: APPEND_SUCCESS_PROJECTS,
        data: data //an array
    }
}

export function updateSuccessfulProject(data) {
    return {
        type: UPDATE_SUCCESS_PROJECT,
        data: data
    }
}

export function updateSuccessfulProjectNameAndAssignee(data) {
    return {
        type: UPDATE_SUCCESS_PROJECT_NAME_AND_ASSIGNEE,
        data: data
    }
}

export function deleteSuccessfulProject(id) {
    return {
        type: UPDATE_SUCCESS_PROJECT,
        id: id
    }
}

export function setCurrentProject(data) {
    return {
        type: SET_CURRENT_PROJECT,
        data: data
    }
}

export const updateSuccessfulStatusOrder = (data) => {
    return {
        type: UPDATE_SUCCESS_STATUS_ORDER,
        data: data
    }
}

export function dispatchError(data) {
    return {
        type: ERROR_PROJECT,
        data: data
    }
}


/*****************  Thunk Actions  ****************/
export const createProject = (newProject) => async  dispatch => {
    dispatch({ type: LOADING_PROJECT })
    try {
        const response = await API.post("ProjectApi", "/projects", {
            body: newProject
        })
        if (response && !response.error) {
            dispatch(createSuccessfulProject(newProject))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

//Get all projects of the user
export const getAllProjects = () => async (dispatch, getState) => {
    dispatch({ type: LOADING_PROJECT })
    try {
        const userReducer = getState().UserReducer
        const user = userReducer.users.find(item => item._id === userReducer.currentUserId)
        if (user.projects.length === 0) {
            return
        }
        const projects = user.projects.map(projectId =>
            API.get("ProjectApi", "/projects/object/" + projectId).then(
                project => project).catch(err => dispatch(dispatchError(err))))
        if (typeof projects === Array) {
            dispatch(appendSuccessfulProject(projects))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateProjectNameKeyAndAssignee = (data) => async  dispatch => {
    dispatch({ type: LOADING_PROJECT })
    try {
        await API.put("ProjectApi", "/projects/detail", data)
        dispatch(updateSuccessfulProjectNameAndAssignee(data))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateMembers = data => async  dispatch => {
    dispatch({ type: LOADING_PROJECT })
    try {
        await API.put("ProjectApi", "/projects/members", data)
        //TODO
        // dispatch(updateSuccessfulProjecMembers(data))
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateStatusOrder = (data) => async  dispatch => {
    dispatch({ type: LOADING_PROJECT })
    try {
        await API.put("ProjectApi", "/projects/update/statusOrder", {
            body: { items: data }
        })

    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}


export const deleteProject = (id) => async  dispatch => {
    dispatch({ type: LOADING_PROJECT })
    try {
        await API.del("ProjectApi", "/projects/" + id)
        dispatch(deleteSuccessfulProject(id))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const removeStatusFromOrder = (id) => async (dispatch, getState) => {
    dispatch({ type: LOADING_PROJECT })
    try {
        const reducer = getState().ProjectReducer
        const orderBefore = reducer.projects.find(item => item._id === reducer.currentProjectId).statusOrder
        const orderUpdated = orderBefore.filter(item => item !== id)
        await API.put("ProjectApi", "/projects/statusOrder", {
            body: { statusOrder: orderUpdated }
        })
        dispatch(updateStatusOrder(orderUpdated))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}