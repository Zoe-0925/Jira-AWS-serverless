import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';
import history from "../history"
import { getAllProjects, mockgetAllProjects, setCurrentProject, chainDeleteProject } from "./project.actions"
import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"
import { getProjectIssues } from "./issue.actions"
import { getProjectLabels } from "./label.actions"
import { getProjectStatus, appendSuccessStatus } from "./status.actions"
import { NEW_MESSAGE } from "./websocket.actions"

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const UPDATE_USER = "UPDATE_USER"
export const ADD_OTHER_USERS = "ADD_OTHER_USERS"
export const CLEAR = "CLEAR"
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

/******************* Thunk Actions  *****************************/
//TODO 
//remove the account from AWS Cognito as well
export const chainDeleteUser = (id, projectIds) => async (dispatch, getState) => {
    try {
        const projects = getState().ProjectReducer.projects.map(each => each._id)
        dispatch({ type: LOADING })
        await API.del("UserApi", "/users/object/" + id)
        projects.forEach(projectId => {
            dispatch(chainDeleteProject(projectId))
        })
        dispatch({ type: CLEAR })
        await Auth.signOut({ global: true });
        history.push("/")
    }
    catch (err) {
        return dispatch(dispatchError(err))
    }
}

export const getUserAndProjects = () => async dispatch => {
    try {
        dispatch({ type: LOADING })
        const user = await dispatch(getCurrentUser())
        await Promise.all([
            dispatch(login(user)),
            dispatch(getAllProjects(user.projects))
        ])
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        return dispatch(dispatchError(err))
    }
}

export const getUserAndProjectData = () => async (dispatch, getState) => {
    try {
        dispatch({ type: LOADING })
        await dispatch(getUserAndProjects())
        let id = getState().ProjectReducer.currentProjectId
        if (!id || id === "") {
            history.push("/projects")
            return
        }
        await Promise.all([
            dispatch(getProjectStatus(id)),
            dispatch(getProjectIssues(id)),
            dispatch(getProjectLabels(id))
        ])
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const mockgetUserAndProjectData = () => async (dispatch) => {
    try {
        dispatch({ type: LOADING })
        const user = { _id: "tsidadsjkdhiueiurt", name: "Zoe Zhang", email: "jin0925aki@gmail.com", projects: ["7c1f9838-dbd7-4432-b52c-aae87022d578"] }
        await Promise.all([
            dispatch(login(user)),
            dispatch(mockgetAllProjects(user.projects))
        ])
        //TODO:
        //check if I forgot to set the currentProjectId
        dispatch(setCurrentProject("7c1f9838-dbd7-4432-b52c-aae87022d578"))
        await Promise.all([
            dispatch(appendSuccessStatus([{ _id: "9729f490-fd5f-43ab-8efb-40e8d132bc68", issues: [], name: "DONE", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" },
            { _id: "efe83b13-9255-4339-a8f5-d5703beb9ffc", issues: [], name: "IN PROGRESS", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" },
            { _id: "439c3d96-30eb-497d-b336-228873048bc3", issues: [], name: "TESTING", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" },
            { _id: "f3a0e59f-635a-4b75-826f-b0f5bf24b5c4", issues: [], name: "TO DO", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" }])),
        ])
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const getCurrentUser = () => async  dispatch => {
    try {
        const credential = await Auth.currentAuthenticatedUser({
            bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        })
        if (credential) {
            return await dispatch(searchUserByEmail(credential.username))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateUserProjects = projects => async (dispatch) => {
    const payload = {
        type: UPDATE_PROJECTS,
        data: projects
    }
    await Promise.all([
        dispatch(payload),
        dispatch({ type: NEW_MESSAGE, payload: payload })
    ])
}

export const searchUserByEmail = email => async (dispatch) => {
    try {
        const user = await API.get("UserApi", "/users/email/" + email)
        return user
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const fetchUpdateUserProjects = async (userId, projects) => {
    await API.put("UserApi", "/users/projects/", {
        body: {
            _id: userId,//reducer.currentUserId,
            projects: projects//projectsUpdated
        }
    })
}