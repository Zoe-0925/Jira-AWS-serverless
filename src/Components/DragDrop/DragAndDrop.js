import React from "react";
import { useSelector } from "react-redux"
import { MyDraggable, MyDroppable } from "./DraggableAndDroppable";
import CreateStatusTab from "../StatusColumn/CreateStatusTab"
import Column from "../StatusColumn/Column"
import { v4 as uuidv4 } from 'uuid'
import IssueCardHOC from "../IssueCard/IssueCardHOC";
import { selectStatusWithIssue, selectLoading } from "../../Reducers/Selectors"

const DragAndDrop = () => {
    let columns = useSelector(selectStatusWithIssue)
    const loading = useSelector(selectLoading)

    return (
        <div className="epic-list">
            {columns.map((el, ind) => <MyDroppable key={ind} el={el} ind={ind}>
                <Column key={uuidv4()} status={el}>
                    {el.issues.map((issue, index) => <MyDraggable key={uuidv4()} id={issue._id} index={index}>
                        <IssueCardHOC key={uuidv4()} issue={issue} />
                    </MyDraggable>
                    )}
                </Column>
            </MyDroppable>
            )}
            <CreateStatusTab />
        </div>
    )
}

export default DragAndDrop
