import { Stack, TextField, Typography, Button, Divider } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import FacebookSignIn from './FacebookSignIn';

export default function UserSignIn(){
    


    return (
        <Box sx={{width:'50%', margin:'2em auto'}}>
            <Stack spacing={2}>
                <Typography variant='h3' sx={{textAlign:"center"}}>Sign In</Typography>
                <TextField type="email" id="email" name="email" label="Email" variant="outlined" />
                <TextField type="password" id="password" name="paswword" label="Password" variant="outlined" />
                <Button type="submit" variant="contained">Log In</Button>
                <Divider variant="middle" />
                <FacebookSignIn />
            </Stack>
        </Box>
    );
}