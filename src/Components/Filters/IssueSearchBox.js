import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { TextField } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

const IssueSearchBox = ({ handleChange }) => (
    <TextField
        className="issue-search"
        id="issue-filter"
        placeholder="Filter issues"
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
    />
)


export default IssueSearchBox