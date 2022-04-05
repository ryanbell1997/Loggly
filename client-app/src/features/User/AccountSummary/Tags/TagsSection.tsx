
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Grid, Paper, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite';
import React from 'react'
import { useStore } from '../../../../app/stores/store';
import TagForm from '../../../Tag/TagForm';
import Tag from './Tag'

export default observer(function TagsSection(){
    const { formModalStore, tagStore } = useStore();
    const { setFormModalOpenStatus } =  formModalStore;
    const { openForm } = tagStore;

    return(
        <Grid item xs={12} sm={6}>
            <Paper>
                <Box sx={{padding: '0.8em'}}>
                    <Stack spacing={2}>
                        <Typography variant='h5'>Tags</Typography>
                        <div className='tagsContainer'>
                            <Tag id="Cake" name="Facebook" description='something here' backgroundColor='red' userId='cake' hourlyRate={0}/>
                            <LoadingButton onClick={() => {setFormModalOpenStatus(true, <TagForm />, () => openForm())}} 
                                type="submit" 
                                variant="contained" 
                                sx={{borderRadius:"50%", textAlign:"center", fontWeight:"bold", fontSize:"1.5em"}} 
                                color="success">+</LoadingButton>
                        </div>
                    </Stack>
                </Box>
            </Paper>
        </Grid>
    )
});