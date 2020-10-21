import {
    appendSuccessfulComments, createSuccessfulComment, deleteSuccessfulComment,
    updateSuccessfulComment, dispatchError, getCommentsForIssue, 
    fetchCreateComment
} from "../comment.actions"
import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'
import axios from 'axios';
import Util from "../../Components/Util"


jest.mock('axios');

const data = {

}
const id = "test id"

describe.skip("appendSuccessfulComments(data)", () => {
    it("Creates an action", () => {
        const result = appendSuccessfulComments(data)
        expect(result).toEqual({
            type: "APPEND_SUCCESS_COMMENTS",
            data: data
        })
    })
})

describe.skip("createSuccessfulComment(data)", () => {
    it("Creates an action", () => {
        const result = createSuccessfulComment(data)
        expect(result).toEqual({
            type: "CREATE_SUCCESS_COMMENT",
            data: data
        })
    })
})

describe.skip("deleteSuccessfulComment(id)", () => {
    it("Creates an action", () => {
        const result = deleteSuccessfulComment(id)
        expect(result).toEqual({
            type: "DELETE_SUCCESS_COMMENT",
            id: id
        })
    })
})

describe.skip("updateSuccessfulComment(data)", () => {
    it("Creates an action", () => {
        const result = updateSuccessfulComment(id)
        expect(result).toEqual({
            type: "UPDATE_SUCCESS_COMMENT",
            data: data
        })
    })
})


describe.skip("dispatchError()", () => {
    it("Creates an action", () => {
        const result = dispatchError()
        expect(result).toEqual({
            type: "ERROR_COMMENT"
        })
    })
})

/******************** Thunks  ********************************/
describe('fetchCreateComment', () => {
    it('fetches data successfully from an API', async () => {
        const data = [
            {
                _id: "1",
                author: "author1",
                description: "comment 1",
                date: new Date(),
                issue: "issue1",
                parent: ""
            },
            {
                _id: "2",
                author: "author2",
                description: "comment 2",
                date: new Date(),
                issue: "issue2",
                parent: ""
            }
        ]
        const post = jest.spyOn(Util, "post");

        post.mockImplementationOnce(() => Promise.resolve(data));
        await expect(fetchCreateComment(process.env.BASE, data, "test token")).resolves.toEqual(data);
    });

});

