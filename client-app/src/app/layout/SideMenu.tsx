import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { Fragment } from 'react';
import { CalendarToday, Dashboard } from '@mui/icons-material';

interface props {
    isOpen: boolean
    handleMenuShow: (isOpen:boolean) => void
}

export default function SideMenu({isOpen, handleMenuShow}: props){
    return(
        <Fragment>
            <Drawer
            anchor='left'
            open={isOpen}
            onClose={() =>handleMenuShow(isOpen)}
            >
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <CalendarToday />
                </ListItemIcon>
                <ListItemText primary="My Log" />
                </ListItemButton>
            </ListItem>
            </List>
            </Drawer>
      </Fragment>
    );
}