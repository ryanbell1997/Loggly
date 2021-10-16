import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItemText, ListItem } from '@mui/material';
import { Log } from './models/log';
import NavBar from './NavBar';
import LogTable from '../../features/Log/LogTable';
import { GridRowData } from '@mui/x-data-grid';
import LogForm from '../../features/Log/LogForm';


function App() {

  const [logs, setLogs] = useState<GridRowData[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let data : GridRowData[] = [];

    axios.get<Log[]>('http://localhost:5000/api/logs').then(response => {
      response.data.forEach(log=> {
        data.push({id: log.id, date: log.date, startTime: log.startTime, endTime: log.endTime, earnings: log.totalCharged})
      })
      setLogs(data);
    })
    }, [])

  function handleMenuShow(isOpen: boolean){
    isOpen ? setShowMenu(false) : setShowMenu(true)
  }

  function handleFormShow(isOpen: boolean){
    isOpen ? setShowForm(false) : setShowForm(true);
    console.log(`Hello`);
  }

  return (
    <Fragment>
        <LogForm handleFormShow={handleFormShow} isOpen={showForm}/>
        <NavBar handleMenuShow={handleMenuShow} isOpen={showMenu}/>
        <LogTable logs={logs} handleFormShow={handleFormShow} isFormOpen={showForm}/>
    </Fragment>
  );
}

export default App;
