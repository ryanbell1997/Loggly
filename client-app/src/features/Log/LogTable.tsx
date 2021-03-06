import React, { useEffect } from 'react';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams, GridRowsProp, GridValueFormatterParams } from '@mui/x-data-grid';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { Add, Delete, Edit, FileDownload, Share } from '@mui/icons-material';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LogSummary from './LogSummary';
import dateFormat from 'dateformat';
import timeShortener from '../../utils/TimeShortener';
import LogForm from './LogForm';
import ExportForm from './ExportForm';

export default observer(function LogTable(){
    const {logStore, modalStore, formModalStore } = useStore();
    const {tableLogs, deleteLog, loadLogs, loading, setSelectedLog, openForm} = logStore;
    const { setFormModalOpenStatus } = formModalStore;
    const {openConfirmationModal} = modalStore;

    useEffect(() => {   
        loadLogs();
      }, [])

    let rows: GridRowsProp = [...tableLogs];

    const columns: GridColDef[] = React.useMemo(() => [
    { field: 'date', headerName: 'Date', flex:1, valueFormatter: (params: GridValueFormatterParams) => {
        return dateFormat(params.value as Date, "dd, mmm, yyyy"); 
    }},
    { field: 'startTime', headerName: 'Start Time', flex:1, valueFormatter: (params: GridValueFormatterParams) => {
        let timeString : string = params.value as string;
        return timeShortener(timeString); 
    } },
    { field: 'endTime', headerName: 'End Time', flex:1, valueFormatter: (params: GridValueFormatterParams) => {
        let timeString : string = params.value as string;
        return timeShortener(timeString); 
    } },
    { field: 'earnings', headerName: 'Earning', flex:1 },
    { field: 'actions', headerName: 'Actions', flex:1, type: 'actions', getActions: (params: GridRowParams) => [
        <GridActionsCellItem 
            icon={<Edit />} 
            onClick={() => {setFormModalOpenStatus(true, <LogForm />, () => openForm(params.id.toString()))}}
            label="Edit" />,
        
        <GridActionsCellItem 
        icon={<Delete />} 
        onClick={() => {
            openConfirmationModal({
                title:"Delete Log", 
                description:"Are you sure you want to delete this log?", 
                confirmationText: "Delete", 
                id: params.id.toString(), 
                confirmFunc: () => deleteLog(params.id.toString())})
            }} 
        label="Delete" />,
        ]
    }
    ], [deleteLog]);

    return(
        <div style={{ height: "80%", width: '100%'}}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1}}>                                        
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
                            onClick={() => {setFormModalOpenStatus(true, <LogForm />, setSelectedLog)}}
                            />
                            <SpeedDialAction 
                            key={"Export"}
                            icon={<FileDownload />}
                            tooltipTitle={"Export"}
                            onClick={() => {setFormModalOpenStatus(true, <ExportForm />, null)}}
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