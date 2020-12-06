import { ADD_POST, ADD_COMMENT } from './actionTypes';

const addPost = post => ({
    type: ADD_POST,
    payload: post 
});

const addComment = payload => ({
    type: ADD_COMMENT,
    payload
})

export { addPost, addComment }