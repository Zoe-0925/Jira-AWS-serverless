import React, { useState } from 'react'
import Drawer from "../Components/Drawer/Drawer"
import { ProjectSetting } from "../Components/Drawer/DrawerLinks"
import NavBar from "../Components/NavBar/NavBar"
import UpdateProject from '../Components/Forms/UpdateProject';

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
