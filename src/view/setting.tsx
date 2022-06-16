import { Space, Input, Button, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

import ModalBox3 from '../shared/components/modal3';
import ModalBox4 from '../shared/components/modal4';

type dataProps = {
    STT: Number;
    groupCode: String;
    groupName: String;
    usingDate: String;
    expDate: String;
    status: Boolean;
    costTicket: Number;
    costCombo: {
        cost: Number,
        SL: Number
    } | {};
};

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const Column = [
    { title: "STT", dataIndex: "STT" },
    { title: "Mã gói", dataIndex: "groupCode" },
    { title: "Tên gói vé", dataIndex: "groupName" },
    { title: "Ngày sử dụng", dataIndex: "usingDate" },
    { title: "Ngày hết hạn", dataIndex: "expDate" },
    { title: "Giá vé (VNĐ/Vé)", dataIndex: "costTicket" },
    { title: "Giá Combo (VNĐ/Combo)", dataIndex: "costCombo" },
    { title: "Tình trạng", dataIndex: "status" },
    {
        dataIndex: "ticketNum",
        render: () => <ModalBox3 />,
    }
];

const columns: ColumnsType<dataProps> = Column;

const Setting = ({db}: any) => (
    <>
        <h1>Danh sách gói vé</h1>
        <Space className='content-nav' direction="horizontal">
            <Search placeholder="Search" allowClear onSearch={onSearch} style={{ width: 200 }} />
            <div className='buttonGroup'>
                <ModalBox4 />
                <Button
                    type="primary" ghost
                    onClick={() => console.log('Clicked')}
                >
                    Xuất file (.csv)
                </Button>
            </div>
        </Space>
        <Table columns={columns} dataSource={db} />
    </>
);

export default Setting;