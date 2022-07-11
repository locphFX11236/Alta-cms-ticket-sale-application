import React, { useState, useEffect } from 'react';
import { Card, Col, DatePickerProps, Input, Popover, Radio, RadioChangeEvent, Row, Space } from 'antd';
import { LeftOutlined, RightOutlined, CalendarOutlined } from '@ant-design/icons';
import moment, { Moment, weekdaysMin, updateLocale } from 'moment';

type CalendarContentProps = {
    calendar: CalendarDataProps,
    choiceRadio: String,
    selectedDate: Moment,
    setSelectedDate: React.Dispatch<React.SetStateAction<moment.Moment>>
};

type CalendarDataProps = (Moment[] | null)[];

type CalendarCustomProps = {
    selectedDate: Moment,
    setSelectedDate: React.Dispatch<React.SetStateAction<moment.Moment>>,
    choiceRadio: String,
    setChoiceRadio: React.Dispatch<React.SetStateAction<String>>
};

updateLocale('en', {
    weekdaysMin: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"], // Custom tên cho thứ trong tuần
    week: {
        dow: 1, // Custom cho ngày đầu tiên là T2 với index = 1
        doy: 7 // Custom cho ngày 1 tháng 1 thuộc tuần đầu tiên
    }
}); // Custom cho moment

const valueFormat: DatePickerProps['format'] = (selectedDate: Moment) => (`Tháng ${moment(selectedDate).startOf('month').format('MM, YYYY')}`)

const dateStyle = (day: Moment, selectedDate: Moment, choiceRadio: String): String => {
    const currentMonth = selectedDate.clone().startOf('month');
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

const weekStyle = (week: Moment[], selectedDate: Moment, choiceRadio: String): String => {
    if (selectedDate.isSame(week[0], 'week') && choiceRadio === 'week') return 'week-selected';
    return '';
};

const calendarData = (rootDate: Moment): CalendarDataProps => {
    const startDay: Moment = rootDate.clone().startOf('month').startOf('week'); // Lấy thông tin ngày của tuần chứa ngày đầu tiên của tháng.
    const endDay: Moment = rootDate.clone().endOf('month').endOf('week'); // Lấy thông tin ngày của tuần chứa ngày cuối cùng của tháng.
    const day: Moment = startDay.clone().subtract(1, 'day'); // Lấy thông tin ngày sẽ render, bắt đầu từ ngày trước (startDay).
    const calendar: CalendarDataProps = []; // Sẽ là mảng render thông tin tháng, chứa các mảng render thông tin tuần.

    while(day.isBefore(endDay, 'day')) { // Vòng lập chạy cho đến khi (day) đến trước ngày (endDay).
        calendar.push(
            Array(7).fill(0).map( () => day.add(1, 'day').clone() ) // Ngày đầu tiên được nạp vào mảng là (day) + 1 ngày.
        )
    };
    return calendar; // = [ [ Tuần 1 ], [ 2 ], ... ]
};

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
                {weekdaysMin().map((a, i) => (
                    <Col key={i}>{a}</Col>
                ))}
            </Row>
        </Row>
    );
};

const CalendarContent = ({calendar, choiceRadio, selectedDate, setSelectedDate}: CalendarContentProps): React.ReactElement => (
    <>
        {calendar.map((week: any, index: any) => (
            <Row className={`calendar-week ${weekStyle(week, selectedDate, choiceRadio)}`} key={index}>
                {week.map((day: any, index: any) => (
                    <Col onClick={() => setSelectedDate(day)} key={index}>
                        <div className={`calendar-day ${dateStyle(day, selectedDate, choiceRadio)}`}>
                            {day.format('D').toString()}
                        </div>
                    </Col>
                ))}
            </Row>
        ))}
    </>
);

const CalendarCustom = ({picker, date, setDate}: any): React.ReactElement  => {
    // Calendar nhận dữ liệu calendarData
    const [ calendar, setCalendar ] = useState<CalendarDataProps>([]);
    const [ selectedDate, setSelectedDate ] = useState<Moment>(date);
    const [ choiceRadio, setChoiceRadio ] = useState<String>(picker);

    useEffect(() => {
        setCalendar(calendarData(selectedDate));
        setDate(selectedDate);
    }, [selectedDate, setDate]);

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

const DatePickerCustom = ({ format, onChange, defaultDate}: any): React.ReactElement => {
    const [ date, setDate ] = useState<Moment>(defaultDate ? defaultDate : moment());
    const defaultFormat = format ? date.format(format) : valueFormat(date);
    const visibleChange = () => {onChange(date)}

    return (
        <Space direction="vertical">
            <Popover
                placement="bottomRight"
                content={ <CalendarCustom picker={'date'} date={date} setDate={setDate}/> }
                trigger="click"
                onVisibleChange={visibleChange}
            >
                <Input
                    className="input-calendar"
                    placeholder="dd/mm/yy"
                    value={defaultFormat}
                    suffix={ <CalendarOutlined style={{ color: '#FF993C' }} /> }
                />
            </Popover>
        </Space>
    );
};

export default DatePickerCustom;