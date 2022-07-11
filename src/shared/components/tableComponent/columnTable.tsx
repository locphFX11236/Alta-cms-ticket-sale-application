import type { ColumnsType } from 'antd/lib/table';

import PopoverMore from '../popoverMore/popoverMore';
import StatusButton from '../statusButton/statusButton';
import UpdateGroupModal from '../modalComponent/updateGroupModal';

type TicketProps = {
    id: String;
    key: Number;
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
    key: Number;
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
    {   title: "STT",                       dataIndex: "key",           key: "key"              },
    {   title: "Booking code",              dataIndex: "bookingCode",   key: "bookingCode"      },
    {   title: "Số vé",                     dataIndex: "ticketNum",     key: "ticketNum"        },
    {   title: "Tên sự kiện",               dataIndex: "event",         key: "event"            },
    {
        title: "Tình trạng sử dụng",        dataIndex: "ticketStatus",  key: "ticketStatus",
        render: (v) => <StatusButton text={v} />
    },
    {   title: "Ngày sử dụng",              dataIndex: "usingDate",     key: "usingDate"        },
    {   title: "Ngày xuất vé",              dataIndex: "saledDate",     key: "saledDate"        },
    {   title: "Cổng check-in",             dataIndex: "checkInGate",   key: "checkInGate"      },
    {
        title: "",                          dataIndex: "ticketNum",
        render: (value: any, record: any, index: number) => <PopoverMore record={record} index={index}/>
    }
];

export const ColumnCheckTicket: ColumnsType<TicketProps> = [
    {   title: "STT",                       dataIndex: "key",           key: "key"              },
    {   title: "Số vé",                     dataIndex: "ticketNum",     key: "ticketNum"        },
    {   
        title: "Ngày sử dụng",              dataIndex: "usingDate",     key: "usingDate",
        render: (v) => {
            if (v === '') return '-'
            else return v
        }
    },
    {   title: "Tên loại vé",               dataIndex: "typeTicket",    key: "typeTicket"       },
    {   title: "Cổng check-in",             dataIndex: "checkInGate",   key: "checkInGate"      },
    {
        title: "",                          dataIndex: "checkStatus",   key: "checkStatus",
        render: (v) => {
            if (v === 'Đã đối soát') return <p className='check-status-t'>{v}</p>
            else return <p className='check-status-f'>{v}</p>
        }
    }
];

export const ColumnSetGroup: ColumnsType<GroupTicketProps> = [
    {   title: "STT",                       dataIndex: "key",           key: "key"              },
    {   title: "Mã gói",                    dataIndex: "groupCode",     key: "groupCode"        },
    {   title: "Tên gói vé",                dataIndex: "groupName",     key: "groupName"        },
    {   title: "Ngày áp dụng",              dataIndex: "applicableDate",key: "applicableDate"   },
    {   title: "Ngày hết hạn",              dataIndex: "expDate",       key: "expDate"          },
    {   title: "Giá vé (VNĐ/Vé)",           dataIndex: "costTicket",    key: "costTicket"       },
    {
        title: "Giá Combo (VNĐ/Combo)",     dataIndex: "costCombo",     key: "costCombo",
        render: (v) => {
            if (!v.cost) return '-'
            else return `${v.cost} VNĐ/${v.quantity} vé`;
        }
    },
    {
        title: "Tình trạng",                dataIndex: "status",        key: "status",
        render: (value) => <StatusButton text={value} />
    },
    {
        title: "",                          dataIndex: "groupCode",     key: "groupCode",
        render: (value: any, record: any, index: number) => <UpdateGroupModal record={record}/>
    }
];