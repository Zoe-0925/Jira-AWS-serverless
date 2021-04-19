import React from 'react';
import { useSelector } from "react-redux"
import { selectCurrentProjectName } from "../../Reducers/Selectors"
import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';
import { ProjectHeaderTab } from "../buttons/iconButtons"
import CssBaseline from '@material-ui/core/CssBaseline';
import { Row } from "reactstrap"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        marginTop: "1rem",
        width: drawerWidth,
        backgroundColor: "rgb(250, 251, 252)"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    closeMenuButton: {
        marginRight: 'auto',
        marginLeft: 0,
    },
}));

const SideDrawer = ({ handleClick, open, ...props }) => {
    const classes = useStyles();
    const title = useSelector(selectCurrentProjectName)

    return <div className="drawer">
        <CssBaseline />
        <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                className={classes.drawer + " desktop"}
                variant="persistent"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <div className="title">
                    <Row>
                        <ProjectHeaderTab title={title || ""} subtite="Software project" imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2sa8Zxht8_5o8aMA9I1rHmr9FVXEoxoDVfw&usqp=CAU" />
                    </Row>
                </div>
                {props.children}
            </Drawer>
        </nav>
    </div>
}

export default React.memo(SideDrawer)