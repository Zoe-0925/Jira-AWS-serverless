import React, { Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { createComment } from "../../Actions/comment.actions"
import { selectCommentByIssue, selectCurrentUser, selectUsers } from "../../Reducers/Selectors"
import { findItemById } from "../Util"
import CommentInput from "./CommentInput"
import { Row, Col } from "reactstrap"
import Avatar from '@material-ui/core/Avatar';

export default function CommentHOC({ issueId }) {
    const dispatch = useDispatch()
    const comments = useSelector(selectCommentByIssue(issueId))
    const users = useSelector(selectUsers)
    const authors = comments.map(each => each.user).map(each => findItemById(users, each))
    const currentUser = useSelector(selectCurrentUser)

    const handleSubmit = (value) => {
        dispatch(createComment({ user: currentUser._id, description: value, issue: issueId }))
    }

    const CommentContent = ({ comment }) => {
        const src = findItemById(authors, comment.user).avatar || ""

        return comment ? (
            <Row key={comment._id}>
                <Col xs={2}>
                    <Avatar className="avatar" alt="Author" src={src} />
                </Col>
                <Col xs={10}>
                    <p> {comment.description}</p>
                </Col>
            </Row>
        ) : <div></div>
    }

    return (
        <Fragment>
            {
                comments && comments.length > 0 &&
                comments.map(each => <CommentContent key={comments._id} comment={each} />)
            }
            <CommentInput currentUser={currentUser} handleSubmit={handleSubmit} />
        </Fragment>)
}