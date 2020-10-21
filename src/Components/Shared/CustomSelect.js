import React from 'react'
import { Select, MenuItem, InputBase, InputLabel } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function CustomSelect({ label, items, onChange }) {
    const classes = useStyles();
    const [filter, setFilter] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const click = (value) => {
        setFilter(value);
        onChange(value)
        handleClose()
    }

    return (
        <div className="row">
            <InputLabel className="label">{label}</InputLabel>
            <Select
                className={classes.margin}
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={filter}
                input={<BootstrapInput />}
            >
                {items.map(each => <MenuItem key={each.name} onClick={()=>click(each.value)}>{each.name}</MenuItem>)}
            </Select>
        </div>
    )
}

