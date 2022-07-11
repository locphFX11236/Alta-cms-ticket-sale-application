import { Space, Typography } from 'antd';

import SearchBox from '../../shared/components/searchBox/searchBox';
import AddGroupModal from '../../shared/components/modalComponent/addGroupModal';
import CSVExport from '../../shared/components/buttonFunction/csvExport';
import { ColumnSetGroup } from '../../shared/components/tableComponent/columnTable';
import TableComponent from '../../shared/components/tableComponent/tableComponent';

const Setting = ({db}: any) => (
    <>
        <Typography.Title>Danh sách gói vé</Typography.Title>
        <Space className='content-nav'>
            <SearchBox placeholder='Tìm bằng số vé'/>
            <Space className='button-group'>
                <AddGroupModal />
                <CSVExport data={db.group} search={db.search} />
            </Space>
        </Space>
        <TableComponent
            db={db.group}
            search={db.search}
            columns={ColumnSetGroup}
        />
    </>
);

export default Setting;