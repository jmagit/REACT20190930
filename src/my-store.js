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
// Notificaciones >>>>>>>>>>>>>>>>>>>>>>>>

function notificationReducer(
  state = { listado: [], hayNotificaciones: false },
  action
) {
  switch (action.type) {
    case "ADD_NOTIFY":
      return Object.assign({}, state, {
        listado: [...state.listado, action.value],
        hayNotificaciones: true
      });
    case "DELETE_NOTIFY":
      let lst = state.listado.filter((item, index) => index !== action.index);
      return Object.assign({}, state, {
        listado: lst,
        hayNotificaciones: lst.length > 0
      });
    case "CLEAR_ALL_NOTIFY":
    case INIT_STORE:
      return Object.assign({}, state, {
        listado: [],
        hayNotificaciones: false
      });
    default:
      return state;
  }
}
export const AddNotifyAction = data => ({ type: "ADD_NOTIFY", value: data });
export const DeleteNotifyAction = index => ({
  type: "DELETE_NOTIFY",
  index: index
});
export const ClearNotifyAction = () => ({ type: "CLEAR_ALL_NOTIFY" });
// Notificaciones <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const globalReducer = combineReducers({
  notify: notificationReducer,
  contador: contadorReducer,
  otro: OtroReducer
});

const initialState = { contador: 10 };
export const store = createStore(globalReducer, initialState);

export const CounterDownCmd = () => store.dispatch(CounterDownAction());
export const CounterUpCmd = () => store.dispatch(CounterUpAction());
export const InitStoreCmd = () => store.dispatch(InitStoreAction());

export const AddNotifyCmd = data => store.dispatch(AddNotifyAction(data));
export const AddErrNotifyCmd = error => {
  let msg = error;
  if (error.response) {
    msg = `${error.response.status} ${error.response.statusText}: ${error.message}`;
  } else if (error.request || error.message) {
    msg = error.message;
  }
  AddNotifyCmd("ERROR: " + msg);
};
export const DeleteNotifCmd = index =>
  store.dispatch(DeleteNotifyAction(index));
export const ClearNotifyCmd = () => store.dispatch(ClearNotifyAction());

store.CounterUp = () => store.dispatch(CounterUpAction());
store.AddNotify = data => store.dispatch(AddNotifyAction(data));
