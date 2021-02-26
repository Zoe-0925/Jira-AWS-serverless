import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { useDotIconMenu } from "../Hooks/Hooks"
import { chainDeleteIssue, updateIssueAttribute } from "../../Actions/issue.actions"
import IssueCard from "./IssueCard"

const IssueCardHOC = ({ issue, handleClick }) => {
    const dispatch = useDispatch()
    // eslint-disable-next-line
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

    return (!issue ? <div></div> : (
        <>
            <IssueCard issue={issue} handleDeleteIssue={handleDeleteIssue} handleClick={handleClick}
                isOpen={isOpen} anchorRef={anchorRef} handleMenuOpen={handleMenuOpen}
                handleMenuClose={handleMenuClose} toggleFlag={toggleFlag} reorderToBotttom={reorderToBotttom}
            />
        </>))
}

export default IssueCardHOC