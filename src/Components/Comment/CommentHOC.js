import React, { useState, useEffect } from 'react'
//import { useSelector } from "react-redux"
import Pusher from 'pusher-js';
import CommentBox from "./CommentBox"
//import { selectCommentByIssue } from "../../Reducers/Selectors"

require('dotenv').config()  //Enable access to the ".env" file

export default function CommentHOC({ issueId }) {
    const [comments, setState] = useState([])

    //    const data = useSelector(selectCommentByIssue)

    useEffect(() => {
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

    return (
        <CommentBox comments={comments} />
    )
}
