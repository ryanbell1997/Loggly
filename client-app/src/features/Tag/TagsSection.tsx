import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Grid, Paper, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import TagForm from './TagForm';
import Tag from './Tag'
import { useStore } from '../../app/stores/store';

export default observer(function TagsSection(){
    const { formModalStore, tagStore } = useStore();
    const { setFormModalOpenStatus } =  formModalStore;
    const { openForm, tagArray, getTags,createOrEditTag } = tagStore;

    useEffect(() => {
        getTags();
    }, [createOrEditTag])

    return(
        <Grid item xs={12} sm={6}>
            <Paper>
                <Box sx={{padding: '0.8em'}}>
                    <Stack spacing={2}>
                        <Typography variant='h5'>Tags</Typography>
                        <div className='tagsContainer'> 
                            { 
                                tagArray === undefined ? null : tagArray.map((tag, key) => {
                                        return <Tag key={`tag_${tag.id}`} id={tag.id} description={tag.description} backgroundColor={tag.colourHex} hourlyRate={tag.hourlyRate} name={tag.name} />
                                    })
                            }
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