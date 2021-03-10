import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { TextField } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

const IssueSearchBox = ({ handleChange }) => {
    const [query, setQuery] = useState("")

    const onChange = (e) => {
        setQuery(e.target.value)
    }

    return (
        <TextField
            value={query}
            className="issue-search"
            id="issue-filter"
            placeholder="Filter issues"
            type="search"
            variant="outlined"
            size="small"
            onChange={onChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment>
                        <IconButton onClick={()=> handleChange(query)}>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}

export default IssueSearchBox