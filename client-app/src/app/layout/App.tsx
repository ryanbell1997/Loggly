import React, { Fragment } from 'react';
import NavBar from './NavBar';
import LogTable from '../../features/Log/LogTable';
import LogForm from '../../features/Log/LogForm';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import HomePage from '../../features/Dashboard/homepage';
import UserAccount from '../../features/User/UserAccount';
import UserSignIn from '../../features/User/UserSignIn';

function App() {

  return (
    <Fragment>
        <LogForm />
        <NavBar />
        <Route exact path='/' component={HomePage} />
        <Route exact path='/log' component={LogTable} />
        <Route path='/user/account' component={UserAccount} />
        <Route path='/user/signin' component={UserSignIn} />
        {/* location.key to clear fields. Key changes.*/}
    </Fragment>
  );
}

export default observer(App);
