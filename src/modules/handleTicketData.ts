import moment from "moment";

const HandleFilter = (filter: any, ticket: any) => {
    const values = {
        bookingCode: filter.bookingCode ? filter.bookingCode : 'Tất cả',
        ticketStatus: filter.ticketStatus ? filter.ticketStatus : 'Tất cả',
        dateFrom: filter.dateFrom ? filter.dateFrom : 'Tất cả',
        dateTo: filter.dateTo ? filter.dateTo : 'Tất cả',
        checkInGate: filter.checkInGate ? filter.checkInGate : ['Tất cả'],
        useDateFrom: filter.dateFrom ? filter.dateFrom : 'Tất cả',
        useDateTo: filter.dateTo ? filter.dateTo : 'Tất cả',
        checkStatus: filter.checkStatus === 'Tất cả' ? 'Tất cả' : filter.checkStatus
    };
    const bookingCode = (a: any) => {
        if (values.bookingCode === 'Tất cả') { return true }
        else { return a.bookingCode.includes(values.bookingCode) }
    };
    const momentBetween1 = (a: any) => {
        if (values.dateFrom === 'Tất cả' && values.dateTo === 'Tất cả') { return true }
        else { return moment(a.saledDate).isBetween( values.dateFrom, values.dateTo) }
    };
    const momentBetween2 = (a: any) => {
        if (values.useDateFrom === 'Tất cả' && values.useDateTo === 'Tất cả') { return true }
        else { return moment(a.usingDate).isBetween( values.useDateFrom, values.useDateTo) }
    };
    const ticketStatus = (a: any) => {
        if (values.ticketStatus === 'Tất cả') { return true }
        else { return values.ticketStatus === a.ticketStatus }
    };
    const checkInGate = (a: any) => {
        if (values.checkInGate.indexOf('Tất cả') === 0) { return true }
        else { 
            let check = values.checkInGate.indexOf(a.checkInGate);
            return check === -1 ? false: true
        };
    };
    const checkStatus = (a: any) => {
        if (values.checkStatus === 'Tất cả') { return true }
        else { return values.checkStatus === a.checkStatus }
    };
    const searchData = ticket.filter((a: any) => (
        checkInGate(a) &&
        ticketStatus(a) &&
        momentBetween1(a) &&
        bookingCode(a) &&
        momentBetween2(a)&&
        checkStatus(a)
    ));
    return searchData;
};

export default HandleFilter;