import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import Drawer from "../Components/SideDrawer/Drawer"
import ProjectDetailForm from "../Components/Project/ProjectDetail"
import { ProjectSetting } from "../Components/SideDrawer/DrawerInner"
import NavBar from "../Components/NavBar/NavBar"
import { updateProjectNameAndAssignee, deleteProject } from "../Actions/project.actions"

export default function ProjectDetail() {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch()

    return <div className={open ? "main drawer-close" : "main drawer-open"}>
        <NavBar />
        <Drawer open={open} handleClick={setOpen}>
            <ProjectSetting currentLocation="detail" />
        </Drawer>
        <ProjectDetailForm onContinue={values => { dispatch(updateProjectNameAndAssignee(values)) }} />
    </div>
}
