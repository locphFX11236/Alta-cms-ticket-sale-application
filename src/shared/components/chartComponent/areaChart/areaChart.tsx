import { Statistic, Space, Typography } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import Data from '../../../../core/dummyData/areaChart.json';
import DatePickerCustom from '../../calendar/calendar';

const Chart = () => (
    <ResponsiveContainer width="100%" height="30%">
        <AreaChart
            width={500}
            height={300}
            data={Data}
            margin={{ top: 40, right: 40, left: 40, bottom: 40 }}
        >
            <defs>
                <linearGradient
                    id='color' // Đặt id biến màu
                    x1='0' y1='0' x2='0' y2='1' // ?? Quy định chuyển đổi màu
                >
                    <stop offset='0%' stopColor='#ff33cc' stopOpacity={0.4} />
                    <stop offset='75%' stopColor='#ff33cc' stopOpacity={0.05} />
                </linearGradient>
            </defs>
            <CartesianGrid
                strokeDasharray="3 3" // Vạch đứt 3px
                opacity={0.7} // Làm mờ lưới
                vertical={false} // Không hiển thị lưới dọc
                horizontal={true} // Hiển thị lưới ngang
            />
            <YAxis
                type='number'
                dataKey="turnover"
                unit='tr' // Đơn vị giá trị
                axisLine={false} // Không hiển thị trục tung
                tickLine={false}
                domain={[ 140, 260 ]} // Khoảng giá trị
                ticks={[ 140, 180, 220, 260 ]}
                width={50}
                tickMargin={20}
            />
            <XAxis
                dataKey="time"
                axisLine={false} // Không hiển thị trục hoành
            />
            <Tooltip />
            <Area
                type="monotone"
                dataKey="turnover"
                stroke="orange"
                fill="url(#color)"
            />
        </AreaChart>
    </ResponsiveContainer>
);

let s = 0; Data.forEach((a: any) => s += a.turnover*1000000)

const AreaChartComponent = (): JSX.Element => (
    <>
        <Space className='area-chart-title'>
            <Typography.Title className='chart-name' level={3}>Doanh thu</Typography.Title>
            <DatePickerCustom />
        </Space>
        <Chart />
        <Statistic
            title={"Tổng doanh thu theo tuần"} 
            value={`${s}`}
            suffix={<p style={{ fontSize: 13 }}>đồng</p>}
            style={{ margin: 40 }}
        />
    </>
);

export default AreaChartComponent;