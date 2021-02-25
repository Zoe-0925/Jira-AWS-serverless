import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { MyDraggable, MyDroppable } from "./DraggableAndDroppable";
import CreateStatusTab from "../StatusColumn/CreateStatusTab"
import Column from "../StatusColumn/Column"
import { v4 as uuidv4 } from 'uuid'
import IssueCardHOC from "../IssueCard/IssueCardHOC";
import { selectStatusWithIssue } from "../../Reducers/Selectors"
import Filters from "../Filters/Filters"
import UpdateIssueDialog from "../Forms/UpdateIssueDialog"


const statusData = [{ _id: "9729f490-fd5f-43ab-8efb-40e8d132bc68", issues: ["issueId1", "issueId2"], name: "TO DO", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" },
{ _id: "efe83b13-9255-4339-a8f5-d5703beb9ffc", issues: [], name: "IN PROGRESS", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" },
{ _id: "439c3d96-30eb-497d-b336-228873048bc3", issues: [], name: "TESTING", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" },
{ _id: "f3a0e59f-635a-4b75-826f-b0f5bf24b5c4", issues: [], name: "DONE", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" }]

const taskData = [{
    _id: "issueId1", summary: "Code feature A", description: "Coding...", updatedAt: "", createdAt: "", issueType: "task",
    labels: [], parent: "", status: "9729f490-fd5f-43ab-8efb-40e8d132bc68", project: "7c1f9838-dbd7-4432-b52c-aae87022d578"
},
{
    _id: "issueId2", summary: "Code feature B", description: "Coding...", updatedAt: "", createdAt: "", issueType: "task",
    labels: [], parent: "", status: "9729f490-fd5f-43ab-8efb-40e8d132bc68", project: "7c1f9838-dbd7-4432-b52c-aae87022d578"
}]

const findItemById = (list = [], id = "") => {
    return list.find(item => item._id === id)
}

const DragAndDrop = () => {
    // let columns = useSelector(selectStatusWithIssue)
    const [filteredColumns, setFilter] = useState([])
    const [isIssueDetailOpen, setOpen] = useState(false)
    const [currentIssue, setIssue] = useState()

    useEffect(() => {
        setFilter(statusData)
    }, [statusData])

    const openIssueDetail = issue => {
        setOpen(true)
        setIssue(issue)
    }

    return (
        <>
            <Filters />
            <div className="epic-list">
                {filteredColumns.length > 0 && filteredColumns.map((el, ind) =>
                    <MyDroppable key={ind} el={el} ind={ind}>
                        <Column key={uuidv4()} status={el}>
                            {el.issues.map((issueId, index) => 
                                 <MyDraggable key={uuidv4()} id={issueId} index={index}>
                                    <IssueCardHOC key={uuidv4()} issue={findItemById(taskData, issueId)} handleClick={openIssueDetail} />
                                </MyDraggable>
                            )}
                        </Column>
                    </MyDroppable>
                )}
                <CreateStatusTab />
            </div>
            {isIssueDetailOpen && <UpdateIssueDialog open={isIssueDetailOpen} handleClose={() => setOpen(false)} issue={currentIssue} />}
        </>
    )
}

export default DragAndDrop
