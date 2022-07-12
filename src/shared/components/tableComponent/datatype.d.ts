export type TicketProps = {
    key: Number;
    id: String;
    bookingCode: String;
    ticketNum: Number;
    event: String;
    tikectStatus: String;
    typeTicket: String;
    usingDate: String;
    saledDate: String;
    checkStatus: Boolean;
    checkInGate: String;
    expDate: String;
};

export type GroupTicketProps = {
    key: Number;
    id: String;
    groupName: String;
    applicableDate: String;
    expDate: String;
    status: String;
    costTicket: Number;
    costCombo: {
        cost: Number,
        quantity: Number
    } | {};
};