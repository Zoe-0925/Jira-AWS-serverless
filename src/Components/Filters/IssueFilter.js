import React, { Fragment } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { TextField, ClickAwayListener } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useSimpleState } from '../Shared/CustomHooks';


export default function IssueFilter() {
    const { value, handleTrue, handleFalse } = useSimpleState()
    const placeholder = value ? "Filter issues" : ""
    const className = value ? "issue-filter-clicked" : "issue-filter"

    return (
        <Fragment>
            <ClickAwayListener onClickAway={handleFalse}>
                <TextField className={className} id="issue-filter" placeholder={placeholder} type="search"
                    variant="outlined"
                    size="small"
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
