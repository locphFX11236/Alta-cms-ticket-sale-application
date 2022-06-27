import React, { useState, useEffect } from 'react';
import { Card, Col, DatePickerProps, Input, Popover, Radio, RadioChangeEvent, Row, Space } from 'antd';
import { LeftOutlined, RightOutlined, CalendarOutlined } from '@ant-design/icons';
import moment, { Moment, weekdaysMin, updateLocale } from 'moment';

updateLocale('en', {
    weekdaysMin: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"], // Custom tên cho thứ trong tuần
    week: {
        dow: 1, // Custom cho ngày đầu tiên là T2 với index = 1
        doy: 7 // Custom cho ngày 1 tháng 1 thuộc tuần đầu tiên
    }
}); // Custom cho moment

type CalendarDataProps = (Moment[] | null)[];

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

const valueFormat: DatePickerProps['format'] = (selectedDate: Moment) => (`Tháng ${moment(selectedDate).startOf('month').format('MM, YYYY')}`)

const CalendarHeader = ({selectedDate, setSelectedDate, choiceRadio, setChoiceRadio}: CalendarCustomProps) => {
    const prevMonth = () => selectedDate.clone().subtract(1, 'month');
    const nextMonth = () => selectedDate.clone().add(1, 'month');
    const onChange = (r: RadioChangeEvent) => {
        setChoiceRadio(r.target.value);
    };

    return (
        <Row className='calendar-header'>
            <Row gutter={24} className='calendar-title'>
                <Col span={4} onClick={() => setSelectedDate(prevMonth())}><LeftOutlined /></Col>
                <Col span={16}>{valueFormat(selectedDate)}</Col>
                <Col span={4} onClick={() => setSelectedDate(nextMonth())}><RightOutlined /></Col>
            </Row>
            <Row>
                <Radio.Group className='calendar-radio' onChange={onChange} value={choiceRadio} name='type-calender'>
                    <Radio value={'date'}>Theo ngày</Radio>
                    <Radio value={'week'}>Theo tuần</Radio>
                </Radio.Group>
            </Row>
            <Row className='calendar-week-name'>
              {weekdaysMin().map((a) => (
                <Col>{a}</Col>
              ))}
            </Row>
        </Row>
    );
};

type CalendarContentProps = {
    calendar: CalendarDataProps,
    choiceRadio: String,
    selectedDate: Moment,
    setSelectedDate: React.Dispatch<React.SetStateAction<moment.Moment>>
};

const CalendarContent = ({calendar, choiceRadio, selectedDate, setSelectedDate}: CalendarContentProps): React.ReactElement => {
    // CalendarContent nhận calendar, setSelectedDate để tạo selected mới
    const currentMonth = selectedDate.clone().startOf('month');
    const dateStyle = (day: Moment): String => {
        // So sánh renderDay, với currentMonth, với selected
        if (day.isBefore(currentMonth, 'month'))  return 'before-month';
        if (day.isAfter(currentMonth, 'month')) return 'after-month';
        if (choiceRadio === 'week') {
            const day1 = selectedDate.clone().startOf('week');
            const day2 = selectedDate.clone().endOf('week');
            if (day1.isSame(day, 'day')) return 'date-selected';
            if (day2.isSame(day, 'day')) return 'date-selected';
        } else {
            if (selectedDate.isSame(day, 'day')) return 'date-selected';
        };
        return '';
    };
    const weekStyle = (week: Moment[]): String => {
        if (selectedDate.isSame(week[0], 'week') && choiceRadio === 'week') return 'week-selected';
        return '';
    };

    return (
        <>
            {calendar.map((week: any) => (
                <Row className={`calendar-week ${weekStyle(week)}`}>
                    {week.map((day: any) => (
                        <Col onClick={() => setSelectedDate(day)}>
                            <div className={`calendar-day ${dateStyle(day)}`}>
                                {day.format('D').toString()}
                            </div>
                        </Col>
                    ))}
                </Row>
            ))}
        </>
    );
};

type CalendarCustomProps = {
    selectedDate: Moment,
    setSelectedDate: React.Dispatch<React.SetStateAction<moment.Moment>>,
    choiceRadio: String,
    setChoiceRadio: React.Dispatch<React.SetStateAction<String>>
};

const CalendarCustom = ({selectedDate, setSelectedDate, choiceRadio, setChoiceRadio}: CalendarCustomProps): React.ReactElement  => {
    // Calendar nhận dữ liệu calendarData
    const [calendar, setCalendar] = useState<CalendarDataProps>([]);

    useEffect(() => {
        setCalendar(calendarData(selectedDate));
    }, [selectedDate]);


    return(
        <Card style={{ width: 300 }} className='calendar-table'>
            <CalendarHeader
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                choiceRadio={choiceRadio}
                setChoiceRadio={setChoiceRadio}
            />
            <CalendarContent
                calendar={calendar}
                choiceRadio={choiceRadio}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
        </Card>
    );
};

type DatePickerDefaultProps = {
    selectedDate: Moment,
    setSelectedDate: React.Dispatch<React.SetStateAction<moment.Moment>>,
    choiceRadio: String,
    setChoiceRadio: React.Dispatch<React.SetStateAction<String>>,
    onChange: VoidFunction
};

const DatePickerCustom = ({selectedDate, setSelectedDate, choiceRadio, setChoiceRadio, onChange}: DatePickerDefaultProps): React.ReactElement => (
    <Space direction="vertical">
        <Popover
            placement="bottomRight"
            content={ <CalendarCustom
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                choiceRadio={choiceRadio}
                setChoiceRadio={setChoiceRadio}
            /> }
            trigger="click"
            onVisibleChange={onChange}
        >
            <Input
                className="input-calendar"
                placeholder="DD/MM/YY"
                value={valueFormat(selectedDate)}
                suffix={
                    <CalendarOutlined
                        style={{ color: '#FF993C' }}
                    />
                }
            />
        </Popover>
    </Space>
);

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