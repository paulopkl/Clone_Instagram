import { ADD_COMMENT, SET_POSTS, CREATING_POSTS, POST_CREATED } from '../actions/actionTypes';

const initialState = {
    // posts: [
    //     { 
    //         id: Math.random() * 10, 
    //         nickname: 'Rafael Pereira Silva', 
    //         email: 'rafaelprrrgb@gmail.com',
    //         image: require('../../../assets/imgs/fence.jpg'),
    //         comments: [
    //             { nickname: 'John Ray Sheldon', comment: 'Stunning!' },
    //             { nickname: 'Ana Julia Arruda', comment: 'Beautiful photo! where was it taken' },
    //         ]
    //     },
    // ],
    posts: [],
    isUploading: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS: {
            return {
                ...state,
                posts: action.payload
            }
        }
        case ADD_COMMENT: {
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.postId) {
                        if (post.comments) {
                            post.comments = post.comments.concat(action.payload.comment);
                        } else {
                            post.comments = [action.payload.comment]
                        }
                    }
                    return post;
                })
                
            }
        }
        case CREATING_POSTS: {
            return {
                ...state,
                isUploading: true
            }
        }
        case POST_CREATED: {
            return {
                ...state,
                isUploading: false
            }
        }
        default: return state;
    }
}

export default reducer;