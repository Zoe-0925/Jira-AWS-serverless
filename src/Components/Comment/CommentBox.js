import React from 'react'
import CommentInput from "./CommentInput"
import { ListItem, ListItemText, Divider } from '@material-ui/core';
import { Row } from "reactstrap"


export default function CommentBox({ comments }) {

    const CommentContent = comment => <div className="CommentContent">
        <ListItem>
            <ListItemText
                primary={
                    <React.Fragment>
                        <Row className="primary">
                            <p className="author"> {comment.author}  </p>
                            <p className="date">{comment.date}</p>
                        </Row>
                    </React.Fragment>
                }
                secondary={comment.description}
            />
        </ListItem>
        <Divider />
    </div>

    return (
        <div className="CommentBox">
            <p className="title">Comments</p>
            {
                comments && comments.length > 0 &&
                <div className="CommentList">
                    {comments.map(each => <CommentContent comment={each} />)}
                </div>
            }
            <CommentInput />
        </div>)
}
