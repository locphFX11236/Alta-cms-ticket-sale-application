import { useState } from 'react';
import { Modal, Button, Form, Col } from 'antd';
import moment, { Moment } from 'moment';
import { connect } from 'react-redux';

import DatePickerCustom from '../calendar/calendar';
import { ChangeExpDate } from '../../../core/store/actionCreators';

const FormRender = ({record, index, visible, onCreate, onCancel}: any) => {
    const [ value, setValue ] = useState<Moment>(moment(record.expDate));
    const [form] = Form.useForm();
    const onSelected = (d: any) => {setValue(d)};
    const onFinish = () => (form
        .validateFields()
        .then(values => {
            values.index = index;
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
                    key="cancel"
                    type="primary"
                    onClick={onCancel}
                >
                    Hủy
                </Button>,
                <Button
                    key="ok"
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
                    <DatePickerCustom format='DD/MM/YYYY' onChange={onSelected} defaultDate={value}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const ChangeDateModal = (props: any): JSX.Element => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const onCreate = (value: any) => {
        props.dispatch( ChangeExpDate(value) );
        setVisible(false);
    };

    return (
        <>
            <Button type="link" onClick={showModal}>Đổi hạn sử dụng vé</Button>
            <FormRender
                record={props.record}
                index={props.index}
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                  setVisible(false);
                }}
            />
        </>
    );
};

export default connect()(ChangeDateModal);