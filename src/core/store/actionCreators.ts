import { Dispatch } from 'redux';

import { dataPending } from '../dummyData/firebase/config';
import * as ActionTypes from './actionTypes';
import { actionProps, datasProps } from './reduxType';

export const addTicketLists = (datas: datasProps): actionProps => ({
    type: ActionTypes.ADD_TICKET_LIST,
    payload: datas
}); // Object quy định reducer xử lý action

export const FilterTicketList = (value: any): actionProps => ({
    type: ActionTypes.FILTER_TICKET_LIST,
    payload: value
}); // Object quy định reducer xử lý action

export const ChangeExpDate = (value: any): any => ({
    type: ActionTypes.CHANGE_EXPDATE_TICKET,
    payload: value
});

export const UsingTicketAction = (value: any): any => ({
    type: ActionTypes.USE_TICKET,
    payload: value
});

export const CheckTicketAction = (value: any): any => ({
    type: ActionTypes.CHECK_TICKET,
    payload: value
});

export const addTicketGroups = (datas: datasProps): actionProps => ({
    type: ActionTypes.ADD_TICKET_GROUPS,
    payload: datas
}); // Object quy định reducer xử lý action

export const AddGroup = (data: any): any => ({
    type: ActionTypes.ADD_GROUP,
    payload: data
}); // Object quy định reducer xử lý action

export const UpdateGroup = (data: any): any => ({
    type: ActionTypes.UPDATE_GROUP,
    payload: data
});

export const getDatas = () => 
    async (dispatch: Dispatch<actionProps>) => { // Hành vi dispatch quy định bởi redux-thunk bắt lấy các hành động để reducer thực hiện
        return dataPending()
            .then((datas: any) => {
                dispatch( addTicketLists(datas.ticketList) ) // Gửi kết quả lấy được đến action addTicketList
                dispatch( addTicketGroups(datas.ticketGroup) ) // Gửi kết quả lấy được đến action addDatas
            })
            .catch( err => console.log(err) )
        ;
    } // Action getDatas lấy data từ Promise async/wait
;