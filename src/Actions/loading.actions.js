import { getUser } from "./user.actions"
import { getProjects } from "./project.actions"
import { getProjectStatus } from "./status.actions"
import { getProjectIssues } from "./issue.actions"
import { getProjectLabels } from "./label.actions"
import history from "../history"

export const LOADING = "LOADING"
export const ERROR = "ERROR"
export const AUTHENTICATED = "AUTHENTICATED"
export const CANCEL_LOADING = "CANCEL_LOADING"

export function dispatchError(data) {
    return {
        type: ERROR,
        data: data
    }
}

export const loadProjectTablePage = () => async (dispatch) => {
    try {
        dispatch({ type: LOADING })
        const userId = await dispatch(getUser())
        await dispatch(getProjects(userId))
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        return dispatch(dispatchError(err))
    }
}

export const loadBoardPage = () => async (dispatch, getState) => {
    try {
        let projectId = getState().ProjectReducer.currentProjectId
        if (!projectId || projectId === "") {
            history.push("/projects")
            return
        }
        dispatch({ type: LOADING })
        await Promise.all([
            dispatch(getProjectStatus(projectId)),
            dispatch(getProjectIssues(projectId)),
            dispatch(getProjectLabels(projectId))
        ])
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}
