import { Layout } from 'antd';
import {  CopyrightOutlined } from '@ant-design/icons';
import SiderLayout from './sider/sider';
import HeaderLayout from './header/header';

const IndexLayout = ({children}: any): JSX.Element => (
    <Layout>
        <SiderLayout />
        <p className='designer'>Coppyright <CopyrightOutlined /> 2020 Alta Software</p>
        <HeaderLayout />
        { children }
    </Layout>
);

export default IndexLayout;