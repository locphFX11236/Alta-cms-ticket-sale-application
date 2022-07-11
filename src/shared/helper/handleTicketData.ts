import moment from "moment";

export const HandleTicketFilter = (values: any) => {
    const ticketFilter: any = {
        saleDate: {
            from: values.saleDateFrom ? values.saleDateFrom : 'all',
            to: values.saleDateTo ? values.saleDateTo : 'all',
        },
        checkInGate: values.checkInGate ? values.checkInGate : 'all',
        ticketStatus: values.ticketStatus ? values.ticketStatus : 'all',
        ticketNum: values.ticketNum ? values.ticketNum : 'all',
        checkStatus: values.checkStatus ? values.checkStatus : 'all'
    };
    return ticketFilter;
};

export const HandleSearchData = (filter: any, state: any) => {
    const checkInGate = (v: any) => {
        if (filter.checkInGate === 'all') { return true }
        else { return filter.checkInGate.indexOf(v) === -1 ? false: true };
    };
    const saleDate = (v: any) => {
        if (filter.saleDate.from === 'all' && filter.saleDate.to === 'all') { return true }
        else { return moment(v).isBetween( filter.saleDate.from, filter.saleDate.to ) };
    };
    const ticketStatus = (v: any) => {
        if (filter.ticketStatus === 'all') { return true }
        else { return filter.ticketStatus === v };
    };
    const ticketNum = (v: any) => {
        if (filter.ticketNum === 'all') { return true }
        else { return v.includes(filter.ticketNum) };
    };
    const checkStatus = (v: any) => {
        if (filter.checkStatus === 'all') { return true }
        else { return filter.checkStatus === v }
    };
    const searchData = state.ticket.filter((t: any) => (
        checkInGate(t.checkInGate) &&
        saleDate(t.saledDate) &&
        ticketStatus(t.ticketStatus) &&
        ticketNum(t.ticketNum.toString()) &&
        checkStatus(t.checkStatus)
    ));
    return searchData
}