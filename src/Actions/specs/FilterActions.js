import { filterByEpic, filterByLabel, filterByAssignee, groupBy, cleanFilter } from "../Filter.actions"

const data = "test data"

describe.skip("filterByEpic(data)", () => {
    it("Creates an action", () => {
        const result = filterByEpic(data)
        expect(result).toEqual({
            type: "FILTER_BY_EPIC",
            data: data
        })
    })
})

describe.skip("filterByLabel(data)", () => {
    it("Creates an action", () => {
        const result = filterByLabel(data)
        expect(result).toEqual({
            type: "FILTER_BY_LABEL",
            data: data
        })
    })
})

describe.skip("filterByAssignee(data)", () => {
    it("Creates an action", () => {
        const result = filterByAssignee(data)
        expect(result).toEqual({
            type: "FILTER_BY_ASSIGNEE",
            data: data
        })
    })
})

describe.skip("groupBy(data)", () => {
    it("Creates an action", () => {
        const result = groupBy(data)
        expect(result).toEqual({
            type: "GROUP_BY",
            data: data
        })
    })
})

describe.skip("cleanFilter()", () => {
    it("Creates an action", () => {
        const result = cleanFilter()
        expect(result).toEqual({
            type: "CLEAN_FILTER",
        })
    })
})