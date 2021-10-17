import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export default function HomePage(){
    return (
        <Box sx={{margin:"1.5em auto", width:"95%"}}>
            <Grid container spacing={2}>
                <Grid item xs={10} md={12}>
                    <Paper sx={{height:"200px"}}>Last 5 entries</Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper sx={{height:"200px"}}>Earnings over time graph</Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper sx={{height:"200px"}}>Days Logged</Paper>
                </Grid>
            </Grid>
        </Box>
    )
}