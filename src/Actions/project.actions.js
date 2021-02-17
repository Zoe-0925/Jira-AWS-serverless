import API from '@aws-amplify/api';
import { getProjectStatus, fetchDeleteStatusByProject, appendSuccessStatus, fetchCreateMultipleStatus } from "./status.actions"
import { getProjectIssues, fetchDeleteIssueByProject } from "./issue.actions"
import { getProjectLabels, fetchDeleteLabelByProject } from "./label.actions"
import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"
//import { sendWsToServer } from "./websocket.actions"

export const CREATE_PROJECT = "CREATE_PROJECT"
export const DELETE_PROJECT = "DELETE_PROJECT"
export const UPDATE_PROJECT_ATTRIBUTE = "UPDATE_PROJECT_ATTRIBUTE"
export const UPDATE_PROJECT_DETAIL = "UPDATE_PROJECT_DETAIL"
export const APPEND_PROJECTS = "APPEND_PROJECTS"
export const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT"
export const LEAVE_PROJECT = "LEAVE_PROJECT"  

/*****************  Thunk Actions  ****************/
//TODO
//check if the reducer is updated right
export const chainGetProjectData = (id) => async dispatch => {
    await Promise.all([
        dispatch({ type: LOADING }),
        dispatch(getProjectStatus(id)),
        dispatch(getProjectIssues(id)),
        dispatch(getProjectLabels(id))
    ])
    dispatch({ type: AUTHENTICATED })
}

export const getAllProjects = (idList) => async dispatch => {
    try {
        idList.map(projectId => API.get("ProjectApi", "/projects/object/" + projectId).then(
            project => {
                dispatch({
                    type: CREATE_PROJECT,
                    data: project.Item
                })
            }
        ))
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
        dispatch({
            type: APPEND_PROJECTS,
            data: projects //an array
        })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

//Create a project with 4 default status - TO DO, IN PROGRESS, TESTING, DONE
export const chainCreactProject = (project, status) => async (dispatch) => {
    dispatch({ type: LOADING })
    await Promise.all([
        fetchCreateProject(project),
        fetchCreateMultipleStatus(status),
        dispatch(createProject(project)),
        dispatch(appendSuccessStatus(status))
    ])
    dispatch({ type: AUTHENTICATED })
}

//TODO
//check API and dynamodb
export const chainDeleteProject = (projectId) => async dispatch => {
    try {
        dispatch({ type: LOADING })
        await Promise.all([
            dispatch(fetchDeleteProject(projectId)),
            dispatch(fetchDeleteIssueByProject(projectId)), //Query the items in the back end by project and then loop over to delete
            dispatch(fetchDeleteStatusByProject(projectId)),
            dispatch(fetchDeleteLabelByProject(projectId)),
            dispatch(deleteProject(projectId))
        ])
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateProjectDetail = (data) => async  dispatch => {
    try {
        dispatch({ type: LOADING })
        await Promise.all([
            fetchUpdateProjectDetail(data),
            await dispatch({
                type: UPDATE_PROJECT_DETAIL,
                data: data
            })
        ])

        //TODO uncomment to enable web socket
        /**
         *     await dispatch(sendWsToServer({
            type: UPDATE_PROJECT_DETAIL,
            data: data
        }))
         */
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const addMember = (projectId, userId, members) => async dispatch => {
    try {
        const param = { _id: projectId, value: [...members, userId], attribute: "members" }
        await Promise.all([
            fetchUpdateProjectAttribute(param),
            dispatch(updateProjectAttribute(param))
        ])
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

//TODO checck both locally and API
export const subMembers = (projectId, userId, members) => async dispatch => {
    try {
        let updated = [...members]
        updated = updated.filter(member => member === userId)
        const param = { _id: projectId, value: updated, attribute: "members" }
        await fetchUpdateProjectAttribute(param)
        await dispatch(updateProjectAttribute(param))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

//TODO
//check in thunk
// I should delete project and also clear other related states.
export const deleteProject = (id) => dispatch => {
    dispatch({
        type: DELETE_PROJECT,
        id: id
    })
    //TODO: Uncomment to enable web socket
    /**    await dispatch(sendWsToServer({
        type: DELETE_PROJECT,
        id: id
    }))
     */
}

export const createProject = (newProject) => dispatch => {
    dispatch({
        type: CREATE_PROJECT,
        data: newProject
    })
}

export const updateProjectAttribute = (data) => dispatch => {
    //TODO: Uncomment to enable web socket
    /**     await dispatch(sendWsToServer({
        type: UPDATE_PROJECT_ATTRIBUTE,
        data: data
    }))
     */

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

/*****************  APIs  ****************/

export const fetchUpdateProjectAttribute = async data => {
    await API.put("ProjectApi", "/projects/update/", { body: data })
}

export const fetchCreateProject = async newProject => {
    await API.post("ProjectApi", "/projects", {
        body: newProject
    })
}

export const fetchDeleteProject = async id => {
    await API.del("ProjectApi", "/projects/object/" + id)
}

export const fetchUpdateProjectDetail = async data => {
    await API.put("ProjectApi", "/projects/detail", data)
}