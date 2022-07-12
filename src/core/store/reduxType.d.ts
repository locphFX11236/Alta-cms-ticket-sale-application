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
    groupName: String,
    usingDate: String,
    expDate: String,
    costTicket: Number,
    costCombo: {
        cost: Number,
        SL: Number
    } | {},
    status: Boolean
};

export type datasProps = Array<docProps1 | docProps2 | null>;

export type actionProps = {
    type: String,
    payload: any
};