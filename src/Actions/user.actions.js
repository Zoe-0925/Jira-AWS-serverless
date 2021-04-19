import { mockgetAllProjects, setCurrentProject } from "./project.actions"
import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"
import { appendSuccessStatus } from "./status.actions"
import { APPEND_ISSUES } from "./issue.actions"
import { user, otherUsers, currentProject, tasks, status } from "../Data"
import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';
import history from "../history"

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const ADD_OTHER_USERS = "ADD_OTHER_USERS"
export const CLEAR = "CLEAR"

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

export function addOtherUsers(data) {
    return {
        type: ADD_OTHER_USERS,
        data: data
    }
}

export const mockgetUserAndProjectData = () => async (dispatch) => {
    try {
        dispatch({ type: LOADING })
        await Promise.all([
            dispatch(login(user)),
            dispatch(mockgetAllProjects())
        ])
        dispatch(setCurrentProject(currentProject._id))
        await Promise.all([
            dispatch(addOtherUsers(otherUsers)),
            dispatch({
                type: APPEND_ISSUES,
                data: { tasks: tasks }
            }),
            dispatch(appendSuccessStatus(status))
        ])
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

/******************* Thunk Actions  *****************************/
export const chainDeleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: LOADING })
        await Promise.all([
            fetchDeleteUser(id),
            fetchDeleteUserFromProjects(id),
            dispatch({ type: "CLEAR_USER" }),
            dispatch({ type: "CLEAR_COMMENT" }),
            dispatch({ type: "CLEAR_PROJECT" }),
            dispatch({ type: "CLEAR_ISSUE" }),
            dispatch({ type: "CLEAR_STATUS" }),
            dispatch({ type: "CANCEL_LOADING" }),
            Auth.signOut({ global: true })
        ])
        history.push("/")
    }
    catch (err) {
        return dispatch(dispatchError(err))
    }
}

export const getUser = () => async (dispatch) => {
    try {
        const user = await dispatch(fetchCurrentUser())
        if (user) {
            dispatch(login(user))
            return user._id
        } else {
            dispatch(dispatchError("Invalid email address."))
        }
    } catch (err) {
        return dispatch(dispatchError(err))
    }
}

/******************* API CALLS ******************************/
export const fetchCurrentUser = async () => {
    const credential = await Auth.currentAuthenticatedUser({
        bypassCache: true  // This call will send a request to Cognito to get the latest user data
    })
    if (credential) {
        return await fetchUserByEmail(credential.username)
    }
}

export const fetchUserByEmail = async email => {
    return await API.get("UserApi", "/users/email/" + email)
}

export const fetchDeleteUser = async id => {
    return await API.del("UserApi", "/users/object/" + id)
}

export const fetchDeleteUserFromProjects = async id => {
    return await API.del("ProjectMemberApi", "/members/" + id)
}