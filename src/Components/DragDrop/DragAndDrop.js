import React from "react";
import { useSelector } from "react-redux"
import { MyDraggable, MyDroppable } from "./DraggableAndDroppable";
import StatusCreate from "./StatusCreateTab"
import Column from "./Column"
import Skeleton from '@material-ui/lab/Skeleton';
import { v4 as uuidv4 } from 'uuid'
import IssueCardContainer from "../Issues/IssueCard";
import { selectAllStatusInArrayWithIssues, selectLoading } from "../../Reducers/Selectors"

const DragAndDrop = () => {
    const columns = useSelector(selectAllStatusInArrayWithIssues)
    const loading = useSelector(selectLoading)

    return (
        <div className="epic-list">
            {columns && columns.map((el, ind) => {
                if (!loading) {
                    return <MyDroppable key={ind} el={el} ind={ind}>
                        <Column initialStatus={el}>
                            {el && el.issues.map((issueId, index) => <MyDraggable id={issueId} index={index}>
                                <IssueCardContainer key={uuidv4()} issueId={issueId} />
                            </MyDraggable>)}
                        </Column>
                    </MyDroppable>
                }
                return <Skeleton key={uuidv4()} variant="rect" animation="wave" width={230} height={240} style={{ marginRight: "1rem" }} />
            }) }
            <StatusCreate />
        </div>
    )
}

export default DragAndDrop