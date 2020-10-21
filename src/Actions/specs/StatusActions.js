import {
    createSuccessfulStatus, updateSuccessfulStatus, deleteSuccessfulStatus, dispatchError,
  moveIssues, reorderIssues, reorderToBotttom
} from "../status.actions"

const data = {}
const id = "test id"
const issues = [{ _id: "test issue 1" }, { _id: "test issue 2" }]
const source = "test source"
const destination = "test destination"
const startIndex = 0
const endIndex = 1

describe.skip("createSuccessfulStatus(data)", () => {
    it("Creates an action", () => {
        const result = createSuccessfulStatus(data)
        expect(result).toEqual({
            type: "CREATE_SUCCESS_STATUS",
            data: data
        })
    })
})

describe.skip("updateSuccessfulStatus(data)", () => {
    it("Creates an action", () => {
        const result = updateSuccessfulStatus(data)
        expect(result).toEqual({
            type: "UPDATE_SUCCESS_STATUS",
            data: data
        })
    })
})

describe.skip("deleteSuccessfulStatus(id, issues)", () => {
    it("Creates an action", () => {
        const result = deleteSuccessfulStatus(id, issues)
        expect(result).toEqual({
            type: "DELETE_SUCCESS_STATUS",
            id: id,
            issues: issues //issue ids
        })
    })
})

describe.skip("dispatchError(data)", () => {
    it("Creates an action", () => {
        const result = dispatchError(data)
        expect(result).toEqual({
            type: "ERROR_STATUS",
            data: data
        })
    })
})


describe.skip("moveIssues(source, destination, startIndex, endIndex)", () => {
    it("Creates an action", () => {
        const result = moveIssues(source, destination, startIndex, endIndex)
        expect(result).toEqual({
            type: MOVE_ISSUES,
            sourceIndex: source,
            destinationIndex: destination,
            startIndex: startIndex,
            endIndex: endIndex
        })
    })
})

describe.skip("reorderIssues(source, startIndex, endIndex)", () => {
    it("Creates an action", () => {
        const result = reorderIssues(source, startIndex, endIndex)
        expect(result).toEqual({
            type: "REORDER_ISSUES",
            index: source,
            startIndex: startIndex,
            endIndex: endIndex
        })
    })
})

describe.skip("reorderToBotttom(source, startIndex)", () => {
    it("Creates an action", () => {
        const result = reorderToBotttom(source, startIndex)
        expect(result).toEqual({
            type: "REORDER_ISSUES",
            index: source,
            startIndex: startIndex,
            endIndex: -1
        })
    })
})