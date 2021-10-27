import React, { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams, GridRowsProp } from '@mui/x-data-grid';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { SpeedDial, SpeedDialAction, SpeedDialIcon, TextField } from '@mui/material';
import { Add, Delete, Edit, FileDownload, Share } from '@mui/icons-material';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function LogTable(){
    const {logStore} = useStore();
    const {tableLogs, deleteLog, loadLogs, openForm, loading} = logStore;

    useEffect(() => {   
        loadLogs();
      }, [tableLogs])

    let rows: GridRowsProp = [...tableLogs];

    const [date, setDate] = useState();

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
        onClick={() => {deleteLog(params.id.toString())}} 
        label="Delete" />,
        ]
    }
    ], [deleteLog]);

    const handleDateChange = () => {

    }

    return(
        <div style={{ height: 300, width: '100%'}}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <TextField
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
                         />
                        
                    <DataGrid rows={rows} columns={columns} autoPageSize={true} autoHeight={true} loading={loading}/>
                    <SpeedDial
                        ariaLabel="logToolBar"
                        sx={{ position: 'absolute', bottom: 100, right: 16 }}
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