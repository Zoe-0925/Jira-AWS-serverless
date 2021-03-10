import React, { useState } from 'react'
import Drawer from "./drawer"
import { DrawerLinks } from "./drawerLinks"
import NavBar from "../navBar/navBar"

const DrawerContainer = ({ type = "", currentLocation = "", ...props }) => {
    const [open, setOpen] = useState(true);

    const toggleDrawer = () => setOpen(!open)

    return (
        <div className={open ? "main drawer-close" : "main drawer-open"}>
            <NavBar toggleDrawer={toggleDrawer} />
            <Drawer handleClick={toggleDrawer} open={open}>
                <DrawerLinks type={type} currentLocation={currentLocation} />
            </Drawer>
            {props.children}
        </div>
    )
}

export default React.memo(DrawerContainer)