import React from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { GoogleLogin } from '@react-oauth/google';

const SignIn = () => {
const clientId = "1049557792860-j3nbo2dumlt621jbj22i6cf5u8juto1t.apps.googleusercontent.com"
  // Function to handle Google authentication
  const handleGoogleAuth = async (credential) => {
    const { tokenId, profileObj } = credential;
    // console.log(tokenId, profileObj)
    try {
      // Make a POST request to your backend API with the credential
      const response = await axios.post('http://localhost:8000/api/auth/google', { credential, client_id: clientId,
    //   image: credential.profileObj.picture,
    //   name: credential.profileObj.name 
    });
      // Handle successful response from the server
      console.log(response);
    } catch (error) {
      // Handle error
      console.error('Error authenticating with Google:', error);
    }
  };

  return (
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          handleGoogleAuth(credentialResponse.credential);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
  );
};

export default SignIn;
