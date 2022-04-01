import React from 'react';
import { Box, Modal} from '@mui/material';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function FormModal(){

    const { formModalStore } = useStore();
    const { isFormModalOpen, setFormModalOpenStatus, form } = formModalStore;

    return(
        <Modal
            open={isFormModalOpen}
            onClose={() => setFormModalOpenStatus(false, null, null)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={{ backgroundColor: 'white', width: '85%', margin: '5em auto' }}>
                <Box sx={{width: '90%', margin: "0px auto", paddingTop:"1.5em", paddingBottom:"1.5em"}}>
                    {form}          
                </Box>
            </Box>
        </Modal>
    );
});