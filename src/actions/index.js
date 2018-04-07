


import axios from 'axios';
//Note browserHistory is not available in react-router v4.
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE} from './types';

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

export function signupUser ({email, password}){
  // Submit email/password to the server
  return function (dispatch){
    axios.post(`${ROOT_URL}/signup`,{email, password})
    .then(response => {
      dispatch({ type: AUTH_USER});
      localStorage.setItem('token', response.data.token );
      //Note browserHistory is not available in react-router v4 need an alternative plan
      browserHistory.push('/feature');
     })
    .catch(err =>  dispatch(authError(err.response.data.error)));
  }
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
export function signoutUser(){
  localStorage.removeItem('token');
  return { type: UNAUTH_USER}
}

export function fetchMessage(){
  // we could use redux-promise but we are using redux thunk
  // either one is valid.
  return function (dispatch){
    //This is how to make a request to the back end.
    axios.get(`${ROOT_URL}`,{headers: {authorization: localStorage.getItem('token')}})
    .then(response => {
      //use redux-thunk again
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      })
    });
  }
}


//redux promise is much easier
//Here is a psudo of what it would look like with redux promise
// export function fetchMessage()
// const request = axios.get(`${ROOT_URL}`,{headers: {authorization: localStorage.getItem('token')}});
// return{
//   type: FETCH_MESSAGE,
//   payload: request
// };
// }

