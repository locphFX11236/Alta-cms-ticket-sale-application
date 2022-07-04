import { useState } from 'react';
import { Modal, Button, Form, Col } from 'antd';
import moment from 'moment';
import DatePickerCustom from '../calendar/calendar';

const FormRender = ({record, visible, onCreate, onCancel}: any) => {
    const [ value, setValue ] = useState<String>(moment().format('DD/MM/YYYY'));
    const [form] = Form.useForm();
    const onSelected = (d: any) => {setValue(d)};
    const onFinish = () => (form
        .validateFields()
        .then(values => {
            values.expDate = value;
            onCreate(values);
            form.resetFields();
        })
        .catch(info => {
            console.log('Validate Failed:', info);
        })
    );

    return (
        <Modal
            title="Đổi ngày sử dụng vé"
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
                name='changeDate'
                className='change-date'
                layout='horizontal'
                form={form}
                initialValues={{
                    'expDate': record.expDate
                }}
            >
                <Form.Item label='Số vé' labelCol={{ span: 8 }}>
                    <Col span={16}><span>{record.ticketNum}</span></Col>
                </Form.Item>
                <Form.Item label='Loại vé' labelCol={{ span: 8 }}>
                    <Col span={16}><span>{record.typeTicket}</span></Col>
                </Form.Item>
                <Form.Item label='Tên sự kiện' labelCol={{ span: 8 }}>
                    <Col span={16}><span>{record.event}</span></Col>
                </Form.Item>
                <Form.Item name='expDate' label='Hạn sử dụng' labelCol={{ span: 8 }} wrapperCol={{ span: 16}}>
                    <DatePickerCustom format='DD/MM/YYYY' visibleChange={onSelected} defaultDate={record.expDate}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const ChangeDateModal = ({record}: any): JSX.Element => {
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
            <Button type="link" onClick={showModal}>Đổi ngày sử dụng vé</Button>
            <FormRender
                record={record}
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                  setVisible(false);
                }}
            />
        </>
    );
};

export default ChangeDateModal;