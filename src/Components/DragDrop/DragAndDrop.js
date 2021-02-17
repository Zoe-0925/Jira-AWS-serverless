import React from "react";
import { useSelector } from "react-redux"
import { MyDraggable, MyDroppable } from "./DraggableAndDroppable";
import CreateStatusTab from "../StatusColumn/CreateStatusTab"
import Column from "../StatusColumn/Column"
import Skeleton from '@material-ui/lab/Skeleton';
import { v4 as uuidv4 } from 'uuid'
import IssueCard from "../IssueCard/IssueCard";
import { selectStatusWithIssue, selectLoading } from "../../Reducers/Selectors"

const DragAndDrop = () => {
    let columns = useSelector(selectStatusWithIssue)
    const loading = useSelector(selectLoading)

    console.log("columns", columns, "loading", loading)

    return (
        <div className="epic-list">
            {columns && columns.map((el, ind) => {
                (!loading && el) ? <MyDroppable key={ind} el={el} ind={ind}>
                    <Column key={uuidv4()} status={el}>
                        {el && el.issues && el.issues.map((issue, index) => <MyDraggable key={uuidv4()} id={issue._id} index={index}>
                            <IssueCard key={uuidv4()} issue={issue} />
                        </MyDraggable>)}
                    </Column>
                </MyDroppable> : <Skeleton key={uuidv4()} variant="rect" animation="wave" width={230} height={240} style={{ marginRight: "1rem" }} />
            })}
            <CreateStatusTab />
        </div>
    )
}

export default DragAndDrop
