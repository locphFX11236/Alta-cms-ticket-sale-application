import { Statistic, Typography, Space } from 'antd';
import { Area, Pie } from '@ant-design/plots';
import moment, { Moment } from 'moment';
import { useState } from 'react';

import Data1 from '../../core/dummyData/areaChart.json';
import Data2 from '../../core/dummyData/pieChart.json'
import DatePickerCustom from '../../shared/components/calendar/calendar';

const Home = (): JSX.Element => {
    const [ selectedDate, setSelectedDate ] = useState<Moment>(moment());
    const [ choiceRadio, setChoiceRadio ] = useState<String>('date');
    const onChange = () => {
        console.log(selectedDate, choiceRadio);
    };

    const config1 = {
        data: Data1,
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

    const config2 = {
        appendPadding: 10,
        data: Data2,
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
        <>
            <Typography.Title className='home-title'>Thống kê</Typography.Title>
            <Space className='area-chart' direction="vertical">
                <Space className='area-chart-title'>
                    <h3 className='chart-name'>Doanh thu</h3>
                    <div className='home-datepicker'>
                        <DatePickerCustom 
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            choiceRadio={choiceRadio}
                            setChoiceRadio={setChoiceRadio}
                            onChange={onChange}
                        />
                    </div>
                </Space>
                <Area {...config1} />
                <Statistic title="Tổng doanh thu theo tuần" value={`${112893} đồng`} precision={2} />
            </Space>
            <Space className='pie-chart' style={{ display: "flex" }}>
                <div>
                    <DatePickerCustom 
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        choiceRadio={choiceRadio}
                        setChoiceRadio={setChoiceRadio}
                        onChange={onChange}
                    />
                </div>
                <div><Pie {...config2} /></div>
                <div><Pie {...config2} /></div>
            </Space>
        </>
    );
};

export default Home;