import { Space, Typography } from 'antd';

import TicketFilterModal from '../../shared/components/modalComponent/ticketFilterModal';
import SearchBox from '../../shared/components/searchBox/searchBox';
import TableComponent from '../../shared/components/tableComponent/tableComponent';
import { ColumnTicketList } from '../../shared/components/tableComponent/columnTable';
import CSVExport from '../../shared/components/CSVExport/csvExport';

const TicketList = ({db}: any) => (
    <>
        <Typography.Title>Danh sách vé</Typography.Title>
        <Space className='content-nav'>
            <SearchBox placeholder='Tìm bằng số vé'/>
            <Space className='button-group'>
                <TicketFilterModal />
                <CSVExport data={db.ticket} search={db.search}/>
            </Space>
        </Space>
        <TableComponent
            db={db.ticket} 
            search={db.search}
            columns={ColumnTicketList}
        />
    </>
);

export default TicketList;