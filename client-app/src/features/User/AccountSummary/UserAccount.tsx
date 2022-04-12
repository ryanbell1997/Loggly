import { Logout, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid, MenuItem, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { ReactFragment, useEffect, useState } from 'react';
import SelectInput from '../../../app/layout/inputs/SelectInput';
import TextInput from '../../../app/layout/inputs/TextInput';
import { AccountDetailsInfo } from '../../../app/layout/models/user';
import { useStore } from '../../../app/stores/store';
import '../../../scss/UserAccount.scss';
import TagsSection from '../../Tag/TagsSection';
import currenciesJson from '../../../app/resources/currencies.json';
import { captureRejectionSymbol } from 'events';

export default observer(function UserAccount(){
    const { userStore} = useStore();
    const { userConfig, getUserConfig, saveConfig, accountInfo } =  userStore;

    useEffect(() => {
        if(userConfig == null){
            getUserConfig()
        } 
    }, [userConfig])

    const getCurrencies = () => {
        // const currenciesObj = currenciesJson;

        // let returnCurrencyMenuItems:any[] = [];

        // if(currenciesObj){
        //     for(var index:number in currenciesObj){
        //         const currency:any = currenciesObj[index]
        //         returnCurrencyMenuItems.push(<MenuItem key={}>{currency.symbol}</MenuItem>)
        //     }
        // }
        
    }
    // const [isSubmitting, setSubmitting] = useState(false);

    const initialValues: AccountDetailsInfo = accountInfo ?? {
        id: '',
        email: '',
        hourlyRate: 0,
        currency: '',
    };

    return (
        <Box>
            <Paper sx={{margin: "2em auto", width:"90%"}}>
                <Box sx={{width:'90%', padding: '1em', margin: '0px auto'}}>
                    
                    <Box sx={{paddingTop: '1em'}}>
                        <Formik
                            initialValues={{
                                ...initialValues
                            }}
                            onSubmit={(values:AccountDetailsInfo) => saveConfig(values)}
                        >
                            {({handleSubmit, isSubmitting}) => (
                                <form onSubmit={handleSubmit} autoComplete="off">
                                    <Grid container spacing={3}>
                                        <Grid item xs={6} sm={10} >
                                            <Typography variant='h3' sx={{fontFamily:'Raleway', marginBottom: "0.3em"}}>My Account</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={2} justifyContent="flex-end">
                                            <LoadingButton type="submit" variant="contained" color="success" sx={{fontSize: "1.2em"}} loading={isSubmitting} disabled={isSubmitting} endIcon={<Save />}>Save</LoadingButton>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3}>
                                    
                                        <Grid item xs={12} sm={6}>
                                            <Paper>
                                                <Box sx={{padding: '0.8em'}}>
                                                    <Stack spacing={2}>
                                                        <Typography variant="h5">My Info</Typography>
                                                        <TextInput idName="email" type="email" disabled={true} label="Email" /> 
                                                        <TextInput idName="currency" label="Currency" />
                                                        {/* <SelectInput idName="currency" label="Currency" options={} /> */}
                                                    </Stack>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Paper>
                                                <Box sx={{padding: '0.8em'}}>
                                                    <Stack spacing={2}>
                                                        <Typography variant='h5'>Logging settings</Typography>
                                                        <TextInput idName="hourlyRate" type="number" label="Hourly Rate" /> 
                                                    </Stack>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                        
                                        
                                    </Grid>
                                </form>
                            )}
                        
                        </Formik>
                        <TagsSection />
                        {/* <LoadingButton type="submit" variant="contained" color="error" sx={{fontSize: "1.2em"}} loading={} disabled={} endIcon={<Logout /> onclick={}}>Logout</LoadingButton> */}
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
});