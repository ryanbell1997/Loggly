import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { Fragment } from 'react';
import { CalendarToday, Dashboard, Logout } from '@mui/icons-material';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';



export default observer(function SideMenu(){

    const {generalStore, userStore} = useStore();
    const {setMenuOpenStatus, isMenuOpen} = generalStore;
    const {logout} = userStore;

    return(
        <Fragment>
            <Drawer
            anchor='left'
            open={isMenuOpen}
            onClose={() => setMenuOpenStatus(false)}
            >
            <List>
                <ListItem component={Link} to="/" onClick={() => setMenuOpenStatus(false)} >
                    <ListItemButton>
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>

                <ListItem component={Link} to='/log' onClick={() => setMenuOpenStatus(false)} >
                    <ListItemButton>
                    <ListItemIcon>
                        <CalendarToday />
                    </ListItemIcon>
                    <ListItemText primary="My Log" />
                    </ListItemButton>
                </ListItem>

                <ListItem onClick={() => logout()} sx={{position: 'fixed', bottom: "0", textAlign: "center", paddingBottom:"1em", width: "auto" }}>
                    <ListItemButton>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
            </Drawer>
      </Fragment>
    );
});