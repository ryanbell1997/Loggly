import React, { useEffect } from 'react';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams, GridRowsProp } from '@mui/x-data-grid';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { Add, Delete, Edit, FileDownload, Share } from '@mui/icons-material';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import ConfirmationModal from './ConfirmationModal';
import LogSummary from './LogSummary';

export default observer(function LogTable(){
    const {logStore, modalStore} = useStore();
    const {tableLogs, deleteLog, loadLogs, openForm, loading} = logStore;
    const {openConfirmationModal} = modalStore


    useEffect(() => {   
        loadLogs();
      }, [])

    let rows: GridRowsProp = [...tableLogs];

    const columns: GridColDef[] = React.useMemo(() => [
    { field: 'date', headerName: 'Date', flex:1 },
    { field: 'startTime', headerName: 'Start Time', flex:1 },
    { field: 'endTime', headerName: 'End Time', flex:1 },
    { field: 'earnings', headerName: 'Earning', flex:1 },
    { field: 'actions', headerName: 'Actions', flex:1, type: 'actions', getActions: (params: GridRowParams) => [
        <GridActionsCellItem 
            icon={<Edit />} 
            onClick={() => {openForm(params.id.toString())}}
            label="Edit" />,
        
        <GridActionsCellItem 
        icon={<Delete />} 
        onClick={() => {openConfirmationModal({title:"Delete Log", description:"Are you sure you want to delete this log?", confirmationText: "Delete", id: params.id.toString()})
            }} 
            // confirmFunc: deleteLog(params.id.toString())
        label="Delete" />,
        ]
    }
    ], [deleteLog]);

    return(
        <div style={{ height: "80%", width: '100%'}}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1}}>
                    {/* <TextField
                        id="filteredDateTime"
                        label="Filter by Month/Year"
                        type="month"
                        name="filteredDateTime"
                        value={date}
                        onChange={handleDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ marginTop: "1.2em", marginLeft: "1.2em", marginBottom: "1.2em"}}
                         /> */}
                        
                    <ConfirmationModal />
                    <LogSummary />
                    <DataGrid rows={rows} columns={columns} autoPageSize={true} autoHeight={true} loading={loading} disableColumnFilter  />
                    <SpeedDial
                        ariaLabel="logToolBar"
                        sx={{ position: 'fixed', bottom: 75, right: 16 }}
                        icon={<SpeedDialIcon />}
                        >
                            <SpeedDialAction
                            key={"Add"}
                            icon={<Add />}
                            tooltipTitle={"Add"}
                            onClick={() => openForm(undefined)}
                            />
                            <SpeedDialAction 
                            key={"Export"}
                            icon={<FileDownload />}
                            tooltipTitle={"Export"}
                            />
                            <SpeedDialAction 
                            key={"Share"}
                            icon={<Share />}
                            tooltipTitle={"Share"}
                            />
                    </SpeedDial>
                </div>
            </div>
        </div>
    );
});