import HandleFilter from '../../modules/handleTicketData';
import { AddData, UpdateData } from '../dummyData/firebase/config';
import { actionProps } from './actionCreators';
import * as ActionTypes from './actionTypes';

export const ticketListReducer = (state = { ticket: [], search: [] } , action: actionProps) => {
    switch (action.type) { // Xử lý các hành vi
        case (ActionTypes.ADD_TICKET_LIST):
            let datas = action.payload;
        return { ...state, ticket: datas };

        case (ActionTypes.FILTER_TICKET_LIST):
            const filter: any = action.payload;
            const searchData = HandleFilter( filter, state.ticket )
        return { ...state, search: searchData };

        default: return state;
    }
};

const initStateGroup: any = { group: [], search: [] }

export const ticketGroupReducer = (state = initStateGroup , action: actionProps) => {
    switch (action.type) { // Xử lý các hành vi
        case (ActionTypes.ADD_TICKET_GROUPS):
            const datas = action.payload;
        return { ...state, group: datas };

        case (ActionTypes.ADD_GROUP):
            const data1 = action.payload;
            AddData(data1);
        return { ...state, group: [ ...state.group, data1 ] };

        case (ActionTypes.UPDATE_GROUP):
            const data2 = action.payload;
            UpdateData(data2.data);
            const newState = { ...state };
            const i = newState.group.findIndex((a: any) => a.id === data2.id );
            newState.group[i] = data2.data;
        return { ...newState };

        default: return state;
    }
};