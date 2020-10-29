import { Auth } from 'aws-amplify';
import { Cache } from 'aws-amplify';
import API from '@aws-amplify/api';
import history from "../history"
import { setLocalStorage } from "../Components/Credential/Auth.service"
require('dotenv').config()

export const ERROR_USER = "ERROR_USER"
export const LOADING_USER = "LOADING_USER"
export const LOGIN_SUCCESS_USER = "LOGIN_SUCCESS_USER"
export const LOGOUT_SUCCESS_USER = "LOGOUT_SUCCESS_USER"
export const UPDATE_USER = "UPDATE_USER"
export const ADD_OTHER_USERS = "ADD_OTHER_USERS"
export const DELETE_USER = "UPDATE_USER"
export const SAVE_TOKENS = "SAVE_TOKENS"
//export const CHECK_EMAIL_EXIST = "CHECK_EMAIL_EXIST"
//-------------------------------------------------------


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

export function saveTokens(accessToken, refreshToken) {
    return {
        type: SAVE_TOKENS,
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}


/******************* Thunk Actions  *****************************/
export const signUp = (email, name, password) => async  dispatch => {
    dispatch({ type: LOADING_USER })

    try {
        const authResponse = await Auth.signUp({
            username: email,
            password,
            attributes: {
                email
            }
        })
        if (authResponse.userConfirmed) {
            dispatch(signUp(email, name))
        }
        //TODO
        // If succeeded, show the feedback
        //TODO add loading indiator and feedback
        let response = await API.post('UserApi', '/users', {
            body: {
                email: email,
                name: name
            }
        })
        if (response.error === undefined) {
            //TODO
            //Update the sign up successful state
            // redirect to login
            console.log("response", response)
            return response.data
        }
        else {
            console.log("error at Dynamodb create user")
            return { error: "You have already signed up. Please login." }
        }
    }
    catch (err) {
        dispatch(dispatchError(err.message))


    }
    //Create a user object in DynamoDB


}

export const checkUserExist = (email) => async  dispatch => {
    dispatch({ type: LOADING_USER })
    try {
        return await API.get("/email/" + email);
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

export const signIn = (email, password) => async  dispatch => {
    dispatch({ type: LOADING_USER })
    try {
        const { user } = await Auth.signIn(email, password);
        if (!user.confirmed) {
            dispatch(dispatchError("Invalid user name or password."))
            console.log("error at cognito sign up")
            return
        }
        console.log("Succeeded at cognito sign up")
        const userInformation = await API.get('UserApi', `/users/email/${email}`, {})
        if (userInformation.error) {
            console.log("error at Dynamodb create user")
            dispatch(dispatchError(err))
            return
        }
        dispatch({ type: LOGIN_SUCCESS_USER, data: JSON.parse(response) })
        history.push("/projects/")

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
        if (data.error) {
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

export const getCurrentUser = () => async  dispatch => {
    dispatch({ type: LOADING_USER })
    try {
        const credential = await Auth.currentAuthenticatedUser({  bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        })
        if (credential) {
            const email = credential.username
            const accessToken = credential.signInUserSession.accessToken
            const refreshToken = credential.signInUserSession.refreshToken.token //The token String
            dispatch(saveTokens(accessToken, refreshToken))
            let userInfo = await API.get("UserApi", "/users/email/" + email);
            if (userInfo.Item) {  //if user does not exist, create one.
                userInfo = await API.post("UserApi", "/users/", {
                    body: {
                        _id: uuidv4(),
                        email: email,
                        name: "",
                        projects: []
                    }
                });
            }
            dispatch(updateUser(userInfo))
            if (userInfo.error) {
                dispatch(dispatchError(data.error))
            }
        }
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