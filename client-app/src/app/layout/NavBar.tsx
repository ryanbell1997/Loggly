import { AppBar, Avatar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import SideMenu from './SideMenu';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function NavBar(){
    
    const { generalStore } = useStore();

    return(
        <Box sx={{ flexGrow: 1 }}>
            <SideMenu />
            <AppBar position="static" sx={{ backgroundColor: "green"}}>
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => generalStore.setMenuOpenStatus(true)}
                >
                   <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Loggly
                </Typography>
                    <Button color="inherit"><Avatar /></Button>
                </Toolbar>
            </AppBar>
    </Box>
    );
});