import { Check } from '@mui/icons-material'
import { LoadingButton, LocalizationProvider } from '@mui/lab'
import AdapterLuxon from '@mui/lab/AdapterLuxon'
import { MenuItem, Stack, Typography } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import DateInput from '../../app/layout/inputs/DateInput'
import MultiSelectInput from '../../app/layout/inputs/MultiSelectInput'
import TextInput from '../../app/layout/inputs/TextInput'
import { Tag } from '../../app/layout/models/tag'
import { useStore } from '../../app/stores/store'



export default function ExportForm(){
    const {tagStore, logStore} = useStore();
    const {tagArray} = tagStore;
    const { exportLogs } = logStore;


    const initialState = {
        id: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        tagIds: '',
    };

    const validationSchema = Yup.object({
    }) 

    const handleSubmit = (values:any) => {
        exportLogs(values);
    }

    const menuItems = () => {
        let returnArray : any[] = []
        if(tagArray !== undefined && tagArray?.length > 0){
            returnArray = tagArray?.map((tag : Tag, key) => {
                return <MenuItem key={`${key}_${tag.id}`} value={tag.id}>{tag.name}</MenuItem>
            });
        }
        return returnArray;
    }

    return (
        <Formik 
        initialValues={{...initialState}} 
        validationSchema={validationSchema}
        onSubmit={values => handleSubmit(values)} >
            {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} autoComplete="off">
                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                        <Stack spacing={2}>
                            <Typography variant={"h5"} sx={{fontWeight:"bold"}}>Export Logs</Typography>
                            <TextInput idName="fileName" label="File Name" />
                            <DateInput idName="startDate" label="Date"/>
                            <DateInput idName="endDate" label="Date"/>
                            <MultiSelectInput idName="tagIds" label={"Tags"} menuItems={() => menuItems()} />
                            <LoadingButton variant="contained" type="submit" color="success" endIcon={<Check />} disabled={isSubmitting} loading={isSubmitting}>Submit</LoadingButton>
                        </Stack>
                    </LocalizationProvider>
                </form>
            )}
        </Formik>
    )
}