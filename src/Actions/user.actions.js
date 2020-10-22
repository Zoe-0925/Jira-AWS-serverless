import axios from 'axios'
import { Auth } from 'aws-amplify';
import { Cache } from 'aws-amplify';
import API from '@aws-amplify/api';


import Util from "../Components/Util"
import history from "../history"
import { setLocalStorage } from "../Components/Credential/Auth.service"
require('dotenv').config()

const { post, put, jwtConfig } = Util

export const ERROR_USER = "ERROR_USER"
export const LOADING_USER = "LOADING_USER"
export const LOGIN_SUCCESS_USER = "LOGIN_SUCCESS_USER"
export const LOGOUT_SUCCESS_USER = "LOGOUT_SUCCESS_USER"
export const UPDATE_USER_INFO = "UPDATE_USER_INFO"
export const UPDATE_USER_EMAIL = "UPDATE_USER_EMAIL"
export const UPDATE_USER_PASSWORD = "UPDATE_USER_PASSWORD"
export const UPDATE_USER = "UPDATE_USER"
export const ADD_OTHER_USERS = "ADD_OTHER_USERS"

export const CREATE_USER = "CREATE_USER"

//TODO - do we need them???
export const GET_USER_BY_ID = "GET_USER_BY_ID"  // => login
export const GET_USER_BY_EMAIL = "GET_USER_BY_EMAIL"  // => login
export const DELETE_USER = "UPDATE_USER"
//export const CHECK_EMAIL_EXIST = "CHECK_EMAIL_EXIST"
//-------------------------------------------------------



function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS_USER,
        data: data
    }
}

export function dispatchError(data) {
    return {
        type: ERROR_USER,
        data: data
    }
}

export function updateUser(data) {
    return {
        type: UPDATE_USER,
        data: data
    }
}

export function dispatchUpdateEmail(email) {
    return {
        type: UPDATE_USER_EMAIL,
        email: email
    }
}

export function dispatchUpdatePassword(salt, hash) {
    return {
        type: UPDATE_USER_PASSWORD,
        salt: salt,
        hash: hash
    }
}

export function dispatchAddOtherUsers(userList) {
    return {
        type: ADD_OTHER_USERS,
        data: userList
    }
}

/******************* Thunk Actions  *****************************/
/**
export const manualLogin = (data, successPath) => // path to redirect to upon successful log in
    async  dispatch => {
        dispatch({ type: LOADING_USER })
        try {
            const response = await fetchLogin(process.env.BASE, data)
            if (response.data.success && response.data.data.length > 0) {
                setLocalStorage("token", response.data.data.token)
                dispatch(loginSuccess(response.data.data[0]))
                history.push(successPath)
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
    */

