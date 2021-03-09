import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { useDotIconMenu } from "../Hooks/Hooks"
import { chainDeleteIssue, updateTaskAttribute } from "../../Actions/issue.actions"
import IssueCard from "./IssueCard"
import { selectUserAvatarById } from "../../Reducers/Selectors"

const IssueCardHOC = ({ issue, handleClick }) => {

    console.log("issue in HOC", issue)

    const dispatch = useDispatch()
    // eslint-disable-next-line
    const { anchorEl, isOpen, anchorRef, handleMenuClose, handleMenuOpen } = useDotIconMenu()

    const avatar = useSelector(selectUserAvatarById(issue ? issue.assignee : ""))

    const handleDeleteIssue = (e, id, status) => {
        e.preventDefault()
        dispatch(chainDeleteIssue(id, status, "task", issue.updatedAt))  //TODO update
        handleMenuClose()
    }

    const toggleFlag = () => {
        dispatch(updateTaskAttribute({ _id: issue._id, attribute: "flag", value: !issue.flag }))
    }

    return (!issue ? <div></div> : (
        <>
            <IssueCard issue={{ ...issue, assigneeAvatar: avatar }} handleDeleteIssue={handleDeleteIssue} handleClick={handleClick}
                isOpen={isOpen} anchorRef={anchorRef} handleMenuOpen={handleMenuOpen}
                handleMenuClose={handleMenuClose} toggleFlag={toggleFlag}
            />
        </>))
}

export default IssueCardHOC