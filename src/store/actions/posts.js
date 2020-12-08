import { SET_POSTS, ADD_COMMENT, CREATING_POSTS, POST_CREATED } from './actionTypes';
import { setMessage } from './message';
import axios from 'axios';

const addPost = post => (dispatch, getState) => {
    dispatch(creatingPost())
    // https://us-central1-lambe-ce038.cloudfunctions.net/uploadImage
    axios({
        url: 'uploadImage',
        baseURL: 'https://us-central1-lambe-ce038.cloudfunctions.net',
        method: 'post',
        data: { image: post.image.base64 }
    })
        .then(response => {
            post.image = response.data.url;

            // "axios.defaults.baseURL()" Database RealTime
            axios.post(`/posts.json?auth=${getState().user.token}`, { ...post })
                .then(res => {
                    dispatch(fetchPosts());
                    dispatch(postCreated());
                })
                .catch(err => {
                    dispatch(setMessage({ title: 'Error!', text: err }));
                });
        })
        .catch(err => {
            dispatch(setMessage({ title: 'Error!', text: 'Occurs an unexpected error' }));
        });
};

const addComment = payload => (dispatch, getState) => {
    axios.get(`/posts/${payload.postId}.json`)
        .then(res => {
            const comments = res.data.comments || []; // /posts/[ID].json
            comments.push(payload.comment); // [{ ... }]

            axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { comments: comments })
                .then(res => {
                    dispatch(fetchPosts());
                })
                .catch(err => {
                    dispatch(setMessage({ title: 'Error!', text: err }));
                });
        })
        .catch(err => {
            dispatch(setMessage({ title: 'Error!', text: err }));
        })
};

const fetchPosts = () => async dispatch => {
    await axios.get('/posts.json')
        .then(res => {
            const rawPosts = res.data;
            const posts = [];
            for (let key in rawPosts) {
                posts.push({
                    ...rawPosts[key],
                    id: key
                });
            }

            // launch the action
            // [{ id: 2, ... }, { id: 1, ... }, { id: 0, ... }]
            dispatch({ type: SET_POSTS, payload: posts.reverse() }); 
        })
        .catch(err => {
            dispatch(setMessage({ title: 'Error!', text: err }));
        })
};

const creatingPost = () => ({ type: CREATING_POSTS });

const postCreated = () => ({ type: POST_CREATED });

export { addPost, addComment, fetchPosts, creatingPost, postCreated }