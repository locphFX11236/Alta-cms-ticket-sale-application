import { Typography } from 'antd';

import AreaChart from '../../shared/components/chartComponent/areaChart/areaChart';
import PieChart from '../../shared/components/chartComponent/pieChart/pieChart';

const Home = (): JSX.Element => (
    <>
        <Typography.Title className='home-title'>Thống kê</Typography.Title>
        <AreaChart />
        <PieChart />
    </>
);

export default Home;