import { Pie } from '@ant-design/plots';
import { Space } from 'antd';

import Data from '../../../../core/dummyData/pieChart.json';
// import DatePickerCustom from '../calendar/calendar';

const PieChart = (): JSX.Element => {

    const config2 = {
        appendPadding: 10,
        data: Data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 10,
            }
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            }
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: 'Pie1',
            }
        }
    };

    return (
        <Space className='pie-chart-group' direction="horizontal">
            <div>
                {/* <DatePickerCustom /> */}
            </div>
            <div><Pie {...config2} /></div>
            <div><Pie {...config2} /></div>
        </Space>
    );
};

export default PieChart;