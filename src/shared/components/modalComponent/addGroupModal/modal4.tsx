import { useState } from 'react';
import { Modal, Button, DatePicker, Form, Input, Col, Checkbox, Row, Select } from 'antd';
import moment from 'moment';

const { Option } = Select;

const ModalBox = (props: any): JSX.Element => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log('Click OK');
        setIsModalVisible(false);
    };

    const handleCancle = () => {
        console.log('Click Cancel');
        setIsModalVisible(false);
    };

    return (
        <>
            <Button
                type="primary" ghost
                icon={ props.component }
                onClick={showModal}
            >
                Thêm gói vé
            </Button>
            <Modal
                title="Thêm gói vé"
                visible={isModalVisible}
                footer={[
                    <Button
                        key="link"
                        type="primary"
                        onClick={handleCancle}
                    >
                        Hủy
                    </Button>,
                    <Button
                        key="link"
                        type="primary"
                        onClick={handleOk}
                    >
                        Lưu
                    </Button>
                ]}
            >
                <Form>
                    <Form.Item>
                        <label htmlFor='dateFrom'>Tên gói vé</label><br/>
                        <Input placeholder="Basic usage" />
                    </Form.Item>
                    <Form.Item>
                        <Input.Group style={{ display: 'flex' }} compact>
                            <Col span={12}>
                                <label htmlFor='dateFrom'>Ngày áp dụng</label><br/>
                                <div style={{ display: 'flex' }}>
                                    <DatePicker id='dateTo' defaultValue={ moment(moment(),"DD-MM-YYYY") } format={"DD-MM-YYYY"} />
                                    <DatePicker id='dateFrom' defaultValue={ moment(moment(),"HH:MM:MS") } format={"HH:MM:MS"} />
                                </div>
                            </Col>
                            <Col span={12}>
                                <label htmlFor='dateTo'>Ngày hết hạn</label><br/>
                                <div style={{ display: 'flex' }}>
                                    <DatePicker id='dateTo' defaultValue={ moment(moment(),"DD-MM-YYYY") } format={"DD-MM-YYYY"} />
                                    <DatePicker id='dateFrom' defaultValue={ moment(moment(),"HH:MM:MS") } format={"HH:MM:MS"} />
                                </div>
                            </Col>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item name="checkInGate">
                        <label htmlFor='checkInGate'>Giá vé áp dụng</label><br/>
                        <Checkbox.Group style={{ width: '100%' }}>
                            <Row>
                                <Checkbox value="0">
                                    Vé lẻ (vnđ/vé) với giá 
                                    <Input style={{ width: '30%', margin: '5px' }} placeholder="Basic usage" />
                                     / vé.
                                </Checkbox>
                            </Row>
                            <Row>
                                <Checkbox value="1">
                                    Combo vé với giá 
                                    <Input style={{ width: '30%', margin: '5px' }} placeholder="Basic usage" />
                                    / <Input style={{ width: '30%', margin: '5px' }} placeholder="Basic usage" /> vé.
                                </Checkbox>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item>
                        <label htmlFor='dateFrom'>Tình trạng: </label><br/>
                        <Select defaultValue="true" style={{ width: '200px' }}>
                            <Option value="true">Đang áp dụng</Option>
                            <Option value="false">Tắt</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalBox;