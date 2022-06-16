import { Dispatch } from 'redux';

import { dataPending } from '../dummyData/firebase/config';
import * as ActionTypes from './actionTypes';

export type docProps1 = {
    STT: Number;
    bookingCode: String;
    ticketNum: Number;
    event: String;
    tikectStatus: Boolean;
    typeTicket: String;
    usingDate: String;
    saledDate: String;
    checkStatus: Boolean;
    checkInGate: String;
};

export type docProps2 = {
    STT: Number,
    groupCode: String,
    groupName: String,
    usingDate: String,
    expDate: String,
    costTicket: Number,
    costCombo: {
        cost: Number,
        SL: Number
    } | {},
    status: Boolean
}

export type datasProps = Array<docProps1 | docProps2 | null>

export type actionProps = {
    type: String,
    payload: datasProps
}

export const addTicketLists = (datas: datasProps): actionProps => ({
    type: ActionTypes.ADD_TICKET_LISTS,
    payload: datas
}) // Object quy định reducer xử lý action

export const addTicketGroups = (datas: datasProps): actionProps => ({
    type: ActionTypes.ADD_TICKET_GROUPS,
    payload: datas
}) // Object quy định reducer xử lý action

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