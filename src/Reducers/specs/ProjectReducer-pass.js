import ProjectReducer from "../ProjectReducer"

import {
    LOADING_PROJECT, ERROR_PROJECT, CREATE_SUCCESS_PROJECT, DELETE_SUCCESS_PROJECT,
    UPDATE_SUCCESS_PROJECT, APPEND_SUCCESS_CURRENT_PROJECT, APPEND_SUCCESS_PROJECTS,
    SET_CURRENT_PROJECT
} from "../../Actions/project.actions"

const initialCurrentProject = {
    _id: "test id",
    name: "test project name",
    key: "test key",
    lead: "testUserId",
    members: ["testUserId"],
    image: "",
    issues: [],
    default_assignee: "Project Lead",
    start_date: ""
}
const initialState = {
    loading: false,
    authenticated: false,
    projects: [initialCurrentProject],
    errorMessage: "",
    currentProject: initialCurrentProject._id
}
const project = {
    "_id": "test id new",
    name: "test project name"
}

describe('Project Reducer', () => {
    it.skip('should return the initial state', () => {
        expect(ProjectReducer(undefined, {})).toEqual(initialState)
    })

    it.skip('should handle LOADING_PROJECT', () => {
        const updatedState = { ...initialState, loading: true, authenticated: false }
        expect(
            ProjectReducer(undefined, { type: LOADING_PROJECT })
        ).toEqual(updatedState)
    })

    it.skip('should handle SET_CURRENT_PROJECT', () => {
        const updatedState = { ...initialState, loading: false, authenticated: true, currentProject: project._id }
        expect(
            ProjectReducer(undefined, { type: SET_CURRENT_PROJECT, id: project._id })
        ).toEqual(updatedState)
    })

    it.skip('should handle CREATE_SUCCESS_PROJECT', () => {
        const updatedState = { ...initialState, loading: false, authenticated: true, projects: [initialCurrentProject, project] }
        expect(
            ProjectReducer(undefined, { type: CREATE_SUCCESS_PROJECT, data: project })
        ).toEqual(updatedState)
    })

    describe.skip('should handle DELETE_SUCCESS_PROJECT', () => {

        it('should handle clear the current project if the project to be delete is the current project', () => {
            expect(
                ProjectReducer(undefined, { type: DELETE_SUCCESS_PROJECT, id: initialCurrentProject._id })
            ).toEqual({ ...initialState, loading: false, authenticated: true, projects: [], currentProject: "" })
        })

        it('should just delete the project if the project to be delete is not the current project', () => {
            const mockState = { ...initialState, loading: true, authenticated: false, projects: [project, initialCurrentProject] }
            expect(
                ProjectReducer(mockState, { type: DELETE_SUCCESS_PROJECT, id: project._id })
            ).toEqual({ ...initialState, loading: false, authenticated: true })
        })
    })

    it.skip('should handle APPEND_SUCCESS_PROJECTS', () => {
        const updatedState = { ...initialState, loading: false, authenticated: true, projects: [initialCurrentProject, project] }
        expect(
            ProjectReducer(undefined, { type: APPEND_SUCCESS_PROJECTS, data: [project] })
        ).toEqual(updatedState)
    })

    describe.skip('should handle UPDATE_SUCCESS_PROJECT', () => {
        it('should handle clear the current project if the project to be delete is the current project', () => {
            const updatedProject = { ...initialCurrentProject, name: "name updated" }
            const beforeState = { ...initialState, loading: false, authenticated: true }
            const afterState = { ...initialState, loading: false, authenticated: true, projects: [updatedProject] }
            expect(
                ProjectReducer(beforeState, { type: UPDATE_SUCCESS_PROJECT, data: updatedProject })
            ).toEqual(afterState)
        })

        it('should simply update the project if the project to be delete is NOT the current project', () => {
            const updatedProject = { ...project, name: "name updated" }
            const beforeState = { ...initialState, loading: false, authenticated: true, projects:[initialCurrentProject, project] }
            const afterState = { ...initialState, loading: false, authenticated: true, projects: [initialCurrentProject,updatedProject] }
            expect(
                ProjectReducer(beforeState, { type: UPDATE_SUCCESS_PROJECT, data: updatedProject })
            ).toEqual(afterState)
        })
    })

    describe.skip('should handle ERROR_PROJECT', () => {
        it('should handle clear the current project if the project to be delete is the current project', () => {
            const updatedState = { ...initialState, loading: false, authenticated: false, errorMessage: "err" }
            expect(
                ProjectReducer(undefined, { type: ERROR_PROJECT, data: "err" })
            ).toEqual(updatedState)
        })
    })
})