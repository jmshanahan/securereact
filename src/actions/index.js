import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({email, password}){
  // Submit email/password to the server
  return function (dispatch){
    axios.post(`${ROOT_URL}/signin`,{email, password})
    .then(response => {
    //if request is good
    // - Update state to indicate user is authenticated
    // This is redux-thunk in action ie calling the dispatch method
    dispatch({ type: AUTH_USER});

    // - Save the JWT token
    localStorage.setItem('token', response.data.token );
    // -redirect to the route '/feature'
      browserHistory.push('/feature');
  })
    .catch(() => {
    //if request is bad...
    // - Show an error to the user
      // dispatch(authError('Bad Login Info'));
      dispatch(authError('Bad Login info'));
    });
  }
}
export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
