import { Check } from '@mui/icons-material'
import { Box, Stack, Button, Typography } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import TextInput from '../../app/layout/inputs/TextInput'
import * as Yup from 'yup'
import { useStore } from '../../app/stores/store'
import { observer } from 'mobx-react-lite'
import { LoadingButton } from '@mui/lab'
import { NavLink } from 'react-router-dom'

export default observer(function RegistrationForm(){
    const {userStore} = useStore();
    const {register, user} = userStore;

    const validationSchema = Yup.object({
        name: Yup.string().required("A name is required"),
        email: Yup.string().email().required("An email is required"),
        password: Yup.string().matches(new RegExp("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"), {message: "Password must include atleast one digit, one lower case character, and one upper case character, and more than 8 characters"}).required("A password is required"),
        confirmedPassword: Yup.string().matches(new RegExp("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"), {message: "Password must include atleast one digit, one lower case character, and one upper case character, and more than 8 characters"}).required("Password confirmation required"),
        userName: Yup.string().required("A username is required")
    }) 

    return(
        <Box sx={{ backgroundColor: 'white', width: '85%', margin: '1.5em auto' }}>
            <Box sx={{width: '90%', margin: "0px auto", paddingTop:"1.5em", paddingBottom:"1.5em"}}>
                <Typography variant='h3' sx={{textAlign:"center", padding:"0.4em"}}>Register</Typography>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmedPassword: '',
                        userName: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={values => register(values)}
                >
                    {({ handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <TextInput idName="userName" placeholder="Username" label="Username" />
                                <TextInput idName="name" placeholder="Name" label="Name" /> 
                                <TextInput idName="email" placeholder="Email" label="Email" type="email" />
                                <TextInput idName="password" placeholder="Password" label="Password" type="password" />
                                <TextInput idName="confirmedPassword" placeholder="Confirm Password" label="Confirm Password" type="password" />
                                <LoadingButton variant="contained" type="submit" color="success" endIcon={<Check />} disabled={ isSubmitting } loading={isSubmitting}>Register</LoadingButton>
                                <Button variant="contained" component={NavLink} to={"/user/signin"} color="info">Back</Button>
                            </Stack>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>   
    )
});