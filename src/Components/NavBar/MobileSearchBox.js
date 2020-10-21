import React, { Fragment } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { TextField, ClickAwayListener } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useSimpleState } from './CustomHooks';

export default function SearchBox() {
    const { value, handleTrue, handleFalse } = useSimpleState()

    return (
        <Fragment>
            <ClickAwayListener onClickAway={handleFalse}>
                {value ?
                    <TextField className="search-box" id="standard-search" placeholder="Search" type="search"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    /> : <IconButton onClick={handleTrue}>
                        <SearchIcon />
                    </IconButton>}
            </ClickAwayListener>
        </Fragment>
    )
}
