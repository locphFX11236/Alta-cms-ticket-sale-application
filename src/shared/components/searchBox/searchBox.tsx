import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBox = ({placeholder}: any) => {
    const onChange = (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(value);
    };

    return (
        <Input
            className='search-box'
            placeholder={placeholder}
            size="large"
            suffix={<SearchOutlined />}
            onChange={onChange}
        />
    );
};

export default SearchBox;