import { Stack, Typography, Button, Divider } from '@mui/material';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import React from 'react';
import FacebookSignIn from './FacebookSignIn';
import * as Yup from 'yup';
import TextInput from '../../../app/layout/inputs/TextInput';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { LoadingButton } from '@mui/lab';

export default observer(function UserSignIn(){
    const {userStore} = useStore();
    const { login } = userStore;

    
    const validationSchema = Yup.object({
        email: Yup.string().email(),
        password: Yup.string().required()
    }) 

    return (
        <Box sx={{width:'50%', margin:'2em auto'}}>
            <Stack spacing={2}>
                <Typography variant='h3' sx={{textAlign:"center"}}>Sign In</Typography>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        error: null
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, {setErrors}) => login(values).catch(error => setErrors({error: 'Invalid email or password'}))}
                >
                    {({handleSubmit, isSubmitting, errors}) => (
                        <form onSubmit={handleSubmit} autoComplete="off">  
                            <Stack spacing={2}>             
                                <TextInput idName="email" label="Email" placeholder="Email" type="email" />
                                <TextInput idName="password" label="Password" placeholder="Password" type="password" />
                                <Typography id="error" component={'p'} sx={{color: 'red'}}>{errors.error}</Typography>
                                <LoadingButton type="submit" variant="contained" color="success" sx={{fontSize: "1.2em", fontWeight:"bold"}} loading={isSubmitting}>Log In</LoadingButton>
                                <Button variant="contained" color="primary" component={Link} to='/user/register' sx={{fontSize: "1.2em", fontWeight:"bold"}}>Register</Button>
                            </Stack>
                        </form>
                    )}

                
                </Formik>
                <Divider variant="middle" />
                <FacebookSignIn />
            </Stack>
        </Box>
    );
});