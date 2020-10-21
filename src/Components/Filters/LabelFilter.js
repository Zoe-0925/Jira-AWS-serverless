import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Tooltip, ClickAwayListener, MenuItem, MenuList } from '@material-ui/core'
import { useSimpleState } from "../Shared/CustomHooks"
import {useLabelFilter} from "./CustomHooks"

export default function Label() {
    const { value, handleTrue, handleFalse } = useSimpleState()

    const { labels, dispatchFilterByLabel } = useLabelFilter(value)

    //TODO
    //If no label exists, show the link to create labels

    const anchorRef = React.useRef(null);

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            handleFalse()
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div>
            <div className="row tab" onClick={handleTrue}>
                <Tooltip title="Label" aria-label="Label">
                    <p>Label</p>
                </Tooltip>
                <ExpandMoreIcon />
            </div>
            <ClickAwayListener onClickAway={handleFalse}>
                <MenuList autoFocusItem={value} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {labels.map(each => {
                        <MenuItem onClick={dispatchFilterByLabel}>{each}</MenuItem>
                    })
                    }
                </MenuList>
            </ClickAwayListener>
        </div>
    )
}
