import React from 'react';
import FacebookLogin from 'react-facebook-login';

export default function FacebookSignIn() {
 
    const responseFacebook = (response : any) => {
        console.log(response);
      }

    return(
        <FacebookLogin
        appId="1111680212571668"
        fields="name,email,picture"
        onClick={() => {}}
        callback={responseFacebook} />
    ) 
}