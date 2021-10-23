import React, { ChangeEvent,  SyntheticEvent, useEffect, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Modal, Stack, TextField, Typography } from '@mui/material';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Check } from '@mui/icons-material';
import { Log } from '../../app/layout/models/log';

export default observer(function LogForm(){

    const { logStore } = useStore();
    const { editMode, selectedLog, createOrEditLog, closeForm } = logStore;

    let myLog: Log | null = null;
    if(selectedLog !== undefined) myLog = {...selectedLog}
    const initialState = myLog ?? {
        id: '',
        date: '',
        startTime: '',
        endTime: '',
        hourlyRate: 0,
        totalCharged: 0,
        is_overtime: false
    };

    useEffect(() => {
        setLog(initialState);
    }, [selectedLog]);

    const [log, setLog] = useState(initialState);
    const [priceOverride, setPriceOverride] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLog({
            ...log,
            [name]:value
        });
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        createOrEditLog(log);
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
                    <form onSubmit={e => handleSubmit(e)} autoComplete="off">
                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                            <Stack spacing={2}>
                                <Typography variant={"h5"} sx={{fontWeight:"bold"}}>Add Entry</Typography>
                                <TextField
                                    id="date"
                                    label="Date"
                                    type="date"
                                    name="date"
                                    value={log.date}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    id="startTime"
                                    label="Start Time"
                                    type="time"
                                    name="startTime"
                                    value={log.startTime}
                                    onChange={handleInputChange}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                />
                                <TextField
                                    id="endTime"
                                    label="End Time"
                                    type="time"
                                    name="endTime"
                                    value={log.endTime}
                                    onChange={handleInputChange}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
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
                                <TextField id="hourlyRate" label="Hourly Rate" variant="outlined" value={log.hourlyRate} onChange={handleInputChange} disabled={priceOverride ? false : true} name="hourlyRate" />
                                <Button variant="contained" type="submit" color="success" endIcon={<Check />}>Submit</Button>
                            </Stack>
                        </LocalizationProvider>
                    </form>
                </Box>
            </Box>
        </Modal>
    );
});