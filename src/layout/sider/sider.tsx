import React from 'react';
import { Image, Menu, Layout } from 'antd';
import Icon from '@ant-design/icons';
import HomeIcon from '../../shared/assets/icon/HomeIcon';
import TicketIcon from '../../shared/assets/icon/TicketIcon';
import InvoiceIcon from '../../shared/assets/icon/InvoiceIcon';
import SettingIcon from '../../shared/assets/icon/SettingIcon';
// import ListIcon from '../../shared/assets/icon/ListIcon.svg';
// import DeviceIcon from '../../shared/assets/icon/DeviceIcon.svg';
import LogoIcon from '../../shared/assets/icon/logo.svg';

const { Sider } = Layout;

const SiderLayout: React.FC = () => (
    <Sider className='sider-layout'>
        <div className="logo">
            <Image className='logo-icon' src={LogoIcon} />
        </div>

        <Menu className='menu'>
            <Menu.Item className='menu-item' key="home" title="Trang chủ">
                <Icon className='item-icon' type='home' component={HomeIcon} />
                <span className='item-text'>Trang chủ</span>
            </Menu.Item>

            <Menu.Item className='menu-item' key="management" title="Quản lý vé" >
                <Icon className='item-icon' type='managemen' component={TicketIcon} />
                <span className='item-text'>Quản lý vé</span>
            </Menu.Item>

            <Menu.Item className='menu-item' key="invoice" title="Đối soát vé" >
                <Icon className='item-icon' type='invoice' component={InvoiceIcon} />
                <span className='item-text'>Đối soát vé</span>
            </Menu.Item>

            <Menu.Item className='menu-item' key="list" title="Danh sách sự kiện" >
                {/* <Icon className='item-icon' type='list' src={ListIcon} /> */}
                <span className='item-text'>Danh sách sự kiện</span>
            </Menu.Item>

            <Menu.Item className='menu-item' key="device" title="Quản lý thiết bị" >
                {/* <Icon className='item-icon' type='device' src={DeviceIcon} /> */}
                <span className='item-text'>Quản lý thiết bị</span>
            </Menu.Item>
            
            <Menu.Item className='menu-item' key="service" title="Cài đặt" >
                <Icon className='item-icon' type='service' component={SettingIcon} />
                <span className='item-text'>Cài đặt</span>
            </Menu.Item>

            <Menu.Item className='menu-item'>
                <span className='item-text'>Gói dịch vụ</span>
            </Menu.Item>
        </Menu>
    </Sider>
);

export default SiderLayout;