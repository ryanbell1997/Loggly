import { LoadingButton } from '@mui/lab';
import { Box, Button, Modal, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../app/stores/store';

export default observer(function ConfirmationModal(){
    const {modalStore, userStore } = useStore();
    const { isConfirmationModalOpen, setConfirmationModalOpenStatus, modalTitle, modalDescription, confirmText, confirmFunc } = modalStore;
    const { user } = userStore;

    return (
        <Modal
        open={isConfirmationModalOpen}
        onClose={() => setConfirmationModalOpenStatus(false)}
        aria-labelledby={modalTitle}
        aria-describedby={modalDescription}
        >
            <Box sx={{backgroundColor: "white", width:"90%", margin:"8em auto", borderRadius:"5px"}}>
                <Box sx={{padding: "1em" }}>
                    <Typography variant="h5">{modalTitle}</Typography>
                    <Typography>{modalDescription}</Typography>
                    <LoadingButton onClick={confirmFunc} variant="contained" color={"primary"} sx={{margin: "0.3em", marginLeft:"0px"}}>{confirmText}</LoadingButton>
                    <Button color={"info"} onClick={() => setConfirmationModalOpenStatus(false)} sx={{margin: "0.3em"}} variant="contained">Cancel</Button>
                    <Typography variant="body1" sx={{display:"none"}}>{user !== null ? user.id : ""}</Typography>
                </Box>
            </Box>
        </Modal>
    )
});