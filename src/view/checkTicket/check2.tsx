import { useState } from 'react';
import { Col, Button, Form, Radio, Typography, Row } from 'antd';
import moment, { Moment } from 'moment';
import { connect } from 'react-redux';

import DatePickerCustom from '../../shared/components/calendar/calendar';
import { FilterTicketList } from '../../core/store/actionCreators';

const FormRender = ({onCreate}: any) => {
    const [ value1, setValue1 ] = useState<Moment>(moment());
    const [ value2, setValue2 ] = useState<Moment>(moment());
    const [form] = Form.useForm();
    const onSelected1 = (d: any) => {setValue1(d)};
    const onSelected2 = (d: any) => {setValue2(d)};
    const onFinish = () => (form
        .validateFields()
        .then(filter => {
            filter.useDateFrom = moment(value1).format('YYYY-MM-DD');
            filter.useDateTo = moment(value2).format('YYYY-MM-DD');
            onCreate(filter);
            form.resetFields();
        })
        .catch(info => {
            console.log('Validate Failed:', info);
        })
    );

    return(
        <Form
            name='checkTicket'
            layout='vertical'
            form={form}
            onFinish={onFinish}
            initialValues={{
                checkStatus: 'Tất cả'
            }}
        >
            <Form.Item
                name='checkStatus'
                label='Tình trạng đối soát'
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Radio.Group>
                    <Radio value='Tất cả'>Tất cả</Radio>
                    <Radio value={true}>Đã đối soát</Radio>
                    <Radio value={false}>Chưa đối soát</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item>
                <Row>
                    <Col span={12}><label>Loại vé</label></Col>
                    <Col span={12}><span>Vé cổng</span></Col>
                </Row>
            </Form.Item>
            <Form.Item
                name="useDateFrom"
                label='Từ ngày'
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
                style={{ width: '50%', display: 'inline-block' }}
            >
                <DatePickerCustom format='DD/MM/YYYY' visibleChange={onSelected1} />
            </Form.Item>
            <Form.Item
                name="useDateTo"
                label='Đến ngày'
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
                style={{ width: '50%', display: 'inline-block' }}
            >
                <DatePickerCustom format='DD/MM/YYYY' visibleChange={onSelected2} />
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
    const onCreate = (filter: any) => {
        console.log(filter);
        return props.dispatch( FilterTicketList(filter) );
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