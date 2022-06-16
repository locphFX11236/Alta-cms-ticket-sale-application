import { datasProps, actionProps } from './actionCreators';
import * as ActionTypes from './actionTypes';

const initialState: datasProps = []; // Khởi tạo state ban đầu

export const ticketListReducer = (state = initialState , action: actionProps) => {
    switch (action.type) { // Xử lý các hành vi
        case (ActionTypes.ADD_TICKET_LISTS):
            let datas = action.payload;
            return state = datas;

        default: return state;
    }
};

export const ticketGroupReducer = (state = initialState , action: actionProps) => {
    switch (action.type) { // Xử lý các hành vi
        case (ActionTypes.ADD_TICKET_GROUPS):
            let datas = action.payload;
            return state = datas;

        default: return state;
    }
};