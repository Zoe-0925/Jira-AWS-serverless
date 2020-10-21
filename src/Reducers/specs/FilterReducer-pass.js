import {
    FILTER_BY_EPIC, FILTER_BY_LABEL, FILTER_BY_ASSIGNEE, CLEAN_FILTER, GROUP_BY
} from "../../Actions/Filter.actions"
import FilterReducer from "../FilterReducer"

const initialState = {
    none: true,
    epicFilter: "",
    labelFilter: "",
    assigneeFilter: "",
    groupBy: ""
}

describe('Filter Reducer', () => {
    it.skip('should return the initial state', () => {
        expect(FilterReducer(undefined, {})).toEqual(initialState)
    })

    it.skip('should handle FILTER_BY_EPIC', () => {
        expect(FilterReducer(undefined, { type: FILTER_BY_EPIC, data: "epic" })).toEqual(
            { ...initialState, epicFilter: "epic", none: false })
    })


    it.skip('should handle FILTER_BY_LABEL', () => {
        expect(FilterReducer(undefined, { type: FILTER_BY_LABEL, data: "label" })).toEqual(
            { ...initialState, labelFilter: "label", none: false })
    })

    it.skip('should handle FILTER_BY_ASSIGNEE', () => {
        expect(FilterReducer(undefined, { type: FILTER_BY_ASSIGNEE, data: "assignee" })).toEqual(
            { ...initialState, assigneeFilter: "assignee", none: false })
    })

    it.skip('should handle GROUP_BY', () => {
        expect(FilterReducer(undefined, { type: GROUP_BY, data: "groupby" })).toEqual(
            { ...initialState, groupBy: "groupby" })
    })

    it.skip('should handle CLEAN_FILTER', () => {
        expect(FilterReducer(undefined, { type: CLEAN_FILTER })).toEqual(initialState)
    })
})