import { Table } from 'antd';

const TableComponent = ({db, columns}: any) => (
    <Table
        pagination={ { position: ['bottomCenter'] } }
        columns={columns}
        dataSource={db}
    />
);

export default TableComponent;