import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { Fragment } from 'react';
import { CalendarToday, Dashboard } from '@mui/icons-material';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';



export default observer(function SideMenu(){

    const {generalStore} = useStore();

    return(
        <Fragment>
            <Drawer
            anchor='left'
            open={generalStore.isMenuOpen}
            onClose={() => generalStore.setMenuOpenStatus(false)}
            >
            <List>
                <ListItem component={Link} to="/">
                    <ListItemButton>
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>

                <ListItem component={Link} to='/log'>
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
});