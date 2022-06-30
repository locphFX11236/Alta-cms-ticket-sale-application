import { Layout } from 'antd';
import SiderLayout from './sider/sider';
import HeaderLayout from './header/header';
import DesignerSign from '../shared/components/designerSign/designerSign';

const IndexLayout = ({children}: any): JSX.Element => (
    <Layout>
        <SiderLayout />
        <DesignerSign />
        <HeaderLayout />
        { children }
    </Layout>
);

export default IndexLayout;