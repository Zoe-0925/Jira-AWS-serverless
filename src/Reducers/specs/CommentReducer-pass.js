import {
    CREATE_SUCCESS_COMMENT,
    DELETE_SUCCESS_COMMENT,
    APPEND_SUCCESS_COMMENTS,
    UPDATE_SUCCESS_COMMENT,
    LOADING_COMMENT,
    ERROR_COMMENT
} from "../../Actions/comment.actions"
import CommentReducer from "../CommentReducer"

const initialState = {
    loading: false,
    authenticated: false,
    comments: [],
    errorMessage: ""
}
const newComment = {
    _id: "test id", author: "test user id", description: "test description",
    date: "", issue: "test issue id", parent: ""
}

describe('Comment Reducer', () => {
    it.skip('should return the initial state', () => {
        expect(CommentReducer(undefined, {})).toEqual(initialState)
    })

    it.skip('should handle LOADING_COMMENT', () => {
        expect(
            CommentReducer(undefined, { type: LOADING_COMMENT })
        ).toEqual({ ...initialState, loading: true })
    })

    it.skip('should handle CREATE_SUCCESS_COMMENT', () => {
        expect(
            CommentReducer(undefined, { type: CREATE_SUCCESS_COMMENT, data: newComment })
        ).toEqual({ ...initialState, loading: false, authenticated: true, comments: [newComment] })
    })

    it.skip('should handle DELETE_SUCCESS_COMMENT', () => {
        expect(
            CommentReducer({ ...initialState, loading: true, authenticated: false, comments: [newComment] },
                { type: DELETE_SUCCESS_COMMENT, id: newComment._id })
        ).toEqual({ ...initialState, loading: false, authenticated: true, comments: [] })
    })

    it.skip('should handle APPEND_SUCCESS_COMMENTS', () => {
        expect(CommentReducer(undefined, { type: APPEND_SUCCESS_COMMENTS, data: [newComment] })
        ).toEqual({ ...initialState, loading: false, authenticated: true, comments: [newComment] })
    })

    it.skip('should handle UPDATE_SUCCESS_COMMENT', () => {
        const updatedComment = { ...newComment, description: "updated" }
        expect(CommentReducer({ ...initialState, loading: true, authenticated: false, comments: [newComment] },
             { type: UPDATE_SUCCESS_COMMENT, data: updatedComment }
        )).toEqual({ ...initialState, loading: false, authenticated: true, comments: [updatedComment] })
    })

    it.skip('should handle ERROR_COMMENT', () => {
        expect(CommentReducer(undefined, { type: ERROR_COMMENT, data: "err" }
        )).toEqual({ ...initialState, authenticated: false, errorMessage: "err" })
    })
})
