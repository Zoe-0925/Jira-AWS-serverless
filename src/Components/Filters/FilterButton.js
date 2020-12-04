import React, { useState, useEfect, Fragment } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Menu, MenuItem, FormGroup, FormControlLabel, Checkbox, ClickAwayListener } from '@material-ui/core'

export default function FilterButton({ data, buttonName, label, handleSelect }) {
    const [state, setState] = useState([]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    useEfect(() => {
        if (data) {
            let result = {}
            data.map(each => result = { ...result, [each._id]: false })
            setState(result)
        }
    }, [data])

    const handleChange = (event) => {
        const newState = [...state, { [event.target.name]: event.target.checked }]
        setState(newState)

        //TODO may be wrong
        handleSelect(newState.filter(item => item.value() === true).map(each => each.key()))
    }

    return (
        <Fragment>
            <Button className="nav-tab" onClick={handleMenuOpen}>{buttonName}<ExpandMoreIcon /></Button>
            <ClickAwayListener onClickAway={handleMenuClose}>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    id={uuidv4()}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={isOpen}
                    onClose={handleMenuClose}
                >
                    <div className="menu-container">
                        <MenuItem>
                            <FormGroup>
                                {data.map(el => <FormControlLabel
                                    control={<Checkbox checked={state[el._id]} onChange={handleChange} name={el._id} />}
                                    label={el[label]}
                                />)}
                            </FormGroup>
                        </MenuItem>
                    </div>
                </Menu>
            </ClickAwayListener>
        </Fragment>
    )
}
