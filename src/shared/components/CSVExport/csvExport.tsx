import { Button } from 'antd';
import { CSVLink } from 'react-csv';

const CSVExport = ({data}: any) => (
    <CSVLink data={data} >
        <Button type="primary" ghost >
            Xuất file (.csv)
        </Button>
    </CSVLink>
);

export default CSVExport;