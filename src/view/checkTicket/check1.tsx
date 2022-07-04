import { Space, Button, Typography } from 'antd';

import SearchBox from '../../shared/components/searchBox/searchBox';
import TableComponent from '../../shared/components/tableComponent/tableComponent';
import { ColumnCheckTicket } from '../../shared/components/tableComponent/columnTable';
import CSVExport from '../../shared/components/CSVExport/csvExport';

const Check1 = ({db}: any) => (
    <>
        <Typography.Title>Danh sách vé</Typography.Title>
        <Space className='content-nav'>
            <SearchBox placeholder='Tìm bằng số vé'/>
            <Space className='button-group'>
                <Button
                    type="primary" ghost
                    onClick={() => console.log('Clicked')}
                >
                    Chốt đối soát
                </Button>
                <CSVExport data={db} />
            </Space>
        </Space>
        <TableComponent db={db} columns={ColumnCheckTicket}/>
    </>
);

export default Check1;