import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  const [logs, setLogs] = useState<any>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/logs').then(response => {
      console.log();
      setLogs(response.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Loggly.io'/>
        <List>
          {logs.map((log:any) => (
            <List.Item key={log.id}>
              {log.totalCharged}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
