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
export const FINISH_LOADING = "FINISH_LOADING"
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
                email: email,
                fullname: name
            }
        })
        if (authResponse.userConfirmed) {
            dispatch({
                type: FINISH_LOADING
            })
            history.push("/confirmSignup")
        }
    }
    catch (err) {
        dispatch(dispatchError(err.message))
    }
}

/******************* Thunk Actions  *****************************/
export const confirmSignUp = (email, code) => async  dispatch => {
    dispatch({ type: LOADING_USER })
    try {
        const authResponse = await Auth.confirmSignUp(email, code);
        console.log("confirm sign up", authResponse)

        //   if (authResponse.userConfirmed) {
        //       await Auth.confirmSignUp(email, password);
        //history.push
        //cancel loading
        //    }
        //TODO
        // If succeeded, show the feedback
        //TODO add loading indiator and feedback
        //
        /** 
        dispatch({
            type: FINISH_LOADING
        })
        */
        //And create a user object in dynamodb.
    }
    catch (err) {
        dispatch(dispatchError(err.message))


    }
    //Create a user object in DynamoDB


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
            dispatch(dispatchError(userInformation.error))
            return
        }
        const data = { email: user.email, name: user.name, projects: JSON.parse(userInformation).projects }
        dispatch({ type: LOGIN_SUCCESS_USER, data: data })
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
            dispatch(dispatchError(response.error))
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
    }
}

export const getCurrentUser = () => async  dispatch => {
    dispatch({ type: LOADING_USER })
    try {
        const credential = await Auth.currentAuthenticatedUser({
            bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        })
        if (credential) {
            const accessToken = credential.signInUserSession.accessToken
            const refreshToken = credential.signInUserSession.refreshToken.token //The token String
            dispatch(saveTokens(accessToken, refreshToken))

            //TODO update

            //  const userInfo = await API.get("UserApi", "/users/email/" + credential.email)
            //   dispatch(updateUser(user))
            //   if (userInfo.error) {
            //       dispatch(dispatchError(data.error))
            //   }
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

//TODO 
//bug
export const getUserNameAndProjects = (name) => async  dispatch => {
    dispatch({ type: LOADING_USER })
    const user = await Auth.currentAuthenticatedUser()
    if (user.name === undefined) {
        await Auth.updateUserAttributes(user, {
            'name': name,
            'projects': []
        });
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
