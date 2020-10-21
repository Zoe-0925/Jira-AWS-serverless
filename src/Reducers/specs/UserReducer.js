import UserReducer from "../user.reducer"
import {
    LOADING_USER,
    LOGIN_SUCCESS_USER,
    ERROR_USER,
    LOGOUT_SUCCESS_USER,
    UPDATE_USER,
    UPDATE_USER_EMAIL,
    UPDATE_USER_PASSWORD,
    ADD_OTHER_USERS,
} from "../../Actions/user.actions"


const initialUser = { _id: "testUserId", name: "userName", email: "test email" }
const newUser = { _id: "new user id", name: "new userName", email: "new test email" }
const newEmail = "newEmail@test.com"
const newPassword = "testtestesttest"
const initialState = {
    loading: false,
    authenticated: false,
    currentUser: initialUser._id,
    users: [initialUser],
    errorMessage: ""
}

describe.skip('User Reducer', () => {
    it.skip('should return the initial state', () => {
        expect(UserReducer(undefined, {})).toEqual(initialState)
    })

    it.skip('should handle LOADING_USER', () => {
        const updatedState = { ...initialState, loading: true, authenticated: false }
        expect(
            UserReducer(undefined, { type: LOADING_USER })
        ).toEqual(updatedState)
    })

    it.skip('should handle LOGIN_SUCCESS_USER', () => {
        expect(
            UserReducer(undefined, { type: LOGIN_SUCCESS_USER, data: newUser })
        ).toEqual(
            {
                loading: false,
                authenticated: true,
                currentUser: newUser._id,
                users: [newUser]
            }
        )
    })

    it.skip('should handle LOGOUT_SUCCESS_USER', () => {
        expect(
            UserReducer(undefined, { type: LOGOUT_SUCCESS_USER })
        ).toEqual(
            {
                loading: false,
                authenticated: false,
                currentUser: {},
                users: []
            }
        )
    })

    it.skip('should handle UPDATE_USER', () => {
        expect(
            UserReducer(undefined, { type: UPDATE_USER, data: newUser  })
        ).toEqual(
            { ...initialState, authenticated: true, users: [newUser] }
        )
    })

    it('should handle UPDATE_USER_EMAIL', () => {
        const userAfterUpdate = { _id: "testUserId", name: "userName", email: newEmail }
        expect(
            UserReducer(undefined, { type: UPDATE_USER_EMAIL, id:"testUserId", email: newEmail })
        ).toEqual(
            {
                ...initialState, authenticated: true, users: [userAfterUpdate]
            }
        )
    })


    it('should handle UPDATE_USER_PASSWORD', () => {
        const userAfterUpdate = { _id: "testUserId", name: "userName", password: newPassword }
        expect(
            UserReducer(undefined, { type: UPDATE_USER_PASSWORD, password: newPassword })
        ).toEqual(
            {
                ...initialState, authenticated: true, currentUser: userAfterUpdate,
                users: [userAfterUpdate]
            }
        )
    })

    it.skip('should handle ADD_OTHER_USERS', () => {
        expect(
            UserReducer(undefined, { type: ADD_OTHER_USERS, data: [newUser] })
        ).toEqual(
            {
                ...initialState, loading: false, authenticated: true, users: [initialUser, newUser]
            }
        )
    })

    it.skip('should handle ERROR_USER', () => {
        expect(
            UserReducer(undefined, { type: ERROR_USER, data: "err" })
        ).toEqual({ ...initialState, errorMessage: "err" })
    })
})

