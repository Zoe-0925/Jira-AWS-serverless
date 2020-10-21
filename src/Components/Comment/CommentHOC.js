import React, { useState, useEffect } from 'react'
import Pusher from 'pusher-js';
import CommentBox from "./CommentBox"
require('dotenv').config()  //Enable access to the ".env" file

export default function CommentHOC() {
    const [comments, setState] = useState([])

    const data = []
    // TODO
    //useSelect()
    // Select comments from the store

    useEffect(() => {
       const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY||"", {
            cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER||"",
            encrypted: true,
        });

        const channel = pusher.subscribe('comments');


        channel.bind('new-comment', data => {
            setState(prevState => {
                const { commentList } = prevState;
                commentList.push(data.comment);
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
