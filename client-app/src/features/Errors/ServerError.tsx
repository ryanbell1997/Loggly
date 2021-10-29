import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { useStore } from '../../app/stores/store';

export default observer(function ServerError(){
    const {generalStore} = useStore();
    return (
        <Box>
            <Typography component="h1">Server Error</Typography>
            <Typography component="p">{generalStore.error?.message}</Typography>
            {generalStore.error?.details && 
                <Typography component="p">{generalStore.error?.details}</Typography>
            }
            
        </Box>
    )
});