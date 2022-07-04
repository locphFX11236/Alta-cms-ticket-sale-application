import { Space, Typography } from 'antd';

import ModalBox from '../../shared/components/modalComponent/ticketFilterModal';
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
                <ModalBox />
                <CSVExport data={db} />
            </Space>
        </Space>
        <TableComponent db={db} columns={ColumnTicketList}/>
    </>
);

export default TicketList;