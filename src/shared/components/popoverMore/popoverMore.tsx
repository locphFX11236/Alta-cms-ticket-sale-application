import { Popover } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

import ChangeDateModal from '../modalComponent/changeDateModal';
import UsingTicket from '../buttonFunction/usingTicket';

const Content = ({record, index}: any): JSX.Element => (
    <>
        <UsingTicket record={record} index={index}/>
        <ChangeDateModal record={record} index={index}/>
    </>
);

const PopoverMore = ({record, index}: any): React.ReactElement => (
    <Popover
        placement="left"
        content={<Content record={record} index={index}/>}
        trigger="click"
    >
        <MoreOutlined />
    </Popover>
);

export default PopoverMore;