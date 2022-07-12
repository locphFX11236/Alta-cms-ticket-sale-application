import { Table } from 'antd';

const TableComponent = ({db, search, columns}: any) => {
    let item = db;
    if (search.length !== 0) { item = search};

    return (
        <Table
            pagination={ { position: ['bottomCenter'] } }
            columns={columns}
            dataSource={ item }
            rowKey='key'
        />
    );
};

export default TableComponent;