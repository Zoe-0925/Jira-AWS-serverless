import {
    fetchSignUp, fetchLogin, fetchLogout, createUser, fetchUserById, fetchUserByEmail,
    fetchCheckEmail, fetchUpdateUserInfo, fetchUpdateEmail, fetchUpdatePassword, deleteUser,

    loginSuccess, dispatchError, updateUser, dispatchUpdateEmail, dispatchUpdatePassword,


} from '../user.actions';
import thunk from 'redux-thunk'
import mockAxios from 'jest-mock-axios';
import configureStore from 'redux-mock-store'
import { post, put, jwtConfig } from "../../Components/Util"
const axios = require('axios');


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const data = {
    name: "test",
    email: "test",
    salt: "test",
    hash: "test"
}
const email = "test@gmail.com"

describe.skip("loginSuccess(data)", () => {
    it("should create an action", () => {
        const result = loginSuccess(data)
        expect(result).toEqual({
            type: "LOGIN_SUCCESS_USER",
            data: data
        })

    })
})

describe.skip("dispatchError(data)", () => {
    it("should create an action", () => {
        const result = v(data)
        expect(result).toEqual({
            type: "ERROR_USER",
            data: data
        })

    })
})

describe.skip("updateUser(data)", () => {
    it("should create an action", () => {
        const result = updateUser(data)
        expect(result).toEqual({
            type: "UPDATE_USER",
            data: data
        })

    })
})

describe.skip("dispatchUpdateEmail(email)", () => {
    it("should create an action", () => {
        const result = dispatchUpdateEmail(email)
        expect(result).toEqual({
            type: UPDATE_USER_EMAIL,
            email: email
        })

    })
})

describe.skip("dispatchUpdatePassword(salt, hash)", () => {
    it("should create an action", () => {
        const result = dispatchUpdatePassword(data.salt, data.hash)
        expect(result).toEqual({
            type: UPDATE_USER_PASSWORD,
            salt: data.salt,
            hash: data.hash
        })

    })
})

describe.skip("dispatchAddOtherUsers(userList)", () => {
    it("should create an action", () => {
        const result = dispatchAddOtherUsers([data])
        expect(result).toEqual({
            type: ADD_OTHER_USERS,
            data: [data]
        })

    })
})

//TODO bug...
describe('async actions', () => {
    let BASE = "http://localhost:8080/api"
    let token = "test token"

    afterEach(() => {
        mockAxios.reset();
    })

    it('fetchSignUp(BASE, item, token) should get the user id from the server', () => {
        let catchFn = jest.fn(),
            thenFn = jest.fn();

        let item = {
            name: "test name",
            email: "test@email.com",
            hash: "test hash",
            salt: "test dalt",
        }

        fetchSignUp(BASE, item, token)
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios.post).toHaveBeenCalledWith({
            method: 'post',
            url: "http://localhost:8080/api/users/signup",
            data: item,
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        let responseObj = { success: true, data: 'test id' };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith('test id');
        expect(catchFn).not.toHaveBeenCalled();
    })
})




describe.skip("signUp", () => {
    it('validates the inputs and ensures the correct syntax of the email and password', () => {

    })

    it('ensures email has not been registered', () => {

    })

    it('prompts the error message with invalid inputs', () => {

    })

    it('sends an API call to create a new user with valid inputs', () => {

    })

    it('calls the login function in the end', () => {

    })
})

//TODO authentication is here!!! OAuth!!! JWT
describe.skip("login", () => {
    it('sends an API call to create a new user with valid inputs', () => {

    })

    it('prompts the error message if the API request is rejected', () => {

    })

    it('saves the user id into the redux store state if the API request is successful', () => {

    })

    it('redirects to the project board page after saving the user id', () => {

    })
})

describe("logout", () => {
    it('clears the user id in the redux store', () => {

    })

    it('redirects to the login page after clearing the user id', () => {

    })
})

//TODO Bug
describe("api callls", () => {



    it("fetchSignUp(BASE, item, token) should get the user id from the server", async () => {
        let BASE = "http://localhost:8080/api"
        let item = {
            name: "test name",
            email: "test@email.com",
            hash: "test hash",
            salt: "test dalt",
        }
        let token = "test token"

        let catchFn = jest.fn(),
            thenFn = jest.fn();

        // using the component, which should make a server response
       

    })
})

