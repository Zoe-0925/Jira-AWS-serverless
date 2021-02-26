import React, { useState } from "react";
import { MyDraggable, MyDroppable } from "./DraggableAndDroppable";
import CreateStatusTab from "../StatusColumn/CreateStatusTab"
import Column from "../StatusColumn/Column"
import { v4 as uuidv4 } from 'uuid'
import IssueCardHOC from "../IssueCard/IssueCardHOC";
import IssueUpdateSkeleton from "../Forms/IssueUpdateSkeleton"
import IssueDetailForm from "../Forms/UpdateIssueForm"
import { MyDialog } from "../Dialog/Dialog"
import { searchBySummary, findItemById } from "../Util"

const DragAndDrop = ({ status, filteredTasks }) => {
    const [isIssueDetailOpen, setOpen] = useState(false)
    const [currentIssue, setIssue] = useState()

    const openIssueDetail = issue => {
        setOpen(true)
        setIssue(issue)
    }

    const issueDetail = (
        <MyDialog open={isIssueDetailOpen} handleClose={() => setOpen(false)} maxWidth={false} fullWidth={true}>
            {!currentIssue ? <IssueUpdateSkeleton handleClose={() => setOpen(false)} />
                : <IssueDetailForm issue={currentIssue} handleClose={() => setOpen(false)} />}
        </MyDialog>
    )

    return (
        <>
            <div className="epic-list">
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
                <CreateStatusTab />
            </div>
            {isIssueDetailOpen && issueDetail}
        </>
    )
}

export default DragAndDrop
