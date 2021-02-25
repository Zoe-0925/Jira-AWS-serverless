import { mockgetAllProjects, setCurrentProject } from "./project.actions"
import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"
import { appendSuccessStatus } from "./status.actions"
import { APPEND_ISSUES } from "./issue.actions"

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const UPDATE_USER = "UPDATE_USER"
export const ADD_OTHER_USERS = "ADD_OTHER_USERS"
export const CLEAR = "CLEAR"
export const SAVE_TOKENS = "SAVE_TOKENS"
export const FINISH_LOADING = "FINISH_LOADING"

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

export function addOtherUsers(data) {
    return {
        type: ADD_OTHER_USERS,
        data: data
    }
}

export const mockgetUserAndProjectData = () => async (dispatch) => {
    try {
        dispatch({ type: LOADING })
        const user = { _id: "tsidadsjkdhiueiurt", name: "Zoe Zhang", email: "jin0925aki@gmail.com", avator: "https://cdn.pixabay.com/photo/2016/06/15/23/20/woman-1460150_960_720.jpg" }
        await Promise.all([
            dispatch(login(user)),
            dispatch(mockgetAllProjects())
        ])
        dispatch(setCurrentProject("7c1f9838-dbd7-4432-b52c-aae87022d578"))
        const now = new Date()
        const dateString = JSON.stringify(now)
        await Promise.all([
            dispatch(addOtherUsers([
                { _id: "user2", name: "Jay Harris", email: "jayharris@gmail.com", avator: "https://cdn.pixabay.com/photo/2020/06/02/08/30/man-5249991_960_720.jpg" },
                { _id: "user3", name: "Stacy McGram", email: "stacymcgram@gmail.com", avator: "https://cdn.pixabay.com/photo/2019/10/04/13/40/woman-4525714_960_720.jpg" }
            ])),
            dispatch({
                type: APPEND_ISSUES,
                data: {
                    tasks: [{
                        _id: "issueId1", summary: "Code feature A", description: "Coding...", updatedAt: dateString, createdAt: dateString, issueType: "task",
                        labels: [], parent: "", status: "9729f490-fd5f-43ab-8efb-40e8d132bc68", project: "7c1f9838-dbd7-4432-b52c-aae87022d578"
                    }]
                }
            }),
            dispatch(appendSuccessStatus([{ _id: "9729f490-fd5f-43ab-8efb-40e8d132bc68", issues: ["issueId1"], name: "TO DO", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" },
            { _id: "efe83b13-9255-4339-a8f5-d5703beb9ffc", issues: [], name: "IN PROGRESS", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" },
            { _id: "439c3d96-30eb-497d-b336-228873048bc3", issues: [], name: "TESTING", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" },
            { _id: "f3a0e59f-635a-4b75-826f-b0f5bf24b5c4", issues: [], name: "DONE", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" }])),
        ])
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}
