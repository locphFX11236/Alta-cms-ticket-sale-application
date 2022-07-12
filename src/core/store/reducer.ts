import { message } from 'antd';
import moment from 'moment';

import { HandleSearchData } from '../../shared/helper/handleTicketData';
import { AddData, UpdateData } from '../dummyData/firebase/config';
import { actionProps } from './reduxType';
import * as ActionTypes from './actionTypes';

export const ticketListReducer = (state = { ticket: [], search: [] } , action: actionProps) => {
    const coll = 'ticket-list';
    const data = action.payload;

    switch (action.type) { // Xử lý các hành vi
        case (ActionTypes.ADD_TICKET_LIST):
        return { ...state, ticket: data };

        case (ActionTypes.FILTER_TICKET_LIST):
            const searchData = HandleSearchData( data, state );
            if (searchData.length === 0) {message.error('Không tìm thấy!')};
        return { ...state, search: searchData };

        case (ActionTypes.CHANGE_EXPDATE_TICKET):
            const currState: any = state.ticket;
            const editObject = currState[data.index];
            editObject.expDate = data.expDate.format("YYYY-MM-DD");
            if (editObject.usingDate === '') {
                editObject.ticketStatus = data.expDate.isBefore(moment()) ? 'Hết hạn' : 'Chưa sử dụng'
            }
            UpdateData(editObject, coll);
        return { ...state, ticket: currState };

        case (ActionTypes.USE_TICKET):
            const currState1: any = state.ticket;
            const editObject1 = currState1[data.i];
            editObject1.ticketStatus = 'Đã sử dụng';
            editObject1.usingDate = moment().format('YYYY-MM-DD');
            UpdateData(editObject1, coll);
        return { ...state, ticket: currState1 };

        case (ActionTypes.CHECK_TICKET):
            const searchArray: any = data.searchArray;
            const idArray: any = data.idArray;
            idArray.forEach((id: any) => {
                const editObject2 = searchArray.find((s: any) => s.id === id);
                editObject2.checkStatus = 'Đã đối soát';
                UpdateData(editObject2, coll);
            });
        return { ...state };

        default: return state;
    }
};

const initStateGroup: any = { group: [], search: [] }

export const ticketGroupReducer = (state = initStateGroup , action: actionProps) => {
    const coll = 'ticket-group';
    const data = action.payload;

    switch (action.type) { // Xử lý các hành vi
        case (ActionTypes.ADD_TICKET_GROUPS):
        return { ...state, group: data };

        case (ActionTypes.ADD_GROUP):
            AddData(data, coll);
        return { ...state, group: [ ...state.group, data ] };

        case (ActionTypes.UPDATE_GROUP):
            UpdateData( data, coll );
            const i = state.group.findIndex((a: any) => a.id === data.id );
            state.group[i] = data;
        return { ...state };

        default: return state;
    }
};