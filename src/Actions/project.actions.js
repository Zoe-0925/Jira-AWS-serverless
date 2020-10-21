import axios from 'axios'
import Util from "../Components/Util"
const { post, put, jwtConfig } = Util


export const LOADING_PROJECT = "LOADING_PROJECT"
export const ERROR_PROJECT = "ERROR_PROJECT"
export const CREATE_SUCCESS_PROJECT = "CREATE_SUCCESS_PROJECT"
export const DELETE_SUCCESS_PROJECT = "DELETE_SUCCESS_PROJECT"
export const UPDATE_SUCCESS_PROJECT = "UPDATE_SUCCESS_PROJECT"
export const APPEND_SUCCESS_PROJECTS = "APPEND_SUCCESS_PROJECTS"
export const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT"
export const APPEDN_CURRENT_PROJECT = "APPEDN_CURRENT_PROJECT"
export const CREATE_PROJECT = "CREATE_PROJECT"
export const LEAVE_PROJECT = "LEAVE_PROJECT"  //Remove a user from a project...


/***************** Actions  ***********************/
export function createSuccessfulProject(data) {
    return {
        type: CREATE_SUCCESS_PROJECT,
        data: data
    }
}

export function appendCurrentProject(data) {
    return {
        type: APPEDN_CURRENT_PROJECT,
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


export function dispatchError(data) {
    return {
        type: ERROR_PROJECT,
        data: data
    }
}

/*****************  Thunk Actions  ****************/
export const createProject = (data) => async  dispatch => {
    dispatch({ type: LOADING_PROJECT })
    try {
        const token = localStorage.getItem("token")
        const response = await dispatch(fetchCreateProject(process.env.BASE, data, token))
        if (response.data.success) {
            const newData = Object.assign({}, data)
            newData._id = response.data.id
            dispatch(createSuccessfulProject(newData))
        }
        else {
            dispatch(dispatchError(response.data.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

//Get all projects of the user
export const getAllProjects = () => async  (dispatch, getState) => {
    dispatch({ type: LOADING_PROJECT })
    try {
        const userId = getState().UserReducer.user._id
        const token = localStorage.getItem("token")
        const response = await dispatch(fetchAllProjects(process.env.BASE, userId, token))
        if (response.data.success) {
            dispatch(appendSuccessfulProject(response.data.data))
        }
        else {
            dispatch(dispatchError(response.data.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        console.log('Error', err);
    }
}

export const getASingleProject = (id) => async  dispatch => {
    dispatch({ type: LOADING_PROJECT })
    try {
        const token = localStorage.getItem("token")
        const response = await dispatch(fetchDeleteProject(process.env.BASE, id, token))
        if (response.data.success) {
            dispatch(appendCurrentProject(response.data.data))
        }
        else {
            dispatch(dispatchError(response.data.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

export const updateProject = (id, update) => async  dispatch => {
    dispatch({ type: LOADING_PROJECT })
    try {
        const token = localStorage.getItem("token")
        const response = await dispatch(fetchUpdateProject(process.env.BASE, id, update, token))
        if (response.data.success) {
            dispatch(updateSuccessfulProject(response.data.data))
        }
        else {
            dispatch(dispatchError(response.data.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

export const deleteProject = (id) => async  dispatch => {
    dispatch({ type: LOADING_PROJECT })
    try {
        const token = localStorage.getItem("token")
        const response = await dispatch(fetchDeleteProject(process.env.BASE, id, token))
        if (response.data.success) {
            dispatch(deleteSuccessfulProject(id))
        }
        else {
            dispatch(dispatchError(response.data.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}
/*****************  API Calls****************/

export function fetchAllProjects(BASE) {
    return axios.get('/projects/', BASE)
}

export function fetchCreateProject(BASE, item, token) {
    return post('/projects/', BASE, item, token)
}

export function fetchUsersProjects(BASE, id, token) {//fetch all projects of a user
    return axios.get(BASE + '/projects/user/' + id, jwtConfig(token));
}

export function fetchProjectById(BASE, id, token) {//fetch all projects of a user
    return axios.get(BASE + '/projects/' + id, jwtConfig(token));
}

export function fetchUpdateProject(BASE, id, update, token) {//fetch all projects of a user
    return put('/projects/' + id, BASE, update, token)
}

export function fetchDeleteProject(BASE, id, token) {//fetch all projects of a user
    return axios.delete(BASE + '/projects/' + id, jwtConfig(token));
}

export function leaveProjectById(BASE, id, userId, token) {//fetch all projects of a user
    return axios.delete(BASE + '/projects/' + id + '/members/' + userId, jwtConfig(token));
}