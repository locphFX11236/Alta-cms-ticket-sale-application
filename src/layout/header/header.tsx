import React from 'react';
import { Avatar, Space } from 'antd';
import { MailOutlined, BellOutlined } from '@ant-design/icons';
import Account from '../../shared/images/Frame 54.svg';
import SearchBox from '../../shared/components/searchBox/searchBox';

const HeaderLayout: React.FC = () => (
    <>
        <Space className='header-search-box'><SearchBox placeholder='Search'/></Space>
        <Space className="right-header">
            <MailOutlined />
            <BellOutlined />
            <Avatar size={48} src={Account} />
        </Space>
    </>
);

export default HeaderLayout;