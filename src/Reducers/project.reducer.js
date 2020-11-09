
import {
    LOADING_PROJECT, ERROR_PROJECT, CREATE_SUCCESS_PROJECT, DELETE_SUCCESS_PROJECT,
    APPEND_SUCCESS_PROJECTS, SET_CURRENT_PROJECT, UPDATE_SUCCESS_PROJECT_NAME_AND_ASSIGNEE,
    UPDATE_SUCCESS_MEMBERS, UPDATE_SUCCESS_STATUS_ORDER,
} from "../Actions/project.actions"

const testState = {
    loading: false,
    authenticated: false,
    projects: [{
        _id: "test id",
        name: "test project name",
        key: "test key",
        lead: "testUserId",
        members: ["testUserId"],
        image: "",
        default_assignee: "Project Lead",
        start_date: "",
        statusOrder: ["1", "2", "3", "4"]
    }],
    errorMessage: "",
    currentProjectId: "test id"
}

const initialState = {
    loading: false,
    authenticated: false,
    projects: [{
        _id:"7c1f9838-dbd7-4432-b52c-aae87022d578", key:"TestProject1", lead:"tsidadsjkdhiueiurt",
        name:"TestProject1", members:["tsidadsjkdhiueiurt"], default_assignee:"Project Lead", 
        updatedAt:"2020-11-09T03:06:10.823Z", createdAt:"2020-11-09T03:06:10.823Z",
        statusOrder:["9729f490-fd5f-43ab-8efb-40e8d132bc68", "efe83b13-9255-4339-a8f5-d5703beb9ffc", "439c3d96-30eb-497d-b336-228873048bc3", "f3a0e59f-635a-4b75-826f-b0f5bf24b5c4"]
    }],
    errorMessage: "",
    currentProjectId: ""
}


export default function ProjectReducer(state = initialState, action) {
    let newState = { ...state, loading: false, authenticated: true }
    let target
    switch (action.type) {
        case LOADING_PROJECT:
            return { ...state, loading: true, errorMessage: "", authenticated: false }
        case SET_CURRENT_PROJECT:
            return { ...state, loading: false, authenticated: true, currentProjectId: action.data }
        case CREATE_SUCCESS_PROJECT:
            newState.projects.push(action.data)
            return newState
        case DELETE_SUCCESS_PROJECT:
            newState.projects = newState.projects.filter(item => item._id !== action.id)
            if (newState.currentProjectId === action.id) {
                newState.currentProjectId = ""
            }
            return newState
        case APPEND_SUCCESS_PROJECTS:
            return { ...state, projects: action.data, loading: false, authenticated: true }
        case UPDATE_SUCCESS_STATUS_ORDER:
            newState.projects.find(item => item._id === action.data._id).statusOrder = action.data.statusOrder
            return newState
        case UPDATE_SUCCESS_PROJECT_NAME_AND_ASSIGNEE:
            target = newState.projects.find(item => item._id === action.data._id)
            target.default_assignee = action.data.default_assignee
            target.name = action.data.name
            target.key = action.data.key
            return newState
        case UPDATE_SUCCESS_MEMBERS:
            target = newState.projects.find(item => item._id === action.data._id)
            target.members = action.data.members
            return newState
        case UPDATE_SUCCESS_STATUS_ORDER:
            target = newState.projects.find(item => item._id === currentProjectId)
            target.statusOrder = action.data
            return newState
        case ERROR_PROJECT:
            return { ...state, loading: false, authenticated: false, errorMessage: action.data }
        default:
            return state
    }


};

