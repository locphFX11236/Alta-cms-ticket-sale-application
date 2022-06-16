import { Layout } from 'antd';
import SiderLayout from './sider/sider';
import HeaderLayout from './header/header';

const IndexLayout = ({children}: any): JSX.Element => (
    <Layout className='index-layout'>
        <SiderLayout />
        <HeaderLayout />
        { children }
    </Layout>
);

export default IndexLayout;