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
export const signUp = (data, name) => async  dispatch => {
    dispatch({ type: LOADING_USER })
    try {
        //Sign up the user in Cognito
        const { user } = await Auth.signUp({
            username: data.email,
            password: data.password,
            attributes: {
                email: data.email
            }
        });

        if (!user.confirmed) {
            //TODO maybe return info???
            return { error: "You have already signed up. Please login." }
        }
        //Create a user object in DynamoDB
        let response = await API.post('UserApi', '/users', {
            body: {
                email: email,
                name: name
            }
        })
        if (response.error === undefined) {
            //TODO
            //cache the email to the just signed up place???
            return response.data
        }
        else {
            return { error: "You have already signed up. Please login." }
        }
    }
    catch (err) {
        return { error: "You have already signed up. Please login." }
    }
}

export const signIn = (email, password) => async  dispatch => {
    dispatch({ type: LOADING_USER })
    try {
        const { user } = await Auth.signIn(email, password);
        if (!user.confirmed) {
            dispatch(dispatchError("Invalid user name or password."))
            return
        }
        const userInformation = await API.get('UserApi', `/users/email/${email}`, {})
        if (userInformation.error) {
            dispatch(dispatchError(err))
            return
        }
        dispatch({ type: LOGIN_SUCCESS_USER, data: JSON.parse(response) })
        history.push("/projects")

    } catch (err) {
        dispatch(dispatchError(err))
    }
}

export const signOut = () => async  dispatch => {
    dispatch({ type: LOADING_USER })
    try {
        const response = await Auth.signOut()
        if (response.error) {
            dispatch(dispatchError(err))
            return
        }
        dispatch({
            type: LOGOUT_SUCCESS_USER
        })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updatePassword = (oldPassword, newPassword) => async  dispatch => {
    dispatch({ type: LOADING_USER })
    try {
        const user = await Auth.currentAuthenticatedUser()
        const data = await Auth.changePassword(user, oldPassword, newPassword);
        if(data.error){
            dispatch(dispatchError(data.error))
            return
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
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