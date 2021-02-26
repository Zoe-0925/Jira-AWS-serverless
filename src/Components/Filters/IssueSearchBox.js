import React, { Fragment, useState, useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { TextField, ClickAwayListener } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useSimpleState } from '../Hooks/Hooks';

export default function IssueSearchBox({ handleQuery }) {
    const { value, handleTrue, handleFalse } = useSimpleState()
    const placeholder = value ? "Filter issues" : ""
    const className = value ? "issue-filter-clicked" : "issue-filter"
    const [query, setQuery] = useState("")

    const handleChange = e => {
        setQuery(e.target.value)
    }

    /** 
    useEffect(() => {
        setTimeout(handleQuery(query), 1500)
        return false
    }, [query])*/

    return (
        <Fragment>
            <ClickAwayListener onClickAway={handleFalse}>
                <TextField
                    className={className}
                    id="issue-filter"
                    placeholder={placeholder}
                    type="search"
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    onClick={handleTrue}
                />
            </ClickAwayListener>
        </Fragment>
    )
}
