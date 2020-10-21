import {
    createSuccessfulProject, appendSuccessfulProject, appendCurrentProject, updateSuccessfulProject,
    deleteSuccessfulProject, dispatchError
} from "../project.actions"

const data = {}
const id = "test id"

describe.skip("createSuccessfulProject(data)", () => {
    it("Creates an action", () => {
        const result = createSuccessfulProject(data)
        expect(result).toEqual({
            type: "CREATE_SUCCESS_PROJECT",
            data: data
        })
    })
})

describe.skip("appendSuccessfulProject(data)", () => {
    it("Creates an action", () => {
        const result = createSuccessfulProject(data)
        expect(result).toEqual({
            type: "APPEND_SUCCESS_PROJECTS",
            data: data //an array
        })
    })
})

describe.skip("updateSuccessfulProject(data)", () => {
    it("Creates an action", () => {
        const result = updateSuccessfulProject(data)
        expect(result).toEqual({
            type: "UPDATE_SUCCESS_PROJECT",
            data: data
        })
    })
})

describe.skip("deleteSuccessfulProject(id)", () => {
    it("Creates an action", () => {
        const result = deleteSuccessfulProject(id)
        expect(result).toEqual({
            type: "UPDATE_SUCCESS_PROJECT",
            id: id
        })
    })
})

describe.skip("dispatchError(data)", () => {
    it("Creates an action", () => {
        const result = dispatchError(data)
        expect(result).toEqual({
            type: "ERROR_PROJECT",
            data: data
        })
    })
})