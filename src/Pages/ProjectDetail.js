import React, { useState } from 'react'
import Drawer from "../components/drawer/drawer"
import { ProjectSetting } from "../components/drawer/drawerLinks"
import NavBar from "../components/shared/navBar"
import UpdateProject from '../components/forms/updateProject';

export default function ProjectDetail() {
    const [open, setOpen] = useState(true);

    return <div className={open ? "main drawer-close" : "main drawer-open"}>
        <NavBar openDrawer={() => setOpen(true)} />
        <Drawer open={open} handleClick={setOpen}>
            <ProjectSetting currentLocation="detail" />
        </Drawer>
        <UpdateProject />
    </div>
}
