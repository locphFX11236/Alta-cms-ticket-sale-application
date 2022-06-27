import { Col, Input, Button, Form, DatePicker, Radio } from 'antd';
import moment from 'moment';

const Check2 = ({db}: any) => (
    <>
        <h1>Lọc vé</h1>
        <Form>
            <Form.Item>
                <label htmlFor='tikectStatus'>Tình trạng đối soát</label>
                <Radio.Group>
                    <Radio value={0}>Tất cả</Radio>
                    <Radio value={1}>Đã đối soát</Radio>
                    <Radio value={2}>Chưa đối soát</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item>
                <label htmlFor='typeTicket'>Loại vé: </label>
                <span>Vé cổng</span>
            </Form.Item>
            <Form.Item>
                <Input.Group compact>
                    <Col span={12}>
                        <label htmlFor='dateFrom'>Từ ngày</label>
                        <DatePicker id='dateFrom' defaultValue={ moment(moment(),"DD-MM-YYYY") } format={"DD-MM-YYYY"} />
                    </Col>
                    <Col span={12}>
                        <label htmlFor='dateTo'>Đến ngày</label>
                        <DatePicker id='dateTo' defaultValue={ moment(moment(),"DD-MM-YYYY") } format={"DD-MM-YYYY"} />
                    </Col>
                </Input.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit">
                    Lọc
                </Button>
            </Form.Item>
        </Form>
    </>
);

export default Check2;