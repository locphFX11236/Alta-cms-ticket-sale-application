import { Space, Button, Typography } from 'antd';

import ModalBox4 from '../../shared/components/modalComponent/addGroupModal/modal4';
import SearchBox from '../../shared/components/searchBox/searchBox';
import { ColumnSetGroup } from '../../shared/components/tableComponent/columnTable';
import TableComponent from '../../shared/components/tableComponent/tableComponent';


const Setting = ({db}: any) => (
    <>
        <Typography.Title>Danh sách gói vé</Typography.Title>
        <Space className='content-nav'>
            <SearchBox />
            <Space className='button-group'>
                <ModalBox4 />
                <Button
                    type="primary" ghost
                    onClick={() => console.log('Clicked')}
                >
                    Xuất file (.csv)
                </Button>
            </Space>
        </Space>
        <TableComponent db={db} columns={ColumnSetGroup}/>
    </>
);

export default Setting;