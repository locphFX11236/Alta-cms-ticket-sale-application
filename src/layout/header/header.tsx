import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const HeaderLayout: React.FC = () => (
    <Header className="header-layout">
        <div className="right-header">Seach Modal</div>
        <div className="left-header">Acc Noti Mail</div>
    </ Header>
);

export default HeaderLayout;