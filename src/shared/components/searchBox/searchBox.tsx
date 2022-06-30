import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBox: React.FC = () => {
    const onChange = (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(value);
    };

    return (
        <Input
            className='search-box'
            placeholder="Search"
            size="large"
            suffix={<SearchOutlined />}
            onChange={onChange}
        />
    );
};

export default SearchBox;