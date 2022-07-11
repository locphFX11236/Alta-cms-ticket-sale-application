import React from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

import { FilterTicketList } from '../../../core/store/actionCreators';
import { HandleTicketFilter } from '../../helper/handleTicketData';

const SearchBox = (props: any) => {
    const onChange = (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const ticketFilter = HandleTicketFilter({ ticketNum: value.target.value });
        props.dispatch( FilterTicketList(ticketFilter));
    };

    return (
        <Input
            className='search-box'
            name='bookingCode'
            placeholder={props.placeholder}
            allowClear
            size="large"
            suffix={<SearchOutlined />}
            onChange={onChange}
        />
    );
};

export default  connect()(SearchBox);