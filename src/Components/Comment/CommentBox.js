import React, { Fragment } from 'react'
import CommentInput from "./CommentInput"
import { Row, Col } from "reactstrap"
import { findItemById } from "../Util"
import { Tooltip, Avatar ,Button , Divider} from '@material-ui/core';

export default function CommentBox({ comments, authors }) {

    const CommentContent = comment => (
        <Row>
            <Col xs={1}>
                <Avatar className="avatar" alt={comment.user || "Author"} src={() => findItemById(authors, comment.user).avatar} />
            </Col>
            <Col xs={11}></Col>
        </Row>
    )

    return (
        <Fragment>
            <p className="title">Comments</p>
            {
                comments && comments.length > 0 &&
                <div className="CommentList">
                    {comments.map(each => <CommentContent comment={each} />)}
                </div>
            }
            <CommentInput />
        </Fragment>)
}
