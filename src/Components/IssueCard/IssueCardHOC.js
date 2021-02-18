import React from "react";
import { useDispatch } from "react-redux"
import { useDotIconMenu } from "../Shared/CustomHooks"
import { chainDeleteIssue, updateIssueAttribute } from "../../Actions/issue.actions"
import IssueCard from "./IssueCard"

const IssueCardHOC = ({ issue }) => {
    const dispatch = useDispatch()

    const { anchorEl, isOpen, anchorRef, handleMenuClose, handleMenuOpen } = useDotIconMenu()

    const reorderToBotttom = (e, id, status) => {
        e.preventDefault()

        //TODO
        //reorder to bottom


        handleMenuClose()
    }

    const handleDeleteIssue = (e, id, status) => {
        e.preventDefault()
        dispatch(chainDeleteIssue(id, status, "task", issue.updatedAt))  //TODO update
        handleMenuClose()
    }

    const toggleFlag = () => {
        dispatch(updateIssueAttribute({ _id: issue._id, attribute: "flag", value: !issue.flag }))
    }

    return (!issue ? <div></div> : <IssueCard issue={issue} handleDeleteIssue={handleDeleteIssue} anchorEl={anchorEl}
        isOpen={isOpen} anchorRef={anchorRef} handleMenuOpen={handleMenuOpen} issue={issue}
        handleMenuClose={handleMenuClose} toggleFlag={toggleFlag} reorderToBotttom={reorderToBotttom}
    />)
}

export default IssueCardHOC