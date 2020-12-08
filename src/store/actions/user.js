import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_LOADED, LOADING_USER } from './actionTypes';
import { setMessage } from './message';
import axios from 'axios';

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
const API_KEY = 'AIzaSyAs57eIVdacg34XqQM27E0ex_COQEesNHQ';

const userLogged = user => ({ type: USER_LOGGED_IN, payload: { ...user } });

const logout = () => ({ type: USER_LOGGED_OUT });

const createUser = user => dispatch => {
    dispatch(loadingUser()); // Starts the loading
    axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
        email: user.email,
        password: user.password,
        returnSecure: true
    })
        .then(res => {
            if (res.data.localId) {
                axios.put(`/users/${res.data.localId}.json`, {
                    name: user.name
                })
                    .then(() => {
                        dispatch(login(user));
                        dispatch(setMessage({ title: 'Success!', text: 'User Create successfully!' }));
                    })
                    .catch(err => {
                        dispatch(setMessage({ title: 'Error!', text: err }));
                    });
            }
        })
        .catch(err => {
            dispatch(setMessage({ title: 'Error!', text: err }));
        });
}

const loadingUser = () => ({ type: LOADING_USER });

const userLoaded = () => ({ type: USER_LOADED });

const login = user => async dispatch => {
    dispatch(loadingUser());
    axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, { // Verify the password
        email: user.email,
        password: user.password,
        returnSecureToken: true
    })
        .then(res => {
            if (res.data.localId) { // Verify if the user is authenticated
                user.token = res.data.idToken;
                axios.get(`/users/${res.data.localId}.json`)
                    .then(res => {
                        delete user.password;
                        user.name = res.data.name
                        dispatch(userLogged(user));
                        dispatch(userLoaded());
                    })
                    .catch(err => {
                        dispatch(setMessage({ title: 'Error!', text: err }));
                    });
            }
        })
        .catch(err => {
            dispatch(setMessage({ title: 'Error!', text: err.message }));
        });
};

export { userLogged, logout, createUser, loadingUser, userLoaded, login }