import { message } from 'antd';
import moment from 'moment';

import { HandleSearchData } from '../../shared/helper/handleTicketData';
import { AddData, UpdateData } from '../dummyData/firebase/config';
import { actionProps } from './actionCreators';
import * as ActionTypes from './actionTypes';

export const ticketListReducer = (state = { ticket: [], search: [] } , action: actionProps) => {
    

    switch (action.type) { // Xử lý các hành vi
        case (ActionTypes.ADD_TICKET_LIST):
            let datas = action.payload;
        return { ...state, ticket: datas };

        case (ActionTypes.FILTER_TICKET_LIST):
            const filter = action.payload;
            const searchData = HandleSearchData( filter, state );
            if (searchData.length === 0) {message.error('Không tìm thấy!')};
        return { ...state, search: searchData };

        case (ActionTypes.CHANGE_EXPDATE_TICKET):
            const value = action.payload;
            const currState: any = state.ticket;
            const editObject = currState[value.index];
            editObject.expDate = value.expDate.format("YYYY-MM-DD");
            if (editObject.usingDate === '') {
                editObject.ticketStatus = value.expDate.isBefore(moment()) ? 'Hết hạn' : 'Chưa sử dụng'
            }
            UpdateData(editObject, "ticket-list");
        return { ...state, ticket: currState };

        case (ActionTypes.USE_TICKET):
            const value1 = action.payload;
            const currState1: any = state.ticket;
            const editObject1 = currState1[value1.i];
            editObject1.ticketStatus = 'Đã sử dụng';
            editObject1.usingDate = moment().format('YYYY-MM-DD');
            UpdateData(editObject1, "ticket-list");
        return { ...state, ticket: currState1 };

        case (ActionTypes.CHECK_TICKET):
            const value2 = action.payload;
            const searchArray: any = value2.searchArray;
            const idArray: any = value2.idArray;
            idArray.forEach((id: any) => {
                const editObject2 = searchArray.find((s: any) => s.id === id);
                editObject2.checkStatus = 'Đã đối soát';
                UpdateData(editObject2, "ticket-list");
            });
            console.log(state);
        return { ...state };

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
            const currGroup = state.group;
            data1.STT = currGroup.length;
            AddData(data1);
        return { ...state, group: [ ...state.group, data1 ] };

        case (ActionTypes.UPDATE_GROUP):
            const data2 = action.payload;
            UpdateData(data2.data, "ticket-group" );
            const newState = { ...state };
            const i = newState.group.findIndex((a: any) => a.id === data2.id );
            newState.group[i] = data2.data;
        return { ...newState };

        default: return state;
    }
};