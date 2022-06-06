import { Space, Input, Button, Table } from 'antd';
import Icon from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';

import { Filter } from '../shared/assets/icon/iconSvg';
import ModalBox from '../shared/components/modal';
import Data from '../core/dummyData/ticketList.json';
import Column from '../core/dummyData/fieldTable1.json';

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

const columns: ColumnsType<dataProps> = Column;

const data: dataProps[] = Data; console.log(data)

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