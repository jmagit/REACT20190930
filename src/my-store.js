import { combineReducers, createStore } from "redux";

const INIT_STORE = "INIT_STORE";
export const InitStoreAction = () => ({
  type: INIT_STORE
});

// Contador >>>>>>>>>>>>>>>>>>>>>>
const COUNTER_UP = "COUNTER_UP";
const COUNTER_DOWN = "COUNTER_DOWN";

function contadorReducer(state = 0, action) {
  switch (action.type) {
    case COUNTER_UP:
      return state + 1;
    case COUNTER_DOWN:
      return state - 1;
    case INIT_STORE:
      return 0;
    default:
      return state;
  }
}

export const CounterUpAction = () => ({
  type: COUNTER_UP
});
export const CounterDownAction = () => ({
  type: COUNTER_DOWN
});

// Contador <<<<<<<<<<<<<<<<<<<<<<<<<<

// Otro >>>>>>>>>>>>>>>>>>>>>>
// const COUNTER_UP = 'COUNTER_UP';
// const COUNTER_DOWN = 'COUNTER_DOWN';

function OtroReducer(state = 0, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    // case COUNTER_UP:
    //     return state + 1;
    // case COUNTER_DOWN:
    //     return state - 1;
    default:
      return state;
    case INIT_STORE:
      return 0;
  }
}

// export const CounterUpAction = () => { type: COUNTER_UP };
// export const CounterDownAction = () => { type: COUNTER_DOWN };

// Otro <<<<<<<<<<<<<<<<<<<<<<<<<<

export const globalReducer = combineReducers({
  // …
  contador: contadorReducer,
  otro: OtroReducer
});

const initialState = { contador: 10 };
export const store = createStore(globalReducer, initialState);

export const CounterDownCmd = () => store.dispatch(CounterDownAction());
export const CounterUpCmd = () => store.dispatch(CounterUpAction());
export const InitStoreCmd = () => store.dispatch(InitStoreAction());

store.CounterUp = () => store.dispatch(CounterUpAction());
