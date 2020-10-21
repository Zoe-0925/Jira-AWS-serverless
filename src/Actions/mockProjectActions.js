import { v4 as uuidv4 } from 'uuid'

export const LOADING_PROJECT = "LOADING_PROJECT"
export const ERROR_PROJECT = "ERROR_PROJECT"
export const CREATE_SUCCESS_PROJECT = "CREATE_SUCCESS_PROJECT"
export const DELETE_SUCCESS_PROJECT = "DELETE_SUCCESS_PROJECT"
export const UPDATE_SUCCESS_PROJECT = "UPDATE_SUCCESS_PROJECT"
export const APPEND_SUCCESS_PROJECTS = "APPEND_SUCCESS_PROJECTS"
export const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT"

export const CREATE_PROJECT = "CREATE_PROJECT"
export const LEAVE_PROJECT = "LEAVE_PROJECT"  //Remove a user from a project...



/***************** Actions  ***********************/
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

export function dispatchError(data) {
    return {
        type: ERROR_PROJECT,
        data: data
    }
}

const mockProject = {
    _id: "test project id",
    name: "My EC",
    key: "test key",
    category: "test category",
    lead: "mock user id",
    members: ["mock user id"],
    image: "test image",
    issues: ["To be continued...."],
    default_assignee: 'Project Lead',
    start_date: new Date()
}

/*****************  Thunk Actions  ****************/
export function createProject(data) {
    return dispatch => {
        dispatch({ type: LOADING_PROJECT })
        data._id = uuidv4()
        dispatch(createSuccessfulProject(data))
    }
}

//Get all projects of the user
export function getAllProjects() {
    return dispatch => {
        dispatch({ type: LOADING_PROJECT })
        dispatch(appendSuccessfulProjects([mockProject]))

    }
}

export function getASingleProject(id) {
    return dispatch => {
        dispatch({ type: LOADING_PROJECT })
        dispatch(appendCurrentProject(mockProject))
    }
}

export function updateProject(id, update) {
    return dispatch => {
        dispatch({ type: LOADING_PROJECT })
        dispatch(updateSuccessfulProject(update))
    }
}

export function deleteProject(id) {
    return  dispatch => {
        dispatch({ type: LOADING_PROJECT })
        dispatch(deleteSuccessfulProject(id))
    }
}