import {
    createSuccessfulLabel, appendSuccessfulLabels, deleteSuccessfulLabel, dispatchError
} from "../label.actions"

describe.skip("createSuccessfulLabel(data)", () => {
    it("Creates an action", () => {
        const result = createSuccessfulLabel(data)
        expect(result).toEqual({
            type: "CREATE_SUCCESS_LABEL",
            data: data
        })
    })
})

describe.skip("appendSuccessfulLabels(data)", () => {
    it("Creates an action", () => {
        const result = appendSuccessfulLabels(data)
        expect(result).toEqual({
            type: "APPEND_SUCCESS_LABELS",
            data: data
        })
    })
})

describe.skip("deleteSuccessfulLabel(data)", () => {
    it("Creates an action", () => {
        const result = deleteSuccessfulLabel(data)
        expect(result).toEqual({
            type: "DELETE_SUCCESS_LABEL",
            data: data
        })
    })
})

describe.skip("dispatchError(data)", () => {
    it("Creates an action", () => {
        const result = dispatchError(data)
        expect(result).toEqual({
            type: ERROR_LABEL,
            data: data
        })
    })
})
