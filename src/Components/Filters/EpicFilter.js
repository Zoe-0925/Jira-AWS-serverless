import React, { useState, useEfect, Fragment } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { v4 as uuidv4 } from 'uuid'
import { selectEpics } from '../../Reducers/Selectors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Menu, MenuItem, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'

export default function EpicFilter({ open, handleClose }) {
    const [state, setState] = useState({});
    const epics = useSelector(selectEpics)
    const dispatch = useDispatch()

    useEfect(() => {
        let result = {}
        epics.map(each => result = { ...result, [each._id]: false })
        console.log("epic filter result", result)
        setState(result)
    }, [epics])

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    }

    return (
        <Fragment>
            <Button className="nav-tab" onClick={handleProjectMenuOpen}>Epic <ExpandMoreIcon /></Button>
            <Menu
                anchorEl={open}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={uuidv4()}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={handleClose}
            >
                <div className="menu-container">
                    <MenuItem>
                        <FormGroup>
                            {epics.map(epic => <FormControlLabel
                                control={<Checkbox checked={state[epic._id]} onChange={handleChange} name={epic._id} />}
                                label={epic.summary}
                            />)}
                        </FormGroup>
                    </MenuItem>
                </div>
            </Menu>
        </Fragment>
    )
}
