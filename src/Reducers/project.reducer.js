
import {
    LOADING_PROJECT, ERROR_PROJECT, CREATE_SUCCESS_PROJECT, DELETE_SUCCESS_PROJECT,
    UPDATE_SUCCESS_PROJECT, APPEND_SUCCESS_CURRENT_PROJECT, APPEND_SUCCESS_PROJECTS,
    SET_CURRENT_PROJECT, UPDATE_SUCCESS_PROJECT_NAME_AND_ASSIGNEE, UPDATE_SUCCESS_MEMBERS
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
        start_date: "",
        statusOrder: ["1", "2", "3", "4"]
    }],
    errorMessage: "",
    currentProjectId: ""
}, action) {
    let newState
    let tempProjects
    let target 
    switch (action.type) {
        case LOADING_PROJECT:
            return Object.assign({}, state, { loading: true, errorMessage: "", authenticated: false })
        case SET_CURRENT_PROJECT:
            return { ...state, loading: false, authenticated: true, currentProjectId: action.data }
        case CREATE_SUCCESS_PROJECT:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.projects = newState.projects.push(action.data)
            return newState
        case DELETE_SUCCESS_PROJECT:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.projects = newState.projects.filter(item => item._id !== action.id)
            if (newState.currentProjectId === action.id) {
                newState.currentProjectId = ""
            }
            return newState
        case APPEND_SUCCESS_PROJECTS:
            return { ...state, projects: action.data, loading: false, authenticated: true }
        case UPDATE_SUCCESS_PROJECT:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            tempProjects = newState.projects.filter(item => item._id !== action.data._id)
            tempProjects.push(action.data)
            newState.projects = tempProjects
            return newState
        case UPDATE_SUCCESS_PROJECT_NAME_AND_ASSIGNEE:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            target = Object.assign({}, newState.projects.find(item => item._id === action.data._id))
            tempProjects = newState.projects.filter(item => item._id !== action.data._id)
            target.default_assignee = action.data.default_assignee
            target.name = action.data.name
            tempProjects.push(target)
            return newState
        case UPDATE_SUCCESS_MEMBERS:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            target = Object.assign({}, newState.projects.find(item => item._id === action.data._id))
            tempProjects = newState.projects.filter(item => item._id !== action.data._id)
            target.members = action.data.members
            tempProjects.push(target)
        case ERROR_PROJECT:
            return Object.assign({}, state, { loading: false, authenticated: false, errorMessage: action.data })
        default:
            return state
    }


};

