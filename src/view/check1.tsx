import type { ColumnsType } from 'antd/lib/table';
import { Card, Space, Input, Button, Table } from 'antd';

import Column from '../core/dummyData/fieldTable2.json';

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

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const columns: ColumnsType<dataProps> = Column;

const Check1 = ({db}: any) => (
    <Card >
        <h1>Danh sách vé</h1>
        <Space className='content-nav' direction="horizontal">
            <Search placeholder="Search" allowClear onSearch={onSearch} style={{ width: 200 }} />
            <div className='buttonGroup'>
                <Button
                    type="primary" ghost
                    onClick={() => console.log('Clicked')}
                >
                    Chốt đối soát
                </Button>
            </div>
        </Space>
        <Table columns={columns} dataSource={db} />
    </Card>
);

export default Check1;