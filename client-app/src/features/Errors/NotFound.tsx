import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function NotFound(){
    return(
        <Box>
            <Typography>Uh oh! Could not find this!</Typography>
            <Button variant="contained" component={Link} to='/log' >Return To Log</Button>
        </Box>
    )
}