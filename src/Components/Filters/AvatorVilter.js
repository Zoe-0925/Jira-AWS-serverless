import React from 'react'
import { Tooltip, ListItemAvatar, Avatar } from '@material-ui/core'

const AvatorVilter = ({ name, imgUrl }) => (
    <>
        <Tooltip title={name} aria-label={name}>
            <ListItemAvatar>
                <Avatar alt={name} src={imgUrl} />
            </ListItemAvatar>
        </Tooltip>
    </>
)


export default AvatorVilter