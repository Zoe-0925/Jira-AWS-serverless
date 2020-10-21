import {
    CREATE_SUCCESS_LABEL,
    DELETE_SUCCESS_LABEL,
    APPEND_SUCCESS_LABELS,
    LOADING_LABEL,
    ERROR_LABEL
} from "../../Actions/label.actions"
import LabelReducer from "../LabelReducer"

const initialState = {
    loading: false,
    authenticated: false,
    errorMessage: "",
    labels: [{ _id: "xxx", name: "test label1" }]
}

describe('Label Reducer', () => {
    it.skip('should return the initial state', () => {
        expect(LabelReducer(undefined, {})).toEqual(initialState)
    })

    it.skip('should handle LOADING_LABEL', () => {
        const updatedState = { ...initialState, loading: true, authenticated: false }
        expect(
            LabelReducer(undefined, { type: LOADING_LABEL })
        ).toEqual(updatedState)
    })

    it.skip('should handle CREATE_SUCCESS_LABEL', () => {
        const updatedState = { ...initialState, loading: false, authenticated: true, labels: ["test label1", "test label"] }
        expect(
            LabelReducer(undefined, { type: CREATE_SUCCESS_LABEL, data: "test label" })
        ).toEqual(updatedState)
    })

    it.skip('should handle DELETE_SUCCESS_LABEL', () => {
        const updatedState = { ...initialState, loading: false, authenticated: true, labels: [] }
        expect(
            LabelReducer(undefined, { type: DELETE_SUCCESS_LABEL, id: "xxx" })
        ).toEqual(updatedState)
    })

    it.skip('should handle APPEND_SUCCESS_LABELS', () => {
        const updatedState = {
            ...initialState, loading: false, authenticated: true,
            labels: [{ _id: "xxx", name: "test label1" }, { _id: "1", name: "xxx" }, { _id: "2", name: "xxx2" }]
        }
        expect(
            LabelReducer(undefined, { type: APPEND_SUCCESS_LABELS, data: [{ _id: "1", name: "xxx" }, { _id: "2", name: "xxx2" }] })
        ).toEqual(updatedState)
    })

    it.skip('should handle ERROR_LABEL', () => {
        expect(
            LabelReducer(undefined, { type: ERROR_LABEL, data: "err" })
        ).toEqual({ ...initialState, loading: false, authenticated: false, errorMessage: "err" })
    })
})