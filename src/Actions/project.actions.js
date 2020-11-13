import API from '@aws-amplify/api';
import { createMultipleStatus, getProjectStatus, deleteStatusByProject } from "./status.actions"
import { addProjectToUser } from "./user.actions"
import { getProjectIssues, deleteIssueByProject } from "./issue.actions"
import { getProjectLabels, deleteLabelByProject } from "./label.actions"
import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"

export const CREATE_SUCCESS_PROJECT = "CREATE_SUCCESS_PROJECT"
export const DELETE_SUCCESS_PROJECT = "DELETE_SUCCESS_PROJECT"
export const UPDATE_SUCCESS_MEMBERS = "UPDATE_MEMBERS"
export const UPDATE_SUCCESS_PROJECT = "UPDATE_SUCCESS_PROJECT"
export const UPDATE_SUCCESS_PROJECT_DETAIL = "UPDATE_SUCCESS_PROJECT_DETAIL"
export const UPDATE_SUCCESS_PROJECT_NAME = "UPDATE_SUCCESS_PROJECT_NAME"
export const APPEND_SUCCESS_PROJECTS = "APPEND_SUCCESS_PROJECTS"
export const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT"
export const APPEDN_CURRENT_PROJECT = "APPEDN_CURRENT_PROJECT"
export const LEAVE_PROJECT = "LEAVE_PROJECT"  //Remove a user from a project...
export const UPDATE_SUCCESS_STATUS_ORDER = "UPDATE_SUCCESS_STATUS_ORDER"
export const REMOVE_SUCCESS_STATUS_FROM_ORDER = "REMOVE_SUCCESS_STATUS_FROM_ORDER"

/***************** Actions  ***********************/
export function updateSuccessfulMembers(data) {
    return {
        type: UPDATE_SUCCESS_MEMBERS,
        data: data
    }
}


export function createSuccessfulProject(data) {
    return {
        type: CREATE_SUCCESS_PROJECT,
        data: data
    }
}

export function appendSuccessfulProject(data) {
    return {
        type: APPEND_SUCCESS_PROJECTS,
        data: data //an array
    }
}

export function updateSuccessfulProject(data) {
    return {
        type: UPDATE_SUCCESS_PROJECT,
        data: data
    }
}

export function updateSuccessfulProjectName(data) {
    return {
        type: UPDATE_SUCCESS_PROJECT_NAME,
        data: data
    }
}

export function updateSuccessfulProjectDetail(data) {
    return {
        type: UPDATE_SUCCESS_PROJECT_DETAIL,
        data: data
    }
}

export function deleteSuccessfulProject(id) {
    return {
        type: UPDATE_SUCCESS_PROJECT,
        id: id
    }
}

export function setCurrentProject(data) {
    return {
        type: SET_CURRENT_PROJECT,
        data: data
    }
}

export const updateSuccessfulStatusOrder = (data) => {
    return {
        type: UPDATE_SUCCESS_STATUS_ORDER,
        data: data
    }
}

/*****************  Thunk Actions  ****************/
export const chainCreactProject = (project, status) => async dispatch => {
    await Promise.all([
        dispatch({ type: LOADING }),
        dispatch(createProject(project)),
        dispatch(createMultipleStatus(status)),
        dispatch(addProjectToUser(project._id))
    ])
    dispatch({ type: AUTHENTICATED })
}

export const chainGetProjectData = (id) => async dispatch => {
    await Promise.all([
        dispatch({ type: LOADING }),
        dispatch(getProjectStatus(id)),
        dispatch(getProjectIssues(id)),
        dispatch(getProjectLabels(id))
    ])
    dispatch({ type: AUTHENTICATED })
}

export const chainDeleteProject = (projectId) => async dispatch => {
    await Promise.all([
        dispatch({ type: LOADING }),
        dispatch(deleteIssueByProject(projectId)), //Query the items in the back end by project and then loop over to delete
        dispatch(deleteStatusByProject(projectId)),
        dispatch(deleteLabelByProject(projectId))
    ])
    dispatch({ type: AUTHENTICATED })
}


export const createProject = (newProject) => dispatch => {
    API.post("ProjectApi", "/projects", {
        body: newProject
    }).catch(err => {
        dispatch(dispatchError(err))
        return
    })
    dispatch(createSuccessfulProject(newProject))
}

export const getAllProjects = (idList) => async dispatch => {
    try {
        let projects = []
        idList.map(projectId => API.get("ProjectApi", "/projects/object/" + projectId)
            .then(project => projects.push(project.Item)).catch(err => dispatch(dispatchError(err))))
        dispatch(appendSuccessfulProject(projects))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const mockgetAllProjects = () => async dispatch => {
    try {
        let projects = [{
            _id: "7c1f9838-dbd7-4432-b52c-aae87022d578", default_assignee: "Project Lead",
            image: "", key: "TestProject1", lead: "tsidadsjkdhiueiurt", members: ["tsidadsjkdhiueiurt"], name: "TestProject1",
            statusOrder: ["9729f490-fd5f-43ab-8efb-40e8d132bc68", "efe83b13-9255-4339-a8f5-d5703beb9ffc", "439c3d96-30eb-497d-b336-228873048bc3", "f3a0e59f-635a-4b75-826f-b0f5bf24b5c4"]
        }]
        dispatch(appendSuccessfulProject(projects))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateProjectName = (data) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        await API.put("ProjectApi", "/projects/name", data)
        await dispatch(updateSuccessfulProjectName(data))
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}


export const updateProjectDetail = (data) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        await API.put("ProjectApi", "/projects/detail", data)
        await dispatch(updateSuccessfulProjectDetail(data))
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateMembers = data => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        await API.put("ProjectApi", "/projects/members", data)
        //TODO
        // dispatch(updateSuccessfulProjecMembers(data))
        dispatch({ type: AUTHENTICATED })
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateStatusOrder = (data) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        await API.put("ProjectApi", "/projects/update/statusOrder", {
            body: { items: data }
        })
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}


export const deleteProject = (id) => async  dispatch => {
    try {
        await API.del("ProjectApi", "/projects/" + id)
        dispatch(deleteSuccessfulProject(id))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const removeStatusFromOrder = (id) => async (dispatch, getState) => {
    try {
        const reducer = getState().ProjectReducer
        const orderBefore = reducer.projects.find(item => item._id === reducer.currentProjectId).statusOrder
        const orderUpdated = orderBefore.filter(item => item !== id)
        await API.put("ProjectApi", "/projects/statusOrder", {
            body: { statusOrder: orderUpdated }
        })
        dispatch(updateStatusOrder(orderUpdated))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}