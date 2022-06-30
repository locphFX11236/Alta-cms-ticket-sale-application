import { Popover, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

import ModalBox2 from '../modalComponent/changeDateModal/modal2';

const content: JSX.Element = (
    <>
        <Button
            type="link"
            // onClick={showModal}
        >
            Sử dụng vé
        </Button><br/>
        <ModalBox2 />
    </>
);

const PopoverMore = (): React.ReactElement => (
    <Popover
        placement="left"
        content={content}
        trigger="click"
    >
        <MoreOutlined />
    </Popover>
);

export default PopoverMore;