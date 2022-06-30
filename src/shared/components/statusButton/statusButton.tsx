import { Tag, Badge } from 'antd';

type StatusButtonProps = {
    text: 'Chưa sử dụng' | 'Đang áp dụng' | 'Hết hạn' | 'Tắt' | 'Đã sử dụng'
};

const StatusButton = ({text}: StatusButtonProps): JSX.Element => {
    let color, style;
    if (text === 'Chưa sử dụng' || text === 'Đang áp dụng') {color = 'green'}
    else if (text === 'Hết hạn' || text === 'Tắt') {color = 'red'}
    else {
        style = { backgroundColor: '#EAF1F8', color: '#919DBA', borderColor: '#919DBA' };
        color = '#919DBA';
    };

    return (
        <Tag color={color} style={style}>
            <Badge color={color} />
            {text}
        </Tag>
    );
};

export default StatusButton;