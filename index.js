const redux = require('redux');
const createStore = redux.createStore;

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
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

// (previousState, action) => newState

const intialState = {
    numOfCake: 10,
}

const reducer = (state = intialState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCake: state.numOfCake - 1
        }
        default: return state
    }
}

const store = createStore(reducer);
 
console.log(`Store State: ${store.getState().numOfCake}`);

const unsubscribe = store.subscribe(() => {
    console.log(`Updated State: ${store.getState().numOfCake}`);
});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

unsubscribe();