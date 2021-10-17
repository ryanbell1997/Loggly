import React, { useEffect } from 'react';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams, GridRowsProp } from '@mui/x-data-grid';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { Add, Delete, Edit, FileDownload, Share } from '@mui/icons-material';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

export default observer(function LogTable(){
    const {logStore} = useStore();
    const {setEditing, tableLogs, deleteLog, loadLogs} = logStore;

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
            component={Link} 
            to={`/log/${params.id}`} 
            label="Edit" />,
        
        <GridActionsCellItem 
        icon={<Delete />} 
        onClick={() => {deleteLog(params.id.toString())}} 
        label="Delete" />,
        ]
    }
    ], [deleteLog]);

    return(
        <div style={{ height: 300, width: '100%'}}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid rows={rows} columns={columns} autoPageSize={true} autoHeight={true}/>
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'absolute', bottom: 100, right: 16 }}
                        icon={<SpeedDialIcon />}
                        >
                            <SpeedDialAction
                            key={"Add"}
                            icon={<Add />}
                            tooltipTitle={"Add"}
                            onClick={() => setEditing(true)}
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