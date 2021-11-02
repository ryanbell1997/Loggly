import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

export default function HomePage(){
    const data = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
              label: '# of Logs',
              data: [12, 19, 3, 5, 2, 3, 10, 12, 15, 17, 10, 7],
            }
        ]
    }

    const lineData = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [
            {
                label: '# of entries this month',
                data: [1, 2, 3, 4, 5]
            }
        ]
    }

    const lineEarningsData = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [
            {
                label: 'Earnings over last 5 months',
                data: [1000, 800, 1200, 1500, 900]
            }
        ]
    }


    const options = {
        responsive: true,
        maintainAspectRatio : false
    }

    return (
        <Box sx={{margin:"1.5em auto", width:"95%"}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Paper sx={{height:"400px"}}>
                        <Bar data={data} options={options}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper sx={{height:"200px"}}><Line data={lineEarningsData} options={options}/></Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper sx={{height:"200px"}}><Line data={lineData} options={options}/></Paper>
                </Grid>
            </Grid>
        </Box>
    )
}