import React from "react";
import { useSelector } from "react-redux"
import { MyDraggable, MyDroppable } from "./DraggableAndDroppable";
import CreateStatusTab from "../StatusColumn/CreateStatusTab"
import Column from "../StatusColumn/Column"
import { v4 as uuidv4 } from 'uuid'
import IssueCardHOC from "../IssueCard/IssueCardHOC";
import { selectStatusWithIssue } from "../../Reducers/Selectors"

const DragAndDrop = () => {
    let columns = useSelector(selectStatusWithIssue)

    return (
        <div className="epic-list">
            {columns.map((el, ind) => <MyDroppable key={ind} el={el} ind={ind}>
                <Column key={uuidv4()} status={el}>
                    {el.issues.map((issue, index) => {
                        issue ? <MyDraggable key={uuidv4()} id={issue._id} index={index}>
                            <IssueCardHOC key={uuidv4()} issue={issue} />
                        </MyDraggable> : <div></div>
                    }
                    )}
                </Column>
            </MyDroppable>
            )}
            <CreateStatusTab />
        </div>
    )
}

export default DragAndDrop
