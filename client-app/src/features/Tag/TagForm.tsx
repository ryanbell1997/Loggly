import React, { useEffect, useState } from 'react';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import { Tag } from '../../app/layout/models/tag';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import { Stack, Typography } from '@mui/material';
import TextInput from '../../app/layout/inputs/TextInput';
import { LoadingButton } from '@mui/lab';
import { Check } from '@mui/icons-material';

export default observer(function TagForm(){
    const { tagStore, userStore } = useStore();
    const { selectedTag, createOrEditTag } = tagStore;
    const { userConfig } = userStore;

    let myTag: Tag | null = null;
    if(selectedTag !== undefined) myTag = {...selectedTag}
    const initialState = myTag ?? {
        id: '',
        name: '',
        description: '',
        hourlyRate: userConfig?.hourlyRate,
        colourHex: ''
    };

    useEffect(() => {
        setTag(initialState);
    }, []);

    const [tag, setTag] = useState(initialState);

    const validationSchema = Yup.object({
        name: Yup.string().required('A name is required'),
        colourHex: Yup.string().required('A colour is required'),
    }) 

    const handleSubmit = (values:any) => {
        createOrEditTag(values);
    }

    return(
        <Formik 
        initialValues={{...initialState}} 
        validationSchema={validationSchema}
        onSubmit={values => handleSubmit(values)} >
            {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} autoComplete="off">
                    <Stack spacing={2}>
                        <Typography variant={"h5"} sx={{fontWeight:"bold"}}>Add Tag</Typography>
                        <TextInput idName="name" label="Name" />
                        <TextInput idName="description" label="Description" />
                        <TextInput idName="hourlyRate" type={"number"} label={"Hourly Rate"} placeholder={"10"} />
                        <TextInput idName="colourHex" label="Colour" />
                        <LoadingButton variant="contained" type="submit" color="success" endIcon={<Check />} disabled={isSubmitting} loading={isSubmitting}>Submit</LoadingButton>
                    </Stack>
                </form>
            )}
        </Formik>                        

    );
});