
import {
    CREATE_PROJECT, DELETE_PROJECT, APPEND_PROJECTS, SET_CURRENT_PROJECT, UPDATE_PROJECT_ATTRIBUTE, UPDATE_PROJECT_DETAIL
} from "../Actions/project.actions"


const testState = {
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
    currentProjectId: "test id"
}

const initialState = {
    projects: [],
    currentProjectId: ""
}

/**
 * 
 * @param {{
        _id:"7c1f9838-dbd7-4432-b52c-aae87022d578", key:"TestProject1", lead:"tsidadsjkdhiueiurt",
        name:"TestProject1", members:["tsidadsjkdhiueiurt"], default_assignee:"Project Lead", 
        updatedAt:"2020-11-09T03:06:10.823Z", createdAt:"2020-11-09T03:06:10.823Z",
        statusOrder:["9729f490-fd5f-43ab-8efb-40e8d132bc68", "efe83b13-9255-4339-a8f5-d5703beb9ffc", "439c3d96-30eb-497d-b336-228873048bc3", "f3a0e59f-635a-4b75-826f-b0f5bf24b5c4"]
    }} state 
 * @param {*} action 
 */

export default function ProjectReducer(state = testState, action) {
    let newState = { ...state }
    let target
    switch (action.type) {
        case SET_CURRENT_PROJECT:
            return { ...state, currentProjectId: action.id }
        case CREATE_PROJECT:
            return { ...state, projects: [...state.projects, action.data] }
        case DELETE_PROJECT:
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
        case "CLEAR":
            return initialState
        default:
            return state
    }


};

