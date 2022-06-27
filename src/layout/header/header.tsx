import React from 'react';
import { Layout, Input, Avatar, Space } from 'antd';
import { MailOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';
import Account from '../../shared/images/Frame 54.svg';

const { Header } = Layout;

const onChange = (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(value);
};

const HeaderLayout: React.FC = () => (
    <>
        <Input
            className='header-search'
            placeholder="Search"
            size="large"
            suffix={<SearchOutlined />}
            onChange={onChange}
        />
        <Space className="right-header">
            <MailOutlined />
            <BellOutlined />
            <Avatar size={48} src={Account} />
        </Space>
    </>
);

export default HeaderLayout;