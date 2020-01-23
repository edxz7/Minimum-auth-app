import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {GET_ERRORS, USER_LOADING, SET_CURRENT_USER} from './types';

// register user

export const registerUser = (userData, history) => dispatch => {
    axios.post("/api/users/register", userData)
    .then(res => {
        history.push("/login")
    }) //redirect to login in succesful register
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
}

// Login - get user token
export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
    .then(res => {
        // save token to local storage
        const { token } = res.data;
        localStorage.setItem('jwtToken', JSON.stringify(token))
        // set token to auth header
        setAuthToken(token);
        // decode user token to get user data
        const decoded = jwt_decode(token);
        // set current user
        dispatch(setCurrentUser(decoded));
    })
    .catch(err=>{
        dispatch({ type:GET_ERRORS, payload:err.response.data })
    })
}

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// User loading
export const setUserLoading = () => {
    return {
      type: USER_LOADING
    };
  };

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem('jwtToken')
    // Remove auth header for future requests
    setAuthToken(false)
    // set current user to an empty object
    dispatch(setCurrentUser({}))
}