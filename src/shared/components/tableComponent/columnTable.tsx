import type { ColumnsType } from 'antd/lib/table';

import PopoverMore from '../popoverMore/popoverMore';
import StatusButton from '../statusButton/statusButton';
import UpdateGroupModal from '../modalComponent/updateGroupModal';

type TicketProps = {
    STT: Number;
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

type GroupTicketProps = {
    id: String;
    STT: Number;
    groupCode: String;
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

export const ColumnTicketList: ColumnsType<TicketProps> = [
    { title: "STT", dataIndex: "STT" },
    { title: "Booking code", dataIndex: "bookingCode" },
    { title: "Số vé", dataIndex: "ticketNum" },
    { title: "Tên sự kiện", dataIndex: "event" },
    {
        title: "Tình trạng sử dụng",
        dataIndex: "ticketStatus",
        render: (t) => <StatusButton text={t} />
    },
    { title: "Ngày sử dụng", dataIndex: "usingDate" },
    { title: "Ngày xuất vé", dataIndex: "saledDate" },
    { title: "Cổng check-in", dataIndex: "checkInGate" },
    {
        dataIndex: "ticketNum",
        render: (value: any, record: any, index: number) => <PopoverMore record={record}/>
    }
];

export const ColumnCheckTicket: ColumnsType<TicketProps> = [
    { title: "STT", dataIndex: "STT" },
    { title: "Số vé", dataIndex: "ticketNum" },
    { title: "Ngày sử dụng", dataIndex: "usingDate" },
    { title: "Tên loại vé", dataIndex: "typeTicket" },
    { title: "Cổng check-in", dataIndex: "checkInGate" },
    {
        dataIndex: "checkStatus",
        render: (s) => {
            if (s) return <p className='check-status-t'>Đã đối soát</p>
            else return <p className='check-status-f'>Chưa đối soát</p>
        }
    }
];

export const ColumnSetGroup: ColumnsType<GroupTicketProps> = [
    { title: "STT", dataIndex: "STT" },
    { title: "Mã gói", dataIndex: "groupCode" },
    { title: "Tên gói vé", dataIndex: "groupName" },
    { title: "Ngày áp dụng", dataIndex: "applicableDate" },
    { title: "Ngày hết hạn", dataIndex: "expDate" },
    { title: "Giá vé (VNĐ/Vé)", dataIndex: "costTicket" },
    {
        title: "Giá Combo (VNĐ/Combo)",
        dataIndex: "costCombo",
        render: (c) => {
            if (!c.cost) return '-';
            else return `${c.cost} VNĐ/${c.quantity} vé`;
        }
    },
    {
        title: "Tình trạng",
        dataIndex: "status",
        render: (value) => <StatusButton text={value} />
    },
    {
        dataIndex: "groupCode",
        render: (value: any, record: any, index: number) => <UpdateGroupModal record={record}/>
    }
];