import React from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

import { FilterTicketList } from '../../../core/store/actionCreators';

const SearchBox = (props: any) => {
    const onChange = (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const filter = { bookingCode: value.target.value }
        return props.dispatch( FilterTicketList(filter));
    };

    return (
        <Input
            className='search-box'
            name='bookingCode'
            placeholder={props.placeholder}
            size="large"
            suffix={<SearchOutlined />}
            onChange={onChange}
        />
    );
};

export default  connect()(SearchBox);