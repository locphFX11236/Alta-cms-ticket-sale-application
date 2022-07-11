import { useState } from 'react';
import { Col, Button, Form, Radio, Typography, Row } from 'antd';
import moment, { Moment } from 'moment';
import { connect } from 'react-redux';

import DatePickerCustom from '../../shared/components/calendar/calendar';
import { FilterTicketList } from '../../core/store/actionCreators';
import { HandleTicketFilter } from '../../shared/helper/handleTicketData';

const FormRender = ({onCreate}: any) => {
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

    return(
        <Form
            name='checkTicket'
            layout='horizontal'
            form={form}
            onFinish={onFinish}
            initialValues={{
                checkStatus: 'all'
            }}
        >
            <Form.Item
                name='checkStatus'
                label='Tình trạng đối soát'
                labelCol={{ span: 12 }}
                labelAlign='left'
                wrapperCol={{ span: 8 }}
            >
                <Radio.Group>
                    <Radio value='all'>Tất cả</Radio>
                    <Radio value='Đã đối soát'>Đã đối soát</Radio>
                    <Radio value='Chưa đối soát'>Chưa đối soát</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item>
                <Row>
                    <Col span={12}><label>Loại vé:</label></Col>
                    <Col span={12}><span>Vé cổng</span></Col>
                </Row>
            </Form.Item>
            <Form.Item
                name="saleDateFrom"
                label='Từ ngày'
                labelCol={{ span: 12 }}
                labelAlign='left'
                wrapperCol={{ span: 12 }}
            >
                <DatePickerCustom format='DD/MM/YYYY' onChange={onSelected1} defaultDate={value1} />
            </Form.Item>
            <Form.Item
                name="saleDateTo"
                label='Đến ngày'
                labelCol={{ span: 12 }}
                labelAlign='left'
                wrapperCol={{ span: 12 }}
            >
                <DatePickerCustom format='DD/MM/YYYY' onChange={onSelected2} defaultDate={value2} />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
                <Button type="primary" htmlType="submit">
                    Lọc
                </Button>
            </Form.Item>
        </Form>
    );
};

const Check2 = (props: any) => {
    const onCreate = (values: any) => {
        const ticketFilter = HandleTicketFilter(values)
        props.dispatch( FilterTicketList(ticketFilter) );
    };

    return(
        <>
            <Typography.Title>Lọc vé</Typography.Title>
            <FormRender
                onCreate={onCreate}
            />
        </>
    );
};

export default connect()(Check2);