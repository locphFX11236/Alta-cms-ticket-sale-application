import { useState } from 'react';
import { Modal, Button, Form, Input, Col, Checkbox, Row, Select, TimePicker } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import moment from 'moment';
import DatePickerCustom from '../calendar/calendar';
import { UpdateGroupData } from '../../../modules/handleGroupData';
import { connect } from 'react-redux';
import { UpdateGroup } from '../../../core/store/actionCreators';

const { Option } = Select;

const FormRender = ({record, visible, onCreate, onCancel}: any) => {
    const [ fromDate, setFromDate ] = useState<String>(record.applicableDate.slice(9));
    const [ toDate, setToDate ] = useState<String>(record.expDate.slice(9));
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
            title="Cập nhật thông tin gói vé"
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
                name='updateGroupModal'
                layout='vertical'
                form={form}
                initialValues={{
                    groupCode: record.groupCode,
                    groupName: record.groupName,
                    costChoice: ['s'],
                    status: record.status,
                    from: { time: moment(record.applicableDate.slice(0, 7), 'HH:mm:ss') },
                    to: { time: moment(record.expDate.slice(0, 7), 'HH:mm:ss') },
                    cost: {
                        simple: {costTicket: record.costTicket},
                        combo: {
                            costTicket: record.costCombo.cost,
                            quantity: record.costCombo.quantity
                        }
                    }
                }}
            >
                <Form.Item
                    label='Mã sự kiện'
                    name='groupCode'
                    labelCol={{ span: 20 }}
                    wrapperCol={{ span: 20 }}
                    style={{ display: 'inline-block', width: '50%', margin: 0 }}
                    rules={[{ required: true, message: 'Please input group code!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Tên sự kiện'
                    name='groupName'
                    labelCol={{ span: 20 }}
                    wrapperCol={{ span: 20 }}
                    style={{ display: 'inline-block', width: '50%', margin: 0 }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Ngày áp dụng'
                    name='from'
                    style={{ display: 'inline-block', width: '50%', margin: 0 }}
                >
                    <Input.Group compact>
                        <Col span={12}>
                            <Form.Item name={['from', 'date']} >
                                <DatePickerCustom
                                    format='DD-MM-YYYY'
                                    visibleChange={onSelected1}
                                    defaultDate={record.applicableDate.slice(10)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name={['from', 'time']} >
                                <TimePicker defaultValue={ moment(record.applicableDate.slice(0, 8), 'HH:mm:ss') }/>
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
                                    defaultDate={record.expDate.slice(10)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name={['to', 'time']} >
                                <TimePicker defaultValue={ moment(record.expDate.slice(0, 8), 'HH:mm:ss') }/>
                            </Form.Item>
                        </Col>
                    </Input.Group>
                </Form.Item>
                <Form.Item
                    label='Giá vé áp dụng'
                    name='costChoice'
                >
                    <Checkbox.Group >
                        <Row>
                            <Col span={2}>
                                <Checkbox value="s" style={{ lineHeight: '32px' }} />
                            </Col>
                            <Col span={22}>
                                <span>Vé lẻ (vnđ/vé) với giá</span>
                                <Form.Item noStyle name={['cost', 'simple', 'costTicket']} >
                                    <Input style={{ width: '20%', margin: '0 5px' }} defaultValue={ record.costTicket }/>
                                </Form.Item>
                                <span>/ vé.</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={2}>
                                <Checkbox value="c" style={{ lineHeight: '32px' }} />
                            </Col>
                            <Col span={22}>
                                <Input.Group compact style={{ lineHeight: '32px' }} >
                                    <span>Combo vé với giá</span>
                                    <Form.Item noStyle name={['cost', 'combo', 'costTicket']} >
                                        <Input style={{ width: '20%', margin: '0 5px' }} defaultValue={ record.costCombo.cost ? record.costCombo.cost : 0 }/>
                                    </Form.Item>
                                    <span>/</span>
                                    <Form.Item noStyle name={['cost', 'combo', 'quantity']} >
                                        <Input style={{ width: '20%', margin: '0 5px' }} defaultValue={ record.costCombo.quantity ? record.costCombo.quantity : 0 }/>
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
                        <Option value="Đang áp dụng">Đang áp dụng</Option>
                        <Option value="Tắt">Tắt</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const UpdateGroupModal = (props: any): JSX.Element => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const onCreate = (values: any) => {
        const data = UpdateGroupData(values, props.record);
        setVisible(false);
        props.dispatch(UpdateGroup(data, data.id));
    };

    return (
        <>
            <Button
                type="link"
                onClick={showModal}
            >
                <FormOutlined />Cập nhật
            </Button>
            <FormRender
                visible={visible}
                record={props.record}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </>
    );
};

export default connect()(UpdateGroupModal);