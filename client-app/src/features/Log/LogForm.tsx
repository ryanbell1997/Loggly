import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Modal, Stack, Typography } from '@mui/material';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Check } from '@mui/icons-material';
import { Log } from '../../app/layout/models/log';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../app/layout/inputs/TextInput';
import DateInput from '../../app/layout/inputs/DateInput';
import TimeInput from '../../app/layout/inputs/TimeInput';

export default observer(function LogForm(){

    const { logStore, userStore } = useStore();
    const { editMode, selectedLog, createOrEditLog, closeForm } = logStore;
    const { user } = userStore;

    let myLog: Log | null = null;
    if(selectedLog !== undefined) myLog = {...selectedLog}
    const initialState = myLog ?? {
        id: '',
        date: '',
        startTime: '',
        endTime: '',
        hourlyRate: 0,
        totalCharged: 0,
        is_overtime: false,
        userId: user?.id
    };

    useEffect(() => {
        setLog(initialState);
    }, [selectedLog]);

    const [log, setLog] = useState(initialState);
    const [priceOverride, setPriceOverride] = useState(false);

    const validationSchema = Yup.object({
        date: Yup.date().required('A date is required'),
        Name: Yup.string().min(5)
    }) 

    // const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //     const { name, value } = e.target;
    //     setLog({
    //         ...log,
    //         [name]:value
    //     });
    // }

    const handleSubmit = (values:any) => {;
        createOrEditLog(values);
    }

    return(
        <Modal
            open={editMode}
            onClose={closeForm}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={{ backgroundColor: 'white', width: '85%', margin: '5em auto' }}>
                <Box sx={{width: '90%', margin: "0px auto", paddingTop:"1.5em", paddingBottom:"1.5em"}}>
                    <Formik 
                    initialValues={{...initialState}} 
                    validationSchema={validationSchema}
                    onSubmit={values => handleSubmit(values)} >
                        {({ getFieldProps, handleSubmit }) => (
                            <form onSubmit={handleSubmit} autoComplete="off">
                            <LocalizationProvider dateAdapter={AdapterLuxon}>
                                <Stack spacing={2}>
                                    <Typography variant={"h5"} sx={{fontWeight:"bold"}}>Add Entry</Typography>
                      
                                    <DateInput idName="date" label="Date"/>
                                    <TimeInput idName="startTime" label="Start Time" />
                                    <TimeInput idName="endTime" label="End Time" />

                                    <FormControlLabel label="Override Hourly Price" control={
                                        <Checkbox 
                                            value={priceOverride}
                                            onChange={(newValue) => {
                                                setPriceOverride(newValue.target.checked);
                                            }}
                                            name="overridePrice"
                                        />
                                    } />

                                    <TextInput idName="hourlyRate" type={"number"} label={"Hourly Rate"} placeholder={"10"} disabled={priceOverride ? false : true} />
                                    <Button variant="contained" type="submit" color="success" endIcon={<Check />}>Submit</Button>
                                </Stack>
                            </LocalizationProvider>
                        </form>
                        )}
                         
                    </Formik>                        
                </Box>
            </Box>
        </Modal>
    );
});