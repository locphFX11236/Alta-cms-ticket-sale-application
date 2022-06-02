import { Space, Input, Button, Table } from 'antd';
import Icon from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';

import { Filter } from '../shared/assets/icon/iconSvg';
import ModalBox from '../shared/components/modal';

type dataProps = {
    STT: Number;
    bookingCode: String;
    ticketNum: Number;
    event: String;
    tikectStatus: Boolean;
    usingDate: String;
    saledDate: String;
    checkInGate: String;
};

const { Search } = Input;

const onSearch = (value: string) => console.log(value);
const columns: ColumnsType<dataProps> = [
    {
        title: 'STT',
        dataIndex: 'STT',
    },
    {
        title: 'Booking code',
        dataIndex: 'bookingCode',
    },
    {
        title: 'Số vé',
        dataIndex: 'ticketNum',
    },
    {
        title: 'Tên sự kiện',
        dataIndex: 'event',
    },
    {
        title: 'Tình trạng sử dụng',
        dataIndex: 'tikectStatus',
    },
    {
        title: 'Ngày sử dụng',
        dataIndex: 'usingDate',
    },
    {
        title: 'Ngày xuất vé',
        dataIndex: 'saledDate',
    },
    {
        title: 'Cổng check-in',
        dataIndex: 'checkInGate',
    },
];
const data: dataProps[] = [
    {
        STT: 1,
        bookingCode: 'A12',
        ticketNum: 123,
        event: 'Tet',
        tikectStatus: false,
        usingDate: '2022-01-01',
        saledDate: '2022-02-01',
        checkInGate: 'C'
    },
    {
        STT: 2,
        bookingCode: 'A22',
        ticketNum: 133,
        event: 'Tet',
        tikectStatus: true,
        usingDate: '2022-01-01',
        saledDate: '2022-02-01',
        checkInGate: 'B'
    }
];

const TicketList = () => {
    return (
        <>
            <h1>Danh sách vé</h1>
            <Space className='content-nav' direction="horizontal">
                <Search placeholder="Search" allowClear onSearch={onSearch} style={{ width: 200 }} />
                <div className='buttonGroup'>
                    <ModalBox component={ <Icon component={Filter}/> } />
                    <Button
                        type="primary" ghost
                        onClick={() => console.log('Clicked')}
                    >
                        Xuất file (.csv)
                    </Button>
                </div>
            </Space>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default TicketList;