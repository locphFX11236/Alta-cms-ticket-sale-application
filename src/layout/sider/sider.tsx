import React from 'react';
import { Image, Menu, Layout } from 'antd';
import Icon from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Home, Ticket, Invoice, List, Monitor, Setting } from '../../shared/assets/icon/iconSvg';
import Logo from '../../shared/images/insight-05 1.svg';

const { Sider } = Layout;

const SiderLayout: React.FC = () => (
    <Sider>
        <Image src={ Logo } />

        <Menu>
            <Menu.Item key="home" title="Trang chủ">
                <Link to="/">
                    <Icon type='home' component={ Home } />
                    <span className='item-text'>Trang chủ</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="management" title="Quản lý vé" >
                <Link to="/ticketList">
                    <Icon type='managemen' component={ Ticket } />
                    <span className='item-text'>Quản lý vé</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="invoice" title="Đối soát vé" >
                <Link to="/check">
                    <Icon type='invoice' component={ Invoice } />
                    <span className='item-text'>Đối soát vé</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="list" title="Danh sách sự kiện" hidden>
                <Link to="/">
                    <Icon type='list' component={ List } />
                    <span className='item-text'>Danh sách sự kiện</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="monitor" title="Quản lý thiết bị" hidden>
                <Link to="/">
                    <Icon type='monitor' component={ Monitor } />
                    <span className='item-text'>Quản lý thiết bị</span>
                </Link>
            </Menu.Item>
            
            <Menu.Item key="service" title="Cài đặt" >
                <Link to="/setting">
                    <Icon type='service' component={ Setting } />
                    <span className='item-text'>Cài đặt</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="???">
                {/* <Link to="/_text"> */}
                    <Icon type='service' component={ Setting } hidden/>
                    <span className='item-text'>Gói dịch vụ</span>
                {/* </Link> */}
            </Menu.Item>
        </Menu>
    </Sider>
);

export default SiderLayout;