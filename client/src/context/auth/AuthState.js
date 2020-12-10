import  React, {useReducer} from 'react';
import {v4 as uuid} from 'uuid';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from "../../utils/setAuthToken";
import axios from 'axios'
import {
REGISTER_SUCCESS,
REGISTER_FAIL,
USER_LOADED,
AUTH_ERROR,
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT,
CLEAR_ERRORS
} from '../types';

const AuthState = props => {
    const initialState ={
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const registerUser = async formData => {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        try{
            const response = await axios.post('api/users', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            })
        }
        catch (error){
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.errorCode
            })
        }
    }

    const login = async formData => {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        try{
            const response = await axios.post('api/auth', formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })
        }
        catch (error){
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.errorCode
            })
            console.log(error.response.data)
            console.log(error.response.data.errorCode)
        }
    }

    const logout = () => dispatch({type: LOGOUT})

    const loadUser = async () => {
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }
        try{
            const response = await axios.get('/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: response.data
            })

            await loadUser();
        }
        catch (error){
            dispatch({
                type: AUTH_ERROR
            })
        }
    }

    const clearErrors = () => dispatch ({
        type: CLEAR_ERRORS
    })

    return (
        <AuthContext.Provider
            value={
                {
                    token: state.token,
                    isAuthenticated: state.isAuthenticated,
                    loading: state.loading,
                    user: state.user,
                    error: state.error,
                    registerUser,
                    clearErrors,
                    loadUser,
                    login,
                    logout,
                    REGISTER_SUCCESS,
                    REGISTER_FAIL,
                    USER_LOADED,
                    AUTH_ERROR,
                    LOGIN_SUCCESS,
                    LOGIN_FAIL,
                    LOGOUT,
                    CLEAR_ERRORS
                }
            }>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;