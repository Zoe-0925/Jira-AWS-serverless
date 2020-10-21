
import {
    LOADING_PROJECT, ERROR_PROJECT, CREATE_SUCCESS_PROJECT, DELETE_SUCCESS_PROJECT,
    UPDATE_SUCCESS_PROJECT, APPEND_SUCCESS_CURRENT_PROJECT, APPEND_SUCCESS_PROJECTS,
    SET_CURRENT_PROJECT
} from "../Actions/project.actions"

export default function ProjectReducer(state = {
    loading: false,
    authenticated: false,
    projects: [{
        _id: "test id",
        name: "test project name",
        key: "test key",
        lead: "testUserId",
        members: ["testUserId"],
        image: "",
        issues: [],
        default_assignee: "Project Lead",
        start_date: ""
    }],
    errorMessage: "",
    currentProject: "test id"
}, action) {
    let newState
    let tempProjects
    switch (action.type) {
        case LOADING_PROJECT:
            return Object.assign({}, state, { loading: true, errorMessage: "", authenticated: false })
        case SET_CURRENT_PROJECT:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.currentProject = action.id
            return newState
        case CREATE_SUCCESS_PROJECT:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.projects.push(action.data)
            return newState
        case DELETE_SUCCESS_PROJECT:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.projects = newState.projects.filter(item => item._id !== action.id)
            if (newState.currentProject=== action.id) {
                newState.currentProject = ""
            }
            return newState
        case APPEND_SUCCESS_PROJECTS:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            tempProjects = newState.projects.concat(action.data)
            newState.projects = tempProjects
            return newState
        case UPDATE_SUCCESS_PROJECT:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            tempProjects = newState.projects.filter(item => item._id !== action.data._id)
            tempProjects.push(action.data)
            newState.projects = tempProjects
            return newState
        case ERROR_PROJECT:
            return Object.assign({}, state, { loading: false, authenticated: false, errorMessage: action.data })
        default:
            return state
    }


};

