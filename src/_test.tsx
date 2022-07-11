import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend, Cell, Label } from 'recharts';

const data = [
    { name: 'Vé đã sử dụng', GoiGiaDinh: 400, GoiSuKien: 2400 },
    { name: 'vé chưa sử dụng', GoiGiaDinh: 300, GoiSuKien: 4567 }
];

const colors = [ 'orange', 'blue' ];

const renderCustomizedLabel = (props: any) => {
    const RADIAN = Math.PI / 180;
    const radius = props.innerRadius + (props.outerRadius - props.innerRadius) * 0.5;
    const x = props.cx + radius * Math.cos(-props.midAngle * RADIAN);
    const y = props.cy + radius * Math.sin(-props.midAngle * RADIAN);
  
    return (
        <text
            x={x} y={y}
            fill="white"
            textAnchor={x > props.cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {props.value}
        </text>
    );
};

const Chart = () => (
    <ResponsiveContainer width="100%" height="30%">
        <PieChart width={400} height={400}>
            <Pie
                dataKey="GoiGiaDinh"
                data={data}
                cx={500} cy={100}
                innerRadius={40}
                outerRadius={80}
                labelLine={false}
                label={renderCustomizedLabel}
            >
                <Label value="Goi gia dinh" position='outside' />
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]}/>
                    ))
                }
            </Pie>
            <Pie
                dataKey="GoiSuKien"
                data={data}
                cx={1000} cy={100}
                innerRadius={40}
                outerRadius={80}
                labelLine={false}
                label={renderCustomizedLabel}
            >
                <Label value="Goi su kien" position='outside' />
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]}/>
                    ))
                }
            </Pie>
            <Legend
                layout='vertical'
                align='right'
                verticalAlign='middle'
                width={200}
                height={100}
                iconSize={50}
                payload={[
                    { value: 'Vé đã sử dụng', type: 'rect', color: 'orange' },
                    { value: 'Vé chưa sử dụng', type: 'rect', color: 'blue' }
                ]}
            />
            <Tooltip />
        </PieChart>
    </ResponsiveContainer>
);
export default Chart;
