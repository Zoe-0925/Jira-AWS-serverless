import React, { useState } from 'react'
import Drawer from "./Drawer"
import { DrawerLinks } from "./DrawerLinks"
import NavBar from "../Shared/NavBar"

const DrawerContainer = ({ type = "", currentLocation = "", ...props }) => {
    const [open, setOpen] = useState(true);

    return (
        <div className={open ? "main drawer-close" : "main drawer-open"}>
            <NavBar openDrawer={() => setOpen(true)} />
            <Drawer handleClick={(open) => setOpen(!open)} open={open}>
                <DrawerLinks type={type} currentLocation={currentLocation} />
            </Drawer>
            {props.children}
        </div>
    )
}

export default DrawerContainer