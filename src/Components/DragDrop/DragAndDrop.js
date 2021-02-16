import React from "react";
import { useSelector } from "react-redux"
import { MyDraggable, MyDroppable } from "./DraggableAndDroppable";
import CreateStatusTab from "../StatusColumn/CreateStatusTab"
import Column from "../StatusColumn/Column"
import Skeleton from '@material-ui/lab/Skeleton';
import { v4 as uuidv4 } from 'uuid'
import IssueCard from "../IssueCard/IssueCard";
import { selectAllStatusInArrayWithIssues, selectLoading } from "../../Reducers/Selectors"

const DragAndDrop = () => {
    const columns = useSelector(selectAllStatusInArrayWithIssues) //TODO undefined
    const loading = useSelector(selectLoading)

console.log("columns", columns)

    return (
        <div className="epic-list">
            {columns && typeof columns==="object" &&  columns.map((el, ind) => {
                if (!loading) {
                    console.log("columns", columns)
                    return <MyDroppable key={ind} el={el} ind={ind}>
                        <Column key={uuidv4()} initialStatus={el}>
                            {el && el.issues && el.issues.map((issueId, index) => <MyDraggable key={uuidv4()} id={issueId} index={index}>
                                <IssueCard key={uuidv4()} issueId={issueId} />
                            </MyDraggable>)}
                        </Column>
                    </MyDroppable>
                }
                return <Skeleton key={uuidv4()} variant="rect" animation="wave" width={230} height={240} style={{ marginRight: "1rem" }} />
            })}
            <CreateStatusTab />
        </div>
    )
}

export default DragAndDrop