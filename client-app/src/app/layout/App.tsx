import React, { Fragment } from 'react';
import NavBar from './NavBar';
import LogTable from '../../features/Log/LogTable';
import LogForm from '../../features/Log/LogForm';
import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../features/Dashboard/homepage';
import UserAccount from '../../features/User/UserAccount';
import UserSignIn from '../../features/User/UserSignIn';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/Errors/NotFound';

function App() {

  return (
    <Fragment>
        <ToastContainer position="bottom-left" hideProgressBar/>
        <LogForm />
        <NavBar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/log' component={LogTable} />
          <Route path='/user/account' component={UserAccount} />
          <Route path='/user/signin' component={UserSignIn} />
          <Route component={NotFound} />
        </Switch>
        {/* location.key to clear fields. Key changes.*/}
    </Fragment>
  );
}

export default observer(App);
