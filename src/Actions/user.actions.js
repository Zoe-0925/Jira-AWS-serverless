import { Auth } from 'aws-amplify';
import { Cache } from 'aws-amplify';
import API from '@aws-amplify/api';
import { getAllProjects } from "./project.actions"

export const ERROR_USER = "ERROR_USER"
export const LOADING_USER = "LOADING_USER"
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const UPDATE_USER = "UPDATE_USER"
export const ADD_OTHER_USERS = "ADD_OTHER_USERS"
export const DELETE_USER = "DELETE_USER"
export const SAVE_TOKENS = "SAVE_TOKENS"
export const FINISH_LOADING = "FINISH_LOADING"
export const UPDATE_PROJECTS = "UPDATE_PROJECTS"
export const CANCEL_LOADING_USER = "CANCEL_LOADING_USER"
//export const CHECK_EMAIL_EXIST = "CHECK_EMAIL_EXIST"
//-------------------------------------------------------


export function dispatchError(data) {
    return {
        type: ERROR_USER,
        data: data
    }
}

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
    dispatch({ type: LOADING_USER })
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
    dispatch({ type: LOADING_USER })
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
    dispatch({ type: LOADING_USER })
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

/********************* API calls *************************/

export async function getSessionAndRefreshToken() {
    Auth.currentSession()
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

async function forgetPassword(username, code, new_password) {
    // Send confirmation code to user's email
    Auth.forgotPassword(username)
        .then(data => console.log(data))
        .catch(err => console.log(err));

    // Collect confirmation code and new password, then
    Auth.forgotPasswordSubmit(username, code, new_password)
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

async function completeNewPassword(username, password, newPassword) {
    Auth.signIn(username, password)
        .then(user => {
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
                Auth.completeNewPassword(
                    user,               // the Cognito User Object
                    newPassword,       // the new password
                    // OPTIONAL, the required attributes
                    {
                        email: 'xxxx@example.com',
                        phone_number: '1234567890'
                    }
                ).then(user => {
                    // at this time the user is logged in if no MFA required
                    console.log(user);
                }).catch(e => {
                    console.log(e);
                });
            } else {
                // other situations
            }
        }).catch(e => {
            console.log(e);
        });
}

export async function isLoggedIn() {
    return await Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
}

//Only for 3rd party login
export async function retreveJWT() {
    // Run this after the sign-in
    const federatedInfo = Cache.getItem('federatedInfo');
    const { token } = federatedInfo;
    return token
}
