import StatusReducer from "../StatusReducer"
import {
    LOADING_STATUS, ERROR_STATUS, CREATE_SUCCESS_STATUS, DELETE_SUCCESS_STATUS,
    UPDATE_SUCCESS_STATUS, APPEND_SUCCESS_STATUS, REORDER_ISSUES, MOVE_ISSUES
} from "../../Actions/status.actions"


const initialUser = { _id: "testUserId", name: "userName", email: "test email" }
const status = new Map()
status.set("1", { _id: "1", name: "TO DO", issues: ["hdkahdjaskdh"] })
status.set("2", { _id: "2", name: "IN PROGRESS", issues: [] })
status.set("3", { _id: "3", name: "DONE", issues: [] })
status.set("4", { _id: "4", name: "TEST", issues: [] })


describe.skip('Status Reducer', () => {
    it.skip('should return the initial state', () => {
        expect(StatusReducer(undefined, {})).toEqual(
            {
                loading: false,
                authenticated: false,
                statusOrder: ["1", "2", "3", "4"],
                status: status,
                issues: []
            },
        )
    })

    it.skip('should handle LOADING_STATUS', () => {
        expect(
            StatusReducer(undefined, { type: LOADING_STATUS })
        ).toEqual(
            {
                loading: true,
                authenticated: false,
                statusOrder: ["1", "2", "3", "4"],
                status: status,
                issues: []
            }
        )
    })

    describe('should handle REORDER_ISSUES', () => {
        it("does not change the issue orders if the start index equals to the end index", () => {
            expect(
                StatusReducer(undefined, { type: REORDER_ISSUES, index: 0, startIndex: 0, endIndex: 0 })
            ).toEqual(
                {
                    loading: false,
                    authenticated: true,
                    statusOrder: ["1", "2", "3", "4"],
                    status: status,
                    issues: []
                }
            )
        })

        it("changes the issue orders if issues of a particular status have been moved", () => {
            expect(
                StatusReducer(undefined, { type: REORDER_ISSUES, index: 0, startIndex: 0, endIndex: 0 })
            ).toEqual(
                {
                    loading: false,
                    authenticated: true,
                    statusOrder: ["1", "2", "3", "4"],
                    status: status,
                    issues: []
                }
            )
        })
    })

    describe('should handle MOVE_ISSUES', () => {
        it("changes the an issue has been moved to a different status", () => {
            expect(
                StatusReducer(undefined, { type: MOVE_ISSUES, sourceIndex: 0, destinationIndex: 1, startIndex: 0, endIndex: 2 })
            ).toEqual(
                {
                    loading: false,
                    authenticated: true,
                    statusOrder: ["1", "2", "3", "4"],
                    status: status,
                    issues: []
                }
            )
        })
    })

    describe('should handle CREATE_SUCCESS_STATUS', () => {
        it("changes the an issue has been moved to a different status", () => {
            let updatedStatus = Object.assign({}, status)
            const newStatus = { _id: "test", name: "test name" }
            updatedStatus.set(newStatus._id, newStatus)
            expect(
                StatusReducer(undefined, { type: CREATE_SUCCESS_STATUS, data: newStatus })
            ).toEqual(
                {
                    loading: false,
                    authenticated: true,
                    statusOrder: ["1", "2", "3", "4"],
                    status: updatedStatus,
                    issues: []
                }
            )
        })
    })

    describe('should handle DELETE_SUCCESS_STATUS', () => {
        it("changes the an issue has been moved to a different status", () => {
            let updatedStatus = Object.assign({}, status)
            updatedStatus.delete("4")
            expect(
                StatusReducer(undefined, { type: DELETE_SUCCESS_STATUS, id: "4" })
            ).toEqual(
                {
                    loading: false,
                    authenticated: true,
                    statusOrder: ["1", "2", "3"],
                    status: updatedStatus,
                    issues: []
                }
            )
        })
    })

    describe('should handle UPDATE_SUCCESS_STATUS', () => {
        it("changes the an issue has been moved to a different status", () => {
            const newStatus = { _id: "4", name: "test name" }
            let updatedStatus = Object.assign({}, status)
            updatedStatus.delete("4")
            expect(
                StatusReducer(undefined, { type: UPDATE_SUCCESS_STATUS, data: newStatus })
            ).toEqual(
                {
                    loading: false,
                    authenticated: true,
                    statusOrder: ["1", "2", "3"],
                    status: updatedStatus,
                    issues: []
                }
            )
        })
    })

    describe('should handle ERROR_STATUS', () => {
        it("changes the an issue has been moved to a different status", () => {
            expect(
                StatusReducer(undefined, { type: ERROR_STATUS })
            ).toEqual(
                {
                    loading: false,
                    authenticated: false,
                    statusOrder: ["1", "2", "3", "4"],
                    status: status,
                    issues: []
                }
            )
        })
    })

    


})

