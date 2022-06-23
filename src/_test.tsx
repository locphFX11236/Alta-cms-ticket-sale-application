import React, { useState, useEffect } from 'react';
import { Card, Col, DatePicker, DatePickerProps, Radio, RadioChangeEvent, Row, Space } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import moment, { Moment, weekdaysMin, updateLocale } from 'moment';

updateLocale('en', {
    weekdaysMin: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"], // Custom tên cho thứ trong tuần
    week: {
        dow: 1, // Custom cho ngày đầu tiên là T2 với index = 1
        doy: 7 // Custom cho ngày 1 tháng 1 thuộc tuần đầu tiên
    }
}); // Custom cho moment

type CalendarDataProps = (Moment[] | null)[];
type CalendarVar = {
    value: Moment,
    setValue: React.Dispatch<React.SetStateAction<moment.Moment>>
};

const calendarData = (value: Moment): CalendarDataProps => {
    const startDay: Moment = value.clone().startOf('month').startOf('week'); // Lấy thông tin ngày của tuần chứa ngày đầu tiên của tháng.
    const endDay: Moment = value.clone().endOf('month').endOf('week'); // Lấy thông tin ngày của tuần chứa ngày cuối cùng của tháng.
    const day: Moment = startDay.clone().subtract(1, 'day'); // Lấy thông tin ngày sẽ render, bắt đầu từ ngày trước (startDay).
    const calendar: CalendarDataProps = []; // Sẽ là mảng render thông tin tháng, chứa các mảng render thông tin tuần.

    while(day.isBefore(endDay, 'day')) { // Vòng lập chạy cho đến khi (day) đến trước ngày (endDay).
        calendar.push(
            Array(7).fill(0).map( () => day.add(1, 'day').clone() ) // Ngày đầu tiên được nạp vào mảng là (day) + 1 ngày.
        )
    };
    return calendar; // = [ [ Tuần 1 ], [ 2 ], ... ]
};

const customWeekStartEndFormat: DatePickerProps['format'] = (value) => (`Tháng ${moment(value).startOf('month').format('MM, YYYY')}`)

const dayState = (day: any, selectedDate: any, value: any) => {
    const isSelected = () => selectedDate.isSame(day, 'day');
    const beforeMonth = () => day.isBefore(value, 'month');
    const isAfter = () => day.isAfter(value, 'month');

    if (beforeMonth()) return 'before-month';
    if (isSelected()) return 'date-selected';
    if (isAfter()) return 'after-month';
    return '';
  };
  
const CalendarCustom = (): JSX.Element  => {
    const [value, setValue] = useState<Moment>(moment()); // Thông tin về ngày, giờ hiện tại, theo Moment Object.
    const [calendar, setCalendar] = useState<CalendarDataProps>([]);
    const [ selectedDate, setSelectedDate ] = useState<any>(value);
    const prevMonth = () => value.clone().subtract(1, 'month');
    const nextMonth = () => value.clone().add(1, 'month');

    const onSelect = (day: any) => {
        setSelectedDate(day);
        setValue(day);
    };

    const onChange = ({ target: { value } }: RadioChangeEvent) => {
        console.log(value)
    };

    useEffect(() => {
        setCalendar(calendarData(value));
        console.log(selectedDate);
    }, [value]);

    return(
        <Card style={{ width: 300 }} className='calendar-table'>
            <Row className='calendar-header'>
                <Row gutter={24}>
                    <Col span={4} onClick={() => setValue(prevMonth())}><LeftOutlined /></Col>
                    <Col span={16}>{customWeekStartEndFormat(value)}</Col>
                    <Col span={4} onClick={() => setValue(nextMonth())}><RightOutlined /></Col>
                </Row>
                <Row>
                    <Radio.Group onChange={onChange} className='calendar-radio' name='type-calender'>
                        <Radio value={'date'}>Theo ngày</Radio>
                        <Radio value={'week'} checked>Theo tuần</Radio>
                    </Radio.Group>
                </Row>
                <Row className='calendar-week'>
                    {weekdaysMin().map((a) => (
                        <Col>{a}</Col>
                    ))}
                </Row>
            </Row>
            {calendar.map((week: any) => (
                <Row className='calendar-week'>
                    {week.map((day: any) => (
                        <Col className='calendar-day' onClick={() => onSelect(day) }>
                            <div className={dayState(day, selectedDate, value)} >
                                {day.format('D').toString()}
                            </div>
                        </Col>
                    ))}
                </Row>
            ))}
        </Card>
    );
};

const DatePickerCustom: React.FC = () => {

    return(
        <Space direction="vertical">
            <DatePicker
                open
                panelRender={ () => <CalendarCustom /> } // Thay đổi calendar hiện ra
            />
        </Space>
    );
};

export default DatePickerCustom;

/* Note:
  `.clone()` coppy thời gian hiện tại qua biến khác;
  `.startOf('month')` set thời điểm đầu của tháng ('month');
  `.endOf('week')` set thời điểm cuối của tuần ('week');
  ngày bắt đầu của tuần là chủ nhật với index = 0;
  ngày kết thúc của tuần là thứ 7 với index = 6;
  `.format('MM/DD')` quy định kết quả chuỗi hiển thị từ Moment Object;
  `.subtract(1, 'day')` lấy thông tin về (1) đơn vị trước đó, tham số ('day') chọn đơn vị là ngày;
  `A.isBefore(endDay, 'day')` kiểm tra (A) có trước ngày (endDay) không trả về true/false, tham số ('day') là chọn thành phần so sánh;
  `A.isSame(day, 'day')` kiểm tra (A) có là ngày (day) không trả về true/false, tham số ('day') là chọn thành phần so sánh;
*/