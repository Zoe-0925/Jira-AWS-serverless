import { appendSuccessStatus } from "./status.actions"
import { updateUserProjects } from "./user.actions"
import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"

export const CREATE_PROJECT = "CREATE_PROJECT"
export const UPDATE_PROJECT_ATTRIBUTE = "UPDATE_PROJECT_ATTRIBUTE"
export const UPDATE_PROJECT_DETAIL = "UPDATE_PROJECT_DETAIL"
export const APPEND_PROJECTS = "APPEND_PROJECTS"
export const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT"
export const APPEDN_CURRENT_PROJECT = "APPEDN_CURRENT_PROJECT"
export const LEAVE_PROJECT = "LEAVE_PROJECT"  //Remove a user from a project...
export const UPDATE_STATUS_ORDER = "UPDATE_STATUS_ORDER"
export const REMOVE_STATUS_FROM_ORDER = "REMOVE_STATUS_FROM_ORDER"

/*****************  Thunk Actions  ****************/
export const mockgetAllProjects = () => async dispatch => {
    try {
        let projects = [{
            _id: "7c1f9838-dbd7-4432-b52c-aae87022d578", default_assignee: "Project Lead",
            image: "", key: "TestProject1", lead: "tsidadsjkdhiueiurt", members: ["tsidadsjkdhiueiurt"], name: "TestProject1",
            statusOrder: ["9729f490-fd5f-43ab-8efb-40e8d132bc68", "efe83b13-9255-4339-a8f5-d5703beb9ffc", "439c3d96-30eb-497d-b336-228873048bc3", "f3a0e59f-635a-4b75-826f-b0f5bf24b5c4"]
        }]
        dispatch({
            type: APPEND_PROJECTS,
            data: projects //an array
        })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const chainCreactProject = (project, status) => async (dispatch, getState) => {
    const userReducer = getState().UserReducer
    let projects = userReducer.users.find(user => user._id === userReducer.currentUserId).projects
    let projectsUpdated = [...projects, project._id]
    dispatch({ type: LOADING })
    await Promise.all([
        dispatch(createProject(project)),
        dispatch(appendSuccessStatus(status)),
        dispatch(updateUserProjects(projectsUpdated))
    ])
    dispatch({ type: AUTHENTICATED })
}

export const chainDeleteProject = (projectId) => async dispatch => {
    try {
        dispatch(deleteProject(projectId))
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateProjectDetail = (data) => async  dispatch => {
    try {
        dispatch({ type: LOADING })
        await dispatch({
            type: UPDATE_PROJECT_DETAIL,
            data: data
        })
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

//TODO
//check in thunk
// I should delete project and also clear other related states.
export const deleteProject = (id) => async  dispatch => {
    await dispatch({
        type: DELETE_PROJECT,
        id: id
    })
}

export const createProject = (newProject) => async dispatch => {
    await dispatch({
        type: CREATE_PROJECT,
        data: newProject
    })
}

export const updateProjectAttribute = (data) => async dispatch => {
    await dispatch({
        type: UPDATE_PROJECT_ATTRIBUTE,
        data: data
    })
}

export const setCurrentProject = id => {
    return {
        type: SET_CURRENT_PROJECT,
        id: id
    }
}
