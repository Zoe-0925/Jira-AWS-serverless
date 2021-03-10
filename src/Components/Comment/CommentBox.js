import React, { Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { createComment } from "../../actions/comment.actions"
import { selectCommentByIssue, selectCurrentUser, selectUsers } from "../../reducers/selectors"
import { findItemById } from "../util"
import CommentInput from "./input"
import { Row, Col } from "reactstrap"
import Avatar from '@material-ui/core/Avatar';
import { v4 as uuidv4 } from 'uuid'

export const CommentContent = ({ comment, authors }) => {
    const author = findItemById(authors, comment.user)
    const src = author.avatar || ""

    return (
        <>
            <Row key={uuidv4()}>
                <Col xs={2}>
                    <Avatar className="avatar" alt="Author" src={src} />
                </Col>
                <Col xs="auto">
                    <p className="label">{author.name}</p>
                </Col>
                <Col xs="auto">
                    <p className="label">{comment.createdAt}</p>
                </Col>
            </Row>
            <Row key={uuidv4()}>
                <Col xs={2}>
                </Col>
                <Col xs={10}>
                    <p className="comment"> {comment.description}</p>
                </Col>
            </Row>
            <Row key={uuidv4()}>
            </Row>
        </>
    )
}

export default function CommentHOC({ issueId }) {
    const dispatch = useDispatch()
    const comments = useSelector(selectCommentByIssue(issueId))
    const users = useSelector(selectUsers)
    const authors = comments.map(each => each.user).map(each => findItemById(users, each))
    const currentUser = useSelector(selectCurrentUser)

    const handleSubmit = (value) => {
        dispatch(createComment({ user: currentUser._id, description: value, issue: issueId }))
    }

    return (
        <Fragment>
            <CommentInput currentUser={currentUser} handleSubmit={handleSubmit} />
            {
                comments && comments.length > 0 &&
                comments.map(each => <CommentContent key={each._id} comment={each} authors={authors} />)
            }
        </Fragment>)
}

