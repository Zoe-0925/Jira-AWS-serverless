import React, { useState } from "react";
import { MyDraggable, MyDroppable } from "./DraggableAndDroppable";
import Column from "../StatusColumn/Column"
import { v4 as uuidv4 } from 'uuid'
import IssueCardHOC from "../IssueCard/IssueCardHOC";
import { findItemById } from "../Util"
import IssueDetailDialog from "../Dialog/UpdateIssueDIalog"

const DragAndDrop = ({ status, filteredTasks }) => {
    const [isIssueDetailOpen, setOpen] = useState(false)
    const [currentIssue, setIssue] = useState()
  
    const openIssueDetail = issue => {
        setOpen(true)
        setIssue(issue)
    }

    console.log("filteredTasks", filteredTasks)
    console.log("status", status)

    return (
        <>
            <div className="column-list">
                {status.map((el, ind) =>
                    <MyDroppable key={ind} el={el} ind={ind}>
                        <Column key={uuidv4()} status={el}>
                            {el.issues.map((issueId, index) =>
                                <MyDraggable key={uuidv4()} id={issueId} index={index}>
                                    <IssueCardHOC key={uuidv4()} issue={findItemById(filteredTasks, issueId)} handleClick={openIssueDetail} />
                                </MyDraggable>
                            )}
                        </Column>
                    </MyDroppable>
                )}
            </div>
            {isIssueDetailOpen && <IssueDetailDialog currentIssue={currentIssue} handleClose={() => setOpen(false)} open={isIssueDetailOpen}
            />}
        </>
    )
}

export default DragAndDrop
