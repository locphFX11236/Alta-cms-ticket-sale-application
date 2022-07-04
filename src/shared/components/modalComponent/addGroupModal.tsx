import { useState } from 'react';
import { Modal, Button, Form, Input, Col, Checkbox, Row, Select, InputNumber, TimePicker } from 'antd';
import moment from 'moment';
import DatePickerCustom from '../calendar/calendar';

const { Option } = Select;

const FormRender = ({visible, onCreate, onCancel}: any) => {
    const [ fromDate, setFromDate ] = useState<String>(moment().format('DD/MM/YYYY'));
    const [ toDate, setToDate ] = useState<String>(moment().format('DD/MM/YYYY'));
    const [form] = Form.useForm();
    const onSelected1 = (d: any) => {setFromDate(d)};
    const onSelected2 = (d: any) => {setToDate(d)};
    const onFinish = () => (form
        .validateFields()
        .then(values => {
            values.from.date = fromDate;
            values.to.date = toDate;
            onCreate(values);
            form.resetFields();
        })
        .catch(info => {
            console.log('Validate Failed:', info);
        })
    );

    return (
        <Modal
            title="Thêm gói vé"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button
                    key="link"
                    type="primary"
                    onClick={onCancel}
                >
                    Hủy
                </Button>,
                <Button
                    key="link"
                    type="primary"
                    onClick={onFinish}
                >
                    Lưu
                </Button>
            ]}
        >
            <Form
                name='addGroupModal'
                layout='vertical'
                form={form}
            >
                <Form.Item
                    name='groupName'
                    label='Tên gói vé'
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 18 }}
                    rules={[{ required: true, message: 'Please input group name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Ngày hết hạn'
                    name='from'
                    style={{ display: 'inline-block', width: '50%', margin: 0 }}
                >
                    <Input.Group compact>
                        <Col span={12}>
                            <Form.Item name={['from', 'date']} >
                                <DatePickerCustom
                                    format='DD-MM-YYYY'
                                    visibleChange={ onSelected1 }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={['from', 'time']}
                                rules={[{ required: true, message: 'Please choice it!' }]}
                            >
                                <TimePicker defaultValue={moment()} format={'HH:mm:ss'}/>
                            </Form.Item>
                        </Col>
                    </Input.Group>
                </Form.Item>
                <Form.Item
                    label='Ngày hết hạn'
                    name='to'
                    style={{ display: 'inline-block', width: '50%', margin: 0 }}
                >
                    <Input.Group compact >
                        <Col span={12}>
                            <Form.Item name={['to', 'date']} >
                                <DatePickerCustom
                                    format='DD-MM-YYYY'
                                    visibleChange={onSelected2}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={['to', 'time']}
                                rules={[{ required: true, message: 'Please choice it!' }]}
                            >
                                <TimePicker defaultValue={moment()} format={'HH:mm:ss'}/>
                            </Form.Item>
                        </Col>
                    </Input.Group>
                </Form.Item>
                <Form.Item
                    label='Giá vé áp dụng'
                    name={'costChoice'}
                >
                    <Checkbox.Group >
                        <Row>
                            <Col span={2}>
                                <Checkbox value="0" style={{ lineHeight: '32px' }} />
                            </Col>
                            <Col span={22}>
                                <span>Vé lẻ (vnđ/vé) với giá</span>
                                <Form.Item noStyle name={['cost', 'simple', 'costTicket']} >
                                    <InputNumber style={{ width: '20%', margin: '0 5px' }} />
                                </Form.Item>
                                <span>/ vé.</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={2}>
                                <Checkbox value="1" style={{ lineHeight: '32px' }} />
                            </Col>
                            <Col span={22}>
                                <Input.Group compact style={{ lineHeight: '32px' }} >
                                    <span>Combo vé với giá</span>
                                    <Form.Item noStyle name={['cost', 'combo', 'costTicket']} >
                                        <InputNumber style={{ width: '20%', margin: '0 5px' }}/>
                                    </Form.Item>
                                    <span>/</span>
                                    <Form.Item noStyle name={['cost', 'combo', 'quantity']} >
                                        <InputNumber style={{ width: '20%', margin: '0 5px' }}/>
                                    </Form.Item>
                                    <span>vé.</span>
                                </Input.Group>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item
                    name='status'
                    label='Tình trạng'
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12}}
                >
                    <Select>
                        <Option value="true">Đang áp dụng</Option>
                        <Option value="false">Tắt</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const AddGroupModal = (): JSX.Element => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const onCreate = (values: any) => {
        console.log(values);
        setVisible(false);
    };

    return (
        <>
            <Button
                type="primary" ghost
                onClick={showModal}
            >
                Thêm gói vé
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

export default AddGroupModal;