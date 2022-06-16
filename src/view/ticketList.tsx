import { Space, Input, Button, Table, Popover, Menu } from 'antd';
import Icon, { MoreOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import { Link } from "react-router-dom";

import { Filter } from '../shared/assets/icon/iconSvg';
import ModalBox1 from '../shared/components/modal1';
import ModalBox2 from '../shared/components/modal2';
// import CalendarModal from '../shared/components/calendar';

type dataProps = {
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

const content = (
    <Menu>
        <Menu.Item className='menu-item' key="home" title="Trang chủ">
            <Link to="/">
                <span className='item-text'>Sử dụng vé</span>
            </Link>
        </Menu.Item>
        <Menu.Item className='menu-item'>
            <ModalBox2 />
        </Menu.Item>
    </Menu>
);

const dropDown = () => (
    <Popover
        placement="left"
        content={content}
        trigger="click"
    >
        <MoreOutlined />
    </Popover>
);

const Column = [
    { title: "STT", dataIndex: "STT" },
    { title: "Booking code", dataIndex: "bookingCode" },
    { title: "Số vé", dataIndex: "ticketNum" },
    { title: "Tên sự kiện", dataIndex: "event" },
    { title: "Tình trạng sử dụng", dataIndex: "tikectStatus" },
    { title: "Ngày sử dụng", dataIndex: "usingDate" },
    { title: "Ngày xuất vé", dataIndex: "saledDate" },
    { title: "Cổng check-in", dataIndex: "checkInGate" },
    {
        dataIndex: "ticketNum",
        render: () => dropDown(),
    }
];

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const columns: ColumnsType<dataProps> = Column;

const TicketList = ({db}: any) => (
    <>
        <h1>Danh sách vé</h1>
        <Space className='content-nav' direction="horizontal">
            <Search placeholder="Search" allowClear onSearch={onSearch} style={{ width: 200 }} />
            <div className='buttonGroup'>
                <ModalBox1 component={ <Icon component={Filter}/> } />
                <Button
                    type="primary" ghost
                    onClick={() => console.log('Clicked')}
                >
                    Xuất file (.csv)
                </Button>
            </div>
        </Space>
        <Table columns={columns} pagination={ { position: ['bottomCenter'] } } dataSource={db} />
    </>
);

export default TicketList;