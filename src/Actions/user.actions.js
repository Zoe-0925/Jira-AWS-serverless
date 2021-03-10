import { mockgetAllProjects, setCurrentProject } from "./project.actions"
import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"
import { appendSuccessStatus } from "./status.actions"
import { APPEND_ISSUES } from "./issue.actions"
import { user, otherUsers, currentProject, tasks, status } from "../Data"

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
            dispatch(mockgetAllProjects
                ()),
            dispatch(setCurrentProject(currentProject._id)),
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
