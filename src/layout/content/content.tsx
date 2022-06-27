import { Layout } from 'antd';
import React from 'react';

const { Content } = Layout;

const ContentLayout = ({children}: any): React.ReactElement => {
    if (children.length === 1) {
        return <Content className='content-layout1'>
            {children[0]}
        </Content>
    } else {
        return (
            <Content className='content-layout2'>
                <Content className='content-layout2-1'>{children[0]}</Content>
                <Content className='content-layout2-2'>{children[1]}</Content>
            </Content>
        )
    }
};

export default ContentLayout;