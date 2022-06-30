import React from 'react';
import { Avatar, Space } from 'antd';
import { MailOutlined, BellOutlined } from '@ant-design/icons';
import Account from '../../shared/images/Frame 54.svg';
import SearchBox from '../../shared/components/searchBox/searchBox';

const HeaderLayout: React.FC = () => (
    <>
        <div className='header-search-box'><SearchBox /></div>
        <Space className="right-header">
            <MailOutlined />
            <BellOutlined />
            <Avatar size={48} src={Account} />
        </Space>
    </>
);

export default HeaderLayout;