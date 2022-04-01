import React, { Fragment, useEffect } from 'react';
import NavBar from './NavBar';
import LogTable from '../../features/Log/LogTable';
import LogForm from '../../features/Log/LogForm';
import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../features/Dashboard/homepage';
import UserAccount from '../../features/User/AccountSummary/UserAccount';
import UserSignIn from '../../features/User/SignIn/UserSignIn';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/Errors/NotFound';
import ServerError from '../../features/Errors/ServerError';
import RegistrationForm from '../../features/User/SignIn/RegistrationForm';
import { useStore } from '../stores/store';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import Modal from '../../features/Modal/ConfirmationModal';
import FormModal from '../../features/Modal/FormModal';

function App() {
  const {generalStore, userStore} = useStore();

  let theme =  createTheme({
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "Raleway, sans-serif"
          }
        }
      }
    },
    palette: {
      info: {
        main: "#787878"
      }
    },
    typography:{
      h6:{
        fontSize: '1.6rem', 
        '@media (max-width:600px)': {
          fontSize: '0.9rem'
        }
      }
    }
  })

  theme = responsiveFontSizes(theme);


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
      <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-left" hideProgressBar/>
        <NavBar />
        <FormModal />
        <Modal />
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
        </ThemeProvider>
    </Fragment>
  );
}

export default observer(App);
