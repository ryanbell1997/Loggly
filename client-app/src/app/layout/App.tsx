import React, { Fragment } from 'react';
import NavBar from './NavBar';
import LogTable from '../../features/Log/LogTable';
import LogForm from '../../features/Log/LogForm';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/Dashboard/homepage';

function App() {
  const location = useLocation();

  return (
    <Fragment>
        <LogForm />
        <NavBar />
        <Route exact path='/' component={HomePage} />
        <Route exact path='/log' component={LogTable} />
        {/* location.key to clear fields. Key changes.*/}
    </Fragment>
  );
}

export default observer(App);
