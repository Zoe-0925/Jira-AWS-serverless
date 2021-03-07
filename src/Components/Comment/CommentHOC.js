import React from 'react'
import { useSelector } from "react-redux"
//import Pusher from 'pusher-js';
import CommentBox from "./CommentBox"
import { selectCommentByIssue, selectUsers } from "../../reducers/selectors"
import { findItemById } from "../Util"

require('dotenv').config()  //Enable access to the ".env" file

export default function CommentHOC({ issueId }) {
    const comments = useSelector(selectCommentByIssue(issueId))
    const users = useSelector(selectUsers)
    const authors= comments.map(each => each.user).map(each => findItemById(users, each))

    return (
        <CommentBox comments={comments} authors={authors} />
    )
}

/**
 *
 *  useEffect(() => {
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY || "", {
            cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER || "",
            encrypted: true,
        });

        const channel = pusher.subscribe('comments');

        channel.bind('new-comment', data => {
            setState(prevState => {
                const { commentList } = prevState;
                commentList.push(data.comment);
                //TODO
                //save the commentList to the store and DB


                //TODO
                //check if data.comment is correct

                return {
                    commentList,
                };
            });
        })

    }, [])
 */