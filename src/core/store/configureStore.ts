import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { ticketListReducer, ticketGroupReducer } from './reducer';
import thunk from 'redux-thunk';

const store = createStore(
    combineReducers({
        T: ticketListReducer,
        G: ticketGroupReducer
    }),
    applyMiddleware(thunk)
);

export const ConfigureStore = () => {
    return store;
}; // Cấu hình store redux