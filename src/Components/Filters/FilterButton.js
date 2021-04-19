import React, { useState,  Fragment } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button,  MenuItem, FormGroup, FormControlLabel, Checkbox} from '@material-ui/core'
import { useDotIconMenu } from "../hooks/hooks"
import { DropDownMenu } from "../vuttons/iconButtons"

// eslint-disable-next-line
export default function FilterButton({ data = [], buttonName, label, handleSelect }) {
    const [state, setState] = useState(data.map(each => {
        return { [each._id]: false }
    }));

    // eslint-disable-next-line
    const { anchorEl, isOpen, anchorRef, handleMenuClose, handleMenuOpen } = useDotIconMenu()

    const handleChange = (event) => {
        console.log("event.target.name", event.target.name, "event.target.checked", event.target.checked)
        const newState = [...state, { [event.target.name]: event.target.checked }]
        setState(newState)

        //TODO may be wrong
        //handleSelect(newState.filter(item => item.value() === true).map(each => each.key()))
    }

    return (
        <Fragment>
            <Button className="nav-tab" onClick={handleMenuOpen}>{buttonName}<ExpandMoreIcon /></Button>

            <DropDownMenu anchorEl={anchorEl} isOpen={isOpen} handleMenuClose={handleMenuClose} >
                <div className="menu-container">
                    <MenuItem>
                        <FormGroup>
                            {data.map(el => <FormControlLabel
                                control={<Checkbox color="default"
                                checked={state[el._id]} name={el._id} onChange={handleChange} />}
                                label={el[label]}
                            />)}
                        </FormGroup>
                    </MenuItem>
                </div>
            </DropDownMenu>

        </Fragment>
    )
}


