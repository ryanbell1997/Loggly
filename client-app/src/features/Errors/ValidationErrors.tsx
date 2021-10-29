import { List, ListItem, ListItemText } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

interface Props {
    errors :string[] | null;
}

export default function ValidationErrors({errors} : Props) {
    return (
        <Box>
            <List>
            {errors!.map((err: any, i) => (
                <ListItem>
                  <ListItemText
                    key={i}
                    primary={err}
                  />
                </ListItem>
              ))}
            </List>
        </Box>
    )
}