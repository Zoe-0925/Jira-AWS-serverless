import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';
import { getAllProjects } from "./project.actions"
import { dispatchError, LOADING } from "./loading.actions"

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const UPDATE_USER = "UPDATE_USER"
export const ADD_OTHER_USERS = "ADD_OTHER_USERS"
export const DELETE_USER = "DELETE_USER"
export const SAVE_TOKENS = "SAVE_TOKENS"
export const FINISH_LOADING = "FINISH_LOADING"
export const UPDATE_PROJECTS = "UPDATE_PROJECTS"

export function login(data) {
    return {
        type: LOGIN,
        data: data
    }
}

export function logOut() {
    return {
        type: LOGOUT,
    }
}

export function updateUser(data) {
    return {
        type: UPDATE_USER,
        data: data
    }
}

export function dispatchAddOtherUsers(userList) {
    return {
        type: ADD_OTHER_USERS,
        data: userList
    }
}

export function saveTokens(accessToken, refreshToken) {
    return {
        type: SAVE_TOKENS,
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

export function updateProjects(projects) {
    return {
        type: UPDATE_PROJECTS,
        data: projects
    }
}

/******************* Thunk Actions  *****************************/
export const getUserAndProjects = () => async dispatch => {
    dispatch({ type: LOADING })
    try {
        const user = await dispatch(getCurrentUser())
        await Promise.all([
            dispatch(login(user)),
            dispatch(getAllProjects(user.projects))
        ])
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const getCurrentUser = () => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        const credential = await Auth.currentAuthenticatedUser({
            bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        })
        if (credential) {
            return await API.get("UserApi", "/users/email/" + credential.username)
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const addProjectToUser = projectId => async (dispatch, getState) => {
    dispatch({ type: LOADING })
    const reducer = getState().UserReducer
    let projects = reducer.users.find(user => user._id === reducer.currentUserId).projects
    let projectsUpdated = [...projects]
    projectsUpdated.push(projectId)
    try {
        await API.put("UserApi", "/users/projects/", {
            body: {
                _id: reducer.currentUserId,
                projects: projectsUpdated
            }
        })
        dispatch(updateProjects(projectsUpdated))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}