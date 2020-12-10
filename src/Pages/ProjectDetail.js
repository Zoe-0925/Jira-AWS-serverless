import React, { useState } from 'react'
import Drawer from "../Components/Drawer/Drawer"
import { ProjectSetting } from "../Components/Drawer/DrawerLinks"
import NavBar from "../Components/NavBar/NavBar"
import { ProjectUpdate } from '../Components/Project/ProjectUpdate';

export default function ProjectDetail() {
    const [open, setOpen] = useState(true);

    return <div className={open ? "main drawer-close" : "main drawer-open"}>
        <NavBar />
        <Drawer open={open} handleClick={setOpen}>
            <ProjectSetting currentLocation="detail" />
        </Drawer>
        <ProjectUpdate />
    </div>
}
