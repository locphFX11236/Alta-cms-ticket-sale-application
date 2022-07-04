import { useState } from 'react';
import { Modal, Button, Form, Radio, Checkbox, Row, Col } from 'antd';
import Icon from '@ant-design/icons';
import moment from 'moment';

import DatePickerCustom from '../calendar/calendar';
import { Filter } from '../../assets/icon/iconSvg';

const FormRender = ({visible, onCancel, onCreate}: any): JSX.Element => {
    const [ value1, setValue1 ] = useState<String>(moment().format('DD/MM/YYYY'));
    const [ value2, setValue2 ] = useState<String>(moment().format('DD/MM/YYYY'));
    const [form] = Form.useForm();
    const onSelected1 = (d: any) => {setValue1(d)};
    const onSelected2 = (d: any) => {setValue2(d)};
    const onFinish = () => (form
        .validateFields()
        .then(values => {
            values.dateFrom = value1;
            values.dateTo = value2;
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
                    tikectStatus: 'Tất cả',
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
                    name="tikectStatus"
                    label="Tình trạng sử dụng"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Radio.Group>
                        <Radio value={'Tất cả'}>Tất cả</Radio>
                        <Radio value={'Đã sử dụng'}>Đã sử dụng</Radio>
                        <Radio value={'Chưa sử dụng'}>Chưa sử dụng</Radio>
                        <Radio value={'Hết hạn'}>Hết hạn</Radio>
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
                                <Checkbox value="Cổng 1">Cổng 1</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="Cổng 2">Cổng 2</Checkbox>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <Checkbox value="Cổng 3">Cổng 3</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="Cổng 4">Cổng 4</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="Cổng 5">Cổng 5</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const ModalBox = (): JSX.Element => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const onCreate = (values: any) => {
        console.log('Received values of form: ', values);
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

export default ModalBox;