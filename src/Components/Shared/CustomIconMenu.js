import React from 'react';
import { Menu, MenuItem, IconButton, ClickAwayListener } from '@material-ui/core';

export default function CustomIconMenu({ options, click, ...props }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                {props.children}
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                {options.map((option) => (
                    <MenuItem key={option} onClick={() => click(option)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
