import React from 'react';
import { Image, Menu, Layout } from 'antd';
import Icon from '@ant-design/icons';
import { Home, Ticket, Invoice, List, Monitor, Setting } from '../../shared/assets/icon/iconSvg';
import Logo from '../../shared/images/insight-05 1.svg';

const { Sider } = Layout;

const SiderLayout: React.FC = () => (
    <Sider className='sider-layout'>
        <div className="logo">
            <Image className='logo-icon' src={ Logo } />
        </div>

        <Menu className='menu'>
            <Menu.Item className='menu-item' key="home" title="Trang chủ">
                <Icon className='item-icon' type='home' component={ Home } />
                <span className='item-text'>Trang chủ</span>
            </Menu.Item>

            <Menu.Item className='menu-item' key="management" title="Quản lý vé" >
                <Icon className='item-icon' type='managemen' component={ Ticket } />
                <span className='item-text'>Quản lý vé</span>
            </Menu.Item>

            <Menu.Item className='menu-item' key="invoice" title="Đối soát vé" >
                <Icon className='item-icon' type='invoice' component={ Invoice } />
                <span className='item-text'>Đối soát vé</span>
            </Menu.Item>

            <Menu.Item className='menu-item' key="list" title="Danh sách sự kiện" >
                <Icon className='item-icon' type='list' component={ List } />
                <span className='item-text'>Danh sách sự kiện</span>
            </Menu.Item>

            <Menu.Item className='menu-item' key="monitor" title="Quản lý thiết bị" >
                <Icon className='item-icon' type='monitor' component={ Monitor } />
                <span className='item-text'>Quản lý thiết bị</span>
            </Menu.Item>
            
            <Menu.Item className='menu-item' key="service" title="Cài đặt" >
                <Icon className='item-icon' type='service' component={ Setting } />
                <span className='item-text'>Cài đặt</span>
            </Menu.Item>

            <Menu.Item className='menu-item'>
                <span className='item-text'>Gói dịch vụ</span>
            </Menu.Item>
        </Menu>
    </Sider>
);

export default SiderLayout;