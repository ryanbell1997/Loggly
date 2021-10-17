import React, { ChangeEvent, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Modal, Stack, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/lab';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Check } from '@mui/icons-material';

export default observer(function LogForm(){

    const { logStore, userStore } = useStore();
    const {editMode, setEditing, selectedLog} = logStore;
    const { hourlyRate } = userStore;

    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [finishTime, setEndTime] = useState(null);
    const [priceOverride, setPriceOverride] = useState<ChangeEvent<HTMLInputElement> | boolean | null>(null);

    // const initialState = selectedLog ?? {
    //     id: '',
    //     date: '',
    //     startTime: '',
    //     endTime: '',
    //     hourlyRate: 0,
    // };

    // const [log, setLog] = useState(initialState);

    function handleSubmit() {
        console.log("Hello");
    }
    // createLog(date, startTime, finishTime, 8)
    return(
        <Modal
            open={editMode}
            onClose={() => setEditing(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={{ backgroundColor: 'white', width: '85%', margin: '5em auto' }}>
                <Box sx={{width: '90%', margin: "0px auto", paddingTop:"1.5em", paddingBottom:"1.5em"}}>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        {/* <Formik initialValues={log} onSubmit={values => console.log(values)}>
                            {({values, handleChange, handleSubmit}) => ( */}

                                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                                        <Stack spacing={2}>
                                            <Typography variant={"h5"} sx={{fontWeight:"bold"}}>Add Entry</Typography>
                                            <DatePicker
                                                label="Date"
                                                value={date}
                                                onChange = {(newValue) => setDate(newValue)}
                                                renderInput={(params) => <TextField {...params}
                                                name="date"
                                                />}
                                            />
                                            <TimePicker
                                                label="Start Time"
                                                value={startTime}
                                                onChange={(newValue) => {
                                                    setStartTime(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} 
                                                name="startTime"
                                                />}
                                            />
                                            <TimePicker
                                                label="Finish Time"
                                                value={finishTime}
                                                onChange={(newValue) => {
                                                    setEndTime(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} 
                                                name="endTime"
                                                />}
                                            />
                                            <FormControlLabel label="Override Hourly Price" control={
                                                <Checkbox 
                                                    value={priceOverride}
                                                    onChange={(newValue) => {
                                                        setPriceOverride(newValue.target.checked);
                                                    }}
                                                    name="overridePrice"
                                                />
                                            } />
                                            <TextField id="hourlyRate" label="Hourly Rate" variant="outlined" disabled={priceOverride ? false : true} value={hourlyRate} name="hourlyRate" />
                                            <Button variant="contained" type="submit" color="success" endIcon={<Check />}>Submit</Button>
                                        </Stack>
                                    </LocalizationProvider>
                            {/* )}
                        </Formik> */}
                    </form>
                </Box>
            </Box>
        </Modal>
    );
});