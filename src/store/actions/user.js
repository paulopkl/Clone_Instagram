import { USER_LOGGED_IN, USER_LOGGED_OUT } from './actionTypes';

const login = user => ({
    type: USER_LOGGED_IN,
    payload: user
});

const logout = () => ({ type: USER_LOGGED_OUT });

export { login, logout }