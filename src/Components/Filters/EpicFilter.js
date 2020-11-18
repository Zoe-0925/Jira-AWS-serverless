import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid'
import { selectEpics } from '../../Reducers/Selectors';

export default function EpicFilter({ open, handleClose }) {
    const [state, setState] = useState({});
    const epics = useSelector(selectEpics)

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
    )
}
