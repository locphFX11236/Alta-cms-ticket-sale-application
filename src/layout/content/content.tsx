import React from 'react';
import { Layout } from 'antd';
import TicketList from '../../view/ticketList';

const { Content } = Layout;

const ContentLayout: React.FC = () => (
    <Content className='content-layout'>
        <TicketList />
    </Content>
);

export default ContentLayout;