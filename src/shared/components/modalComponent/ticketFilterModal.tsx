import { useState } from 'react';
import { Modal, Button, Form, Radio, Checkbox, Row, Col } from 'antd';
import Icon from '@ant-design/icons';
import moment, { Moment } from 'moment';
import { connect } from 'react-redux';

import DatePickerCustom from '../calendar/calendar';
import { Filter } from '../../assets/icon/iconSvg';
import { FilterTicketList } from '../../../core/store/actionCreators';
import { HandleTicketFilter } from '../../helper/handleTicketData';

const FormRender = ({visible, onCancel, onCreate}: any): JSX.Element => {
    const [ value1, setValue1 ] = useState<Moment>(moment('2021-12-01'));
    const [ value2, setValue2 ] = useState<Moment>(moment());
    const [form] = Form.useForm();
    const onSelected1 = (d: any) => {setValue1(d)};
    const onSelected2 = (d: any) => {setValue2(d)};
    const onFinish = () => (form
        .validateFields()
        .then(values => {
            values.saleDateFrom = value1.format('YYYY-MM-DD');
            values.saleDateTo = value2.format('YYYY-MM-DD');
            onCreate(values);
            form.resetFields();
        })
        .catch(info => {
            console.log('Validate Failed:', info);
        })
    );

    return (
        <Modal
            title="Lọc vé"
            visible={visible}
            onOk={onFinish}
            onCancel={onCancel}
            footer={[
                <Button
                    key="link"
                    type="primary"
                    onClick={onFinish}
                >
                    Lọc vé
                </Button>
            ]}
        >
            <Form
                name='ticketFilter'
                layout='vertical'
                form={form}
                initialValues={{
                    ticketStatus: 'all',
                    checkInGate: 'all'
                }}
            >
                <Form.Item
                    name="saleDateFrom"
                    label='Từ ngày'
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                    style={{ width: '50%', display: 'inline-block' }}
                >
                    <DatePickerCustom format='DD/MM/YYYY' onChange={onSelected1} defaultDate={value1} />
                </Form.Item>
                <Form.Item
                    name="saleDateTo"
                    label='Đến ngày'
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                    style={{ width: '50%', display: 'inline-block' }}
                >
                    <DatePickerCustom format='DD/MM/YYYY' onChange={onSelected2} defaultDate={value2} />
                </Form.Item>
                <Form.Item
                    name="ticketStatus"
                    label="Tình trạng sử dụng"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Radio.Group>
                        <Radio value='all'>Tất cả</Radio>
                        <Radio value='Đã sử dụng'>Đã sử dụng</Radio>
                        <Radio value='Chưa sử dụng'>Chưa sử dụng</Radio>
                        <Radio value='Hết hạn'>Hết hạn</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="checkInGate"
                    label="Cổng Check-in"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[{ required: true, message: 'Please checking it!' }]}
                >
                    <Checkbox.Group style={{ width: '100%' }}>
                        <Row>
                            <Col span={8}>
                                <Checkbox value="all">Tất cả</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="1">Cổng 1</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="2">Cổng 2</Checkbox>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <Checkbox value="3">Cổng 3</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="4">Cổng 4</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="5">Cổng 5</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const TicketFilterModal = (props: any): JSX.Element => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const onCreate = (values: any) => {
        const ticketFilter = HandleTicketFilter(values);
        props.dispatch(FilterTicketList(ticketFilter));
        setVisible(false);
    };

    return (
        <>
            <Button
                type="primary" ghost
                icon={ <Icon component={Filter}/> }
                onClick={showModal}
            >
                Lọc vé
            </Button>
            <FormRender
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                  setVisible(false);
                }}
            />
        </>
    );
};

export default connect()(TicketFilterModal);