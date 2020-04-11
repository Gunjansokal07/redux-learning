const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
// const applyMiddleware =redux.applyMiddleware();
// when you describe the const u dont use () only redux.applyMiddleWare

const logger = reduxLogger.createLogger();

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAME = 'BUY_ICECREAME';

function buyCake() {
    return{
        type: BUY_CAKE,
        info: 'First redux action'
    }
}
function buyIceCreame() {
    return{
        type: BUY_ICECREAME,
    }
}

// (previousState, action) => newState

const intialCakeState = {
    numOfCake: 10,
}

const intialIceCreameState = {
    numOfIceCreame: 10,
}

const cakeReducer = (state = intialCakeState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCake: state.numOfCake - 1
        }
        default: return state
    }
}

const iceCreameReducer = (state = intialIceCreameState, action) => {
    switch(action.type) {
        case BUY_ICECREAME: return {
            ...state,
            numOfIceCreame: state.numOfIceCreame - 1
        }
        default: return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCreame: iceCreameReducer
})

const store = createStore(rootReducer, applyMiddleware(logger));
 
// console.log(`Initial State: ${store.getState()}`);
console.log('Initial State:', store.getState());

const unsubscribe = store.subscribe(() => {
    // console.log('Updated State: ', store.getState());
    // console.log(`Updated State: ${store.getState()}`);
});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCreame());
store.dispatch(buyIceCreame());
store.dispatch(buyIceCreame());

unsubscribe();