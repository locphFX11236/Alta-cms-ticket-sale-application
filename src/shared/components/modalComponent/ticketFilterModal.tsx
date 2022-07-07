import { useState } from 'react';
import { Modal, Button, Form, Radio, Checkbox, Row, Col } from 'antd';
import Icon from '@ant-design/icons';
import moment, { Moment } from 'moment';
import { connect } from 'react-redux';

import DatePickerCustom from '../calendar/calendar';
import { Filter } from '../../assets/icon/iconSvg';
import { FilterTicketList } from '../../../core/store/actionCreators';

const FormRender = ({visible, onCancel, onCreate}: any): JSX.Element => {
    const [ value1, setValue1 ] = useState<Moment>(moment());
    const [ value2, setValue2 ] = useState<Moment>(moment());
    const [form] = Form.useForm();
    const onSelected1 = (d: any) => {setValue1(d)};
    const onSelected2 = (d: any) => {setValue2(d)};
    const onFinish = () => (form
        .validateFields()
        .then(values => {
            values.dateFrom = moment(value1).format('YYYY-MM-DD');
            values.dateTo = moment(value2).format('YYYY-MM-DD');
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
                    ticketStatus: 'Tất cả',
                    checkInGate: 'Tất cả'
                }}
            >
                <Form.Item
                    name="dateFrom"
                    label='Từ ngày'
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                    style={{ width: '50%', display: 'inline-block' }}
                >
                    <DatePickerCustom format='DD/MM/YYYY' visibleChange={onSelected1} />
                </Form.Item>
                <Form.Item
                    name="dateTo"
                    label='Đến ngày'
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                    style={{ width: '50%', display: 'inline-block' }}
                >
                    <DatePickerCustom format='DD/MM/YYYY' visibleChange={onSelected2} />
                </Form.Item>
                <Form.Item
                    name="ticketStatus"
                    label="Tình trạng sử dụng"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Radio.Group>
                        <Radio value='Tất cả'>Tất cả</Radio>
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
                                <Checkbox value="Tất cả">Tất cả</Checkbox>
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

    const onCreate = (filter: any) => {
        props.dispatch(FilterTicketList(filter));
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