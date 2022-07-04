import { Popover, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

import ChangeDateModal from '../modalComponent/changeDateModal';

const Content = ({record}: any): JSX.Element => (
    <>
        <Button
            type="link"
            // onClick={showModal}
        >
            Sử dụng vé
        </Button><br/>
        <ChangeDateModal record={record}/>
    </>
);

const PopoverMore = ({record}: any): React.ReactElement => (
    <Popover
        placement="left"
        content={<Content record={record} />}
        trigger="click"
    >
        <MoreOutlined />
    </Popover>
);

export default PopoverMore;