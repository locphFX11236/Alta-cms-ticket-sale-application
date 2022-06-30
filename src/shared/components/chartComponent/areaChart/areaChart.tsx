import { Statistic, Space } from 'antd';
import { Area } from '@ant-design/plots';

import Data from '../../../../core/dummyData/areaChart.json';
// import DatePickerCustom from '../calendar/calendar';

const AreaChart = (): JSX.Element => {

    const config1 = {
        data: Data,
        xField: 'time',
        yField: 'turnover',
        xAxis: {
            range: [0, 1]
        },
        yAxis: {
            min: 140,
            max: 260
        }
    };

    return (
        <Space className='area-chart-group' direction="vertical">
            <Space className='area-chart-title'>
                <h3 className='chart-name'>Doanh thu</h3>
                <div className='area-chart-datepicker'>
                    {/* <DatePickerCustom /> */}
                </div>
            </Space>
            <Area {...config1} />
            <Statistic title="Tổng doanh thu theo tuần" value={`${112.893} đồng`} precision={2} />
        </Space>
    );
};

export default AreaChart;