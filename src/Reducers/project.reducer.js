
import {
    CREATE_PROJECT, APPEND_PROJECTS, SET_CURRENT_PROJECT, UPDATE_PROJECT_ATTRIBUTE, UPDATE_PROJECT_DETAIL
} from "../Actions/project.actions"

const initialState = {
    projects: [],
    currentProjectId: ""
}

export default function ProjectReducer(state = initialState, action) {
    let newState = { ...state }
    let target
    switch (action.type) {
        case SET_CURRENT_PROJECT:
            return { ...state, currentProjectId: action.id }
        case CREATE_PROJECT:
            return { ...state, projects: [...state.projects, action.data] }
        case "DELETE_PROJECT":
            newState.projects = newState.projects.filter(item => item._id !== action.id)
            if (newState.currentProjectId === action.id) {
                newState.currentProjectId = ""
            }
            return newState
        case APPEND_PROJECTS:
            return { ...state, projects: action.data }
        case UPDATE_PROJECT_ATTRIBUTE:
            target = newState.projects.find(item => item._id === newState.currentProjectId)
            target[action.data.attribute] = action.data.value
            return newState
        case UPDATE_PROJECT_DETAIL:
            target = newState.projects.find(item => item._id === action.data._id)
            target.default_assignee = action.data.default_assignee
            target.name = action.data.name
            target.key = action.data.key
            return newState
        case "CLEAR_PROJECT":
            return initialState
        default:
            return state
    }


};