export const manualLogout = (data) => async  dispatch => {
    dispatch({ type: LOADING_USER })
    try {
        const token = localStorage.getItem("token")
        const response = await fetchLogout(process.env.BASE, data, token)
        if (response.data.success) {
            dispatch({ type: LOGOUT_SUCCESS_USER })
            localStorage.removeItem("token");
            localStorage.removeItem("expires_at");
            history.push("./login")
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

export const signUp = (data) => async  dispatch => {
    //TODO need to update here to connect passport and 3rd party register

    dispatch({ type: LOADING_USER })
    try {
        const { user } = await Auth.signUp({
            email: data.email,
            password: data.password,
        });

        if (!user.confirmed) {
            dispatch(dispatchError("Sign up failed."))
            return
        }

        //TODO
        //If successful, save the name to the user in the DB.
        //TOken should be from the session storage, not the local storage.


        const token = localStorage.getItem("token")
        const response = await fetchSignUp(process.env.BASE, data, token)
        if (response.data.success) {
            data._id = response.data.data.id
            dispatch({ type: LOGIN_SUCCESS_USER, data: data })
            history.push("/projects")
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

export const signIn = (username, password)=> async  dispatch => {
    dispatch({ type: LOADING_USER })
    try {
        const user = await Auth.signIn(username, password);
        //TODO
        //check if user's attributes are valid,
        //and then call the 
    } catch (error) {
        console.log('error signing in', error);
    }
}


export const updateInfo = (data) => async  dispatch => {
    dispatch({ type: LOADING_USER })
    try {
        const token = localStorage.getItem("token")
        const response = await fetchUpdateUserInfo(process.env.BASE, { name: data.name }, token)
        if (response.data.success) {
            dispatch(updateInfo(data))
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

export const updateEmail = (data) => async  dispatch => {
    dispatch({ type: LOADING_USER })
    try {
        const token = localStorage.getItem("token")
        const response = await fetchUpdateEmail(process.env.BASE, { email: data.email }, token)
        if (response.data.success) {
            dispatch(dispatchUpdateEmail(data.email))
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

export const updatePassword = (data) => async  dispatch => {
    dispatch({ type: LOADING_USER })
    try {
        const token = localStorage.getItem("token")
        const response = await fetchUpdatePassword(process.env.BASE,
            { salt: data.salt, hash: data.hash }, token)
        if (response.data.success) {
            dispatch(dispatchUpdatePassword(data.salt, data.hash))
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

export const checkEmail = (email) => async  dispatch => {
    dispatch({ type: LOADING_USER })
    try {
        const token = localStorage.getItem("token")
        const response = await fetchCheckEmail(process.env.BASE, email, token)
        return response.data.success //boolean
    } catch (err) {
        console.log('Error', err);
    }
}

export const getUserByIds = (idList) => async  dispatch => {
    dispatch({ type: LOADING_USER })
    try {
        const token = localStorage.getItem("token")
        const trimmedList = [new Set(...idList)]
        let response = (trimmedList.length > 1) ?
            await fetchUserByIdList(process.env.BASE, trimmedList, token) :
            (trimmedList.length === 1) ?
                await fetchUserById(process.env.BASE, trimmedList[0], token) :
                ""
        if (response !== "" && response.data.success) {
            dispatch(dispatchAddOtherUsers(response.data))
        }
    } catch (err) {
        console.log('Error', err);
    }
}


/********************* API calls *************************/

export function fetchSignUp(BASE, item, token) {
    return post('/users/signup', BASE, item, token)
}

export function fetchLogin(BASE, item, token) {
    return post('/users/login', BASE, item, token)
}

export function fetchLogout(BASE, item) {
    return post('/users/logout', BASE, item, "")
}

//TODO for testing purpose
export function createUser(BASE, item) {
    return post('/users/', BASE, item, "")
}

export function fetchUserById(BASE, id, token) {//fetch all USERs of a user
    return axios.get(BASE + '/users/' + id, jwtConfig(token));
}

export function fetchUserByIdList(BASE, idList, token) {//fetch all USERs of a user
    return post('/users/multiple', BASE, idList, token)
}

export function fetchUserByEmail(BASE, email, token) {//fetch all USERs of a user
    return axios.get(BASE + '/users/email' + email, jwtConfig(token));
}

// @return: {result:boolean}
export function fetchCheckEmail(BASE, email, token) {//fetch all USERs of a user
    return post('/users/checkEmail', BASE, email, token)
}

export function fetchUpdateUserInfo(BASE, id, update, token) {//fetch all USERs of a user
    return put('/users/info/' + id, BASE, update, token)
}

export function fetchUpdateEmail(BASE, id, update, token) {//fetch all USERs of a user
    return put('/users/email/' + id, BASE, update, token)
}

export function fetchUpdatePassword(BASE, id, update, token) {//fetch all USERs of a user
    return put('/users/password' + id, BASE, update, token)
}

export function deleteUser(BASE, id, token) {//fetch all USERs of a user
    return axios.delete(BASE + '/users/' + id, jwtConfig(token));
}



async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

async function getSessionAndRefreshToken() {
    Auth.currentSession()
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

async function changePassword(user) {
    Auth.currentAuthenticatedUser()
        .then(user => {
            return Auth.changePassword(user, 'oldPassword', 'newPassword');
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

async function forgetPassword(username,code, new_password) {
    // Send confirmation code to user's email
    Auth.forgotPassword(username)
        .then(data => console.log(data))
        .catch(err => console.log(err));

    // Collect confirmation code and new password, then
    Auth.forgotPasswordSubmit(username, code, new_password)
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

async function completeNewPassword(username, password,newPassword) {
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

async function isLoggedIn() {
    Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => console.log(user))
        .catch(err => console.log(err));
}

//Only for 3rd party login
async function retreveJWT() {
    // Run this after the sign-in
    const federatedInfo = Cache.getItem('federatedInfo');
    const { token } = federatedInfo;
    return token
}