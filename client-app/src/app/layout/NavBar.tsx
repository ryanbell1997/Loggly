import { AppBar, Avatar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import SideMenu from './SideMenu';

interface Props {
    handleMenuShow: (isOpen:boolean) => void,
    isOpen: boolean
}

export default function NavBar({handleMenuShow, isOpen}: Props){
    // const toggleDrawer = (open: boolean) =>
    // (event: React.KeyboardEvent | React.MouseEvent) => {
    //   if (
    //     event.type === 'keydown' &&
    //     ((event as React.KeyboardEvent).key === 'Tab' ||
    //       (event as React.KeyboardEvent).key === 'Shift')
    //   ) {
    //     return;
    //   }

    //   setState({ ...state, left: open });
    // };

    return(
        <Box sx={{ flexGrow: 1 }}>
            <SideMenu isOpen={isOpen} handleMenuShow={handleMenuShow}/>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => handleMenuShow(isOpen)}
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
}