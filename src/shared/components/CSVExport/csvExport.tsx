import { Button } from 'antd';
import { CSVLink } from 'react-csv';

const CSVExport = ({data, search}: any) => {
    let item = data;
    if (search.length !== 0) { item = search };

    return (
        <CSVLink data={item} >
            <Button type="primary" ghost >
                Xuất file (.csv)
            </Button>
        </CSVLink>
    );
};

export default CSVExport;