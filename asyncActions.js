const redux = require('redux');
const createStore = redux.createStore;
const appleMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

// 1. Initial state

const initialState = {
    loading: false,
    data: [],
    error: ''
}

// 2. action types
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// 3. action creator: will return action type
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}
const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}
const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}
// action creator returns a object, but with the help of redux-thunk, we can return a function
const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users1').then(response => {
            // response.data is the array of users
            const users = response.data.map(user => user.id);
            dispatch(fetchUsersSuccess(users));
        }).catch(error => {
            // error.message is the error description
            dispatch(fetchUsersFailure(error.message));
        })
    }
}

// 4. reducer
const reducer = (state = initialState, action) => {
    console.log('action type :', action.type)
    switch(action.type) {
        case FETCH_USERS_REQUEST: return {
            ...state,
            loading: true
        }
        case FETCH_USERS_SUCCESS: return {
            ...state,
            loading: false,
            users: action.payload,
            error: ''
        }
        case FETCH_USERS_FAILURE: return {
            ...state,
            loading: false,
            users: [],
            error: action.payload
        }
        default: return 'Default'
    }
}

// 5. store
const store = createStore(reducer, appleMiddleware(thunkMiddleware));
console.log(store.getState());
const unsubscribe = store.subscribe(() => {console.log(store.getState())});
store.dispatch(fetchUsers());

unsubscribe();