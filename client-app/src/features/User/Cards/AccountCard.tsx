import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import TextInput from '../../../app/layout/inputs/TextInput';

interface Props {
    xs: number,
    sm: number, 
    stackSpacing: number,
}

export default function AccountCard({xs, sm, stackSpacing}:Props){
    return (
        // <Grid item xs={xs} sm={sm}>
        //     <Paper>
        //         <Box sx={{padding: '0.8em'}}>
        //             <Stack spacing={stackSpacing}>
        //                 <Typography variant="h5">My Info</Typography>
        //                 <TextInput idName="email" type="email" disabled={true} label="Email" /> 
        //                 <TextInput idName="currency" label="Currency" />
        //             </Stack>
        //         </Box>
        //     </Paper>
        // </Grid>
    )
}