import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import TextInput from '../../../app/layout/inputs/TextInput';
import { AccountDetailsInfo, UserConfig } from '../../../app/layout/models/user';
import { useStore } from '../../../app/stores/store';
import Tag from './Tags/Tag';
import '../../../scss/UserAccount.scss';

export default observer(function UserAccount(){
    const { userStore} = useStore();
    const { userConfig, getUserConfig, saveConfig, accountInfo } =  userStore;

    useEffect(() => {
        if(userConfig == null){
            getUserConfig()
        } 
    }, [userConfig])

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
                    <Typography variant='h3' sx={{fontFamily:'Raleway'}}>My Account</Typography>
                    <Divider/>
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
                                        <Grid item xs={12} sm={6}>
                                            <Paper>
                                                <Box sx={{padding: '0.8em'}}>
                                                    <Stack spacing={2}>
                                                        <Typography variant="h5">My Info</Typography>
                                                        <TextInput idName="email" type="email" disabled={true} label="Email" /> 
                                                        <TextInput idName="currency" label="Currency" />
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
                                        <Grid item xs={12} sm={6}>
                                            <Paper>
                                                <Box sx={{padding: '0.8em'}}>
                                                    <Stack spacing={2}>
                                                        <Typography variant='h5'>Tags</Typography>
                                                        <div className='tagsContainer'>
                                                            <Tag id="Cake" name="Facebook" description='something here' backgroundColor='red' userId='cake' hourlyRate={0}/>
                                                            <Tag id="Cake" name="Google" description='something here' backgroundColor='green' userId='cake' hourlyRate={0}/>
                                                            <Tag id="Cake" name="Freelance" description='something here' backgroundColor='yellow' userId='cake' hourlyRate={0}/>
                                                            <Tag id="Cake" name="Freelance" description='something here' backgroundColor='purple' userId='cake' hourlyRate={0}/>
                                                            <Tag id="Cake" name="Freelance" description='something here' backgroundColor='pink' userId='cake' hourlyRate={0}/>
                                                            <Tag id="Cake" name="Freelance" description='something here' backgroundColor='blue' userId='cake' hourlyRate={0}/>
                                                            <Tag id="Cake" name="Freelance" description='something here' backgroundColor='green' userId='cake' hourlyRate={0}/>
                                                        </div>
                                                    </Stack>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <LoadingButton type="submit" variant="contained" color="success" sx={{fontSize: "1.2em"}} loading={isSubmitting} disabled={isSubmitting} endIcon={<Save />}>Save</LoadingButton>
                                        </Grid>
                                    </Grid>
                                </form>
                            )}
                        
                        </Formik>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
});