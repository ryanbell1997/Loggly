import React, { Fragment, useEffect } from 'react';
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
import ServerError from '../../features/Errors/ServerError';
import RegistrationForm from '../../features/User/RegistrationForm';
import { useStore } from '../stores/store';

function App() {
  const {generalStore, userStore} = useStore();

  useEffect(() => {
    if (generalStore.token){
      userStore.getUser().finally(() => generalStore.setAppLoaded());
    } else {
      generalStore.setAppLoaded();
    }
  }, [generalStore, userStore])

  if(!generalStore.appLoaded) return (<div><p>Loading...</p></div>)

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
          <Route path='/user/register' component={RegistrationForm} />
          <Route path='/server-error' component={ServerError} />
          <Route component={NotFound} />
        </Switch>
        {/* location.key to clear fields. Key changes.*/}
    </Fragment>
  );
}

export default observer(App);
