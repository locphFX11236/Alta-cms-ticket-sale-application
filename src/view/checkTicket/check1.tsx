import { Space, Button, Typography } from 'antd';

import SearchBox from '../../shared/components/searchBox/searchBox';
import TableComponent from '../../shared/components/tableComponent/tableComponent';
import { ColumnCheckTicket } from '../../shared/components/tableComponent/columnTable';

const Check1 = ({db}: any) => (
    <>
        <Typography.Title>Danh sách vé</Typography.Title>
        <Space className='content-nav'>
            <SearchBox />
            <Space className='button-group'>
                <Button
                    type="primary" ghost
                    onClick={() => console.log('Clicked')}
                >
                    Chốt đối soát
                </Button>
                <Button
                    type="primary" ghost
                    onClick={() => console.log('Clicked')}
                >
                    Xuất file (.csv)
                </Button>
            </Space>
        </Space>
        <TableComponent db={db} columns={ColumnCheckTicket}/>
    </>
);

export default Check1;