import { Space, Typography } from 'antd';

import SearchBox from '../../shared/components/searchBox/searchBox';
import TableComponent from '../../shared/components/tableComponent/tableComponent';
import { ColumnCheckTicket } from '../../shared/components/tableComponent/columnTable';
import CSVExport from '../../shared/components/buttonFunction/csvExport';
import CheckingTicket from '../../shared/components/buttonFunction/checkingTicket';

const Check1 = ({db}: any) => (
    <>
        <Typography.Title>Danh sách vé</Typography.Title>
        <Space className='content-nav'>
            <SearchBox placeholder='Tìm bằng số vé'/>
            <Space className='button-group'>
                <CheckingTicket search={db.search}/>
                <CSVExport data={db.ticket} search={db.search}/>
            </Space>
        </Space>
        <TableComponent
            db={db.ticket} 
            search={db.search}
            columns={ColumnCheckTicket}
        />
    </>
);

export default Check1;