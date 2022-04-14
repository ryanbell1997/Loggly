import { Check } from '@mui/icons-material'
import { LoadingButton, LocalizationProvider } from '@mui/lab'
import AdapterLuxon from '@mui/lab/AdapterLuxon'
import { MenuItem, Stack, Typography } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import DateInput from '../../app/layout/inputs/DateInput'
import MultiSelectInput from '../../app/layout/inputs/MultiSelectInput'
import TimeInput from '../../app/layout/inputs/TimeInput'
import { Tag } from '../../app/layout/models/tag'
import { useStore } from '../../app/stores/store'



export default function ExportForm(){
    const {tagStore} = useStore();
    const {tagArray} = tagStore;


    const initialState = {
        id: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        tagIds: '',
    };

    const validationSchema = Yup.object({
        startDate: Yup.date().required('A start date is required'),
        // endDate: Yup.date().moreThan(Yup.ref("startDate")),
        endTime: Yup.string().required('An end time is required'),
        hourlyRate: Yup.number().required('An hourly rate is required')
    }) 

    const handleSubmit = (values:any) => {
        //TODO - Create export agent action and endpoint
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
                            <DateInput idName="startDate" label="Date"/>
                            <TimeInput idName="startTime" label="Start Time" />
                            <DateInput idName="endDate" label="Date"/>
                            <TimeInput idName="endTime" label="End Time" />
                            <MultiSelectInput idName="tagIds" label={"Tags"} menuItems={() => menuItems()} />
                            <LoadingButton variant="contained" type="submit" color="success" endIcon={<Check />} disabled={isSubmitting} loading={isSubmitting}>Submit</LoadingButton>
                        </Stack>
                    </LocalizationProvider>
                </form>
            )}
        </Formik>
    )
}