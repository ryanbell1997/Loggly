import { Box, Grid, Typography } from '@mui/material';
import { GridRowData } from '@mui/x-data-grid';
import { Formik } from 'formik';
import React from 'react';
import DateInput from '../../app/layout/inputs/DateInput';
import { Log } from '../../app/layout/models/log';
import { useStore } from '../../app/stores/store';

export default function LogSummary(){
    const { userStore, logStore } = useStore();
    const { userConfig } = userStore;
    const { logs } = logStore;

    const initialState = {
        date: ''
    }

    const handleSubmit = (values:any) => {
        console.log("hello");
    }

    const overallLogsValues = () => {
        let total = 0;
        logs.forEach((log:Log) => {
            if(log.totalCharged !== undefined){
                total += log.totalCharged;
            }
        });
        return total;
    }

    return(
        <Grid container sx={{padding:"0.4em"}} spacing={2}>
            <Grid item xs={4} md={4} sm={4}>
                <Typography sx={{textAlign:"center", marginBottom:"0.4em"}} variant="h6">Filter by date</Typography>
                <Box>
                    <Formik
                    initialValues={{...initialState}}
                    onSubmit={values => handleSubmit(values)}>
                        {({handleSubmit}) => (
                            <form onChange={handleSubmit} autoComplete="off">
                                <DateInput idName="date" label="Filter by month and year" type="month" style={{margin: "0px auto", width: "120px"}}/>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Grid>
            <Grid item xs={4} md={4} sm={4}>
                <Typography sx={{textAlign:"center"}} variant="h6">Total Earnings</Typography>
                <Typography sx={{textAlign:"center"}} variant="h4">{userConfig?.currency}{overallLogsValues()}</Typography>
            </Grid>
            <Grid item xs={4} md={4} sm={4}>
                <Typography sx={{textAlign:"center"}} variant="h6">Number of logs</Typography>
                <Typography sx={{textAlign:"center"}} variant="h4">{logs.size}</Typography>
            </Grid>
        </Grid>

    )
}