import API from '@aws-amplify/api';
import { createMultipleStatus, getProjectStatus, deleteStatusByProject } from "./status.actions"
import { addProjectToUser } from "./user.actions"
import { getProjectIssues, deleteIssueByProject } from "./issue.actions"
import { getProjectLabels, deleteLabelByProject } from "./label.actions"
import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"

export const CREATE_PROJECT = "CREATE_PROJECT"
export const DELETE_PROJECT = "DELETE_PROJECT"
export const UPDATE_PROJECT_ATTRIBUTE = "UPDATE_PROJECT_ATTRIBUTE"
export const UPDATE_PROJECT_DETAIL = "UPDATE_PROJECT_DETAIL"
export const APPEND_PROJECT = "APPEND_PROJECT"
export const APPEND_PROJECTS = "APPEND_PROJECTS"
export const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT"
export const APPEDN_CURRENT_PROJECT = "APPEDN_CURRENT_PROJECT"
export const LEAVE_PROJECT = "LEAVE_PROJECT"  //Remove a user from a project...
export const UPDATE_STATUS_ORDER = "UPDATE_STATUS_ORDER"
export const REMOVE_STATUS_FROM_ORDER = "REMOVE_STATUS_FROM_ORDER"

/***************** Actions  ***********************/


export function createSuccessfulProject(data) {
    return {
        type: CREATE_PROJECT,
        data: data
    }
}

export function appendSuccessfulProject(data) {
    return {
        type: APPEND_PROJECTS,
        data: data //an array
    }
}



export function updateSuccessfulProjectDetail(data) {
    return {
        type: UPDATE_PROJECT_DETAIL,
        data: data
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
        type: UPDATE_STATUS_ORDER,
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


export const createProject = (newProject) => async dispatch => {
    try {
        await API.post("ProjectApi", "/projects", {
            body: newProject
        })
        dispatch(createSuccessfulProject(newProject))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const getAllProjects = (idList) => async dispatch => {
    try {
        idList.map(projectId => API.get("ProjectApi", "/projects/object/" + projectId)
            .then(project => dispatch({
                type: APPEND_PROJECT,
                data: project.Item
            })).catch(err => dispatch(dispatchError(err))))

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

export const updateProjectAttribute = (data) => async dispatch => {
    dispatch({ type: LOADING })
    try {
        await API.put("ProjectApi", "/projects/update/", { body: data })
        await dispatch({
            type: UPDATE_PROJECT_ATTRIBUTE,
            data: data
        })
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

export const addMember = (projectId, userId, members) => async dispatch => {
    await dispatch(updateProjectAttribute({ _id: projectId, value: [...members, userId], attribute: "members" }))
}

export const subMembers = (projectId, userId, members) => async dispatch => {
    let updated = [...members]
    updated = updated.filter(member => member === userId)
    await dispatch(updateProjectAttribute({ _id: projectId, value: updated, attribute: "members" }))
}

export const deleteProject = (id) => async  dispatch => {
    try {
        await API.del("ProjectApi", "/projects/" + id)
        dispatch({
            type: DELETE_PROJECT,
            id: id
        })
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
        dispatch(updateSuccessfulStatusOrder(orderUpdated))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}