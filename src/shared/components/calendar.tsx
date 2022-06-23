// import { Calendar, Space, Radio, Row, DatePicker, Card } from 'antd';
// import { LeftOutlined, RightOutlined } from '@ant-design/icons';
// import type { DatePickerProps } from 'antd';
// import moment from 'moment';
// import type { Moment } from 'moment';
// import React, { useState } from 'react';

// const customWeekStartEndFormat: DatePickerProps['format'] = (value) => (`Tháng ${moment(value).startOf('month').format('MM/YYYY')}`)

// const CalendarHeader = (): JSX.Element => (
//   <div style={{ padding: 10 }}>
//     <Row>
//       <h3>
//         <LeftOutlined />
//         <DatePicker
//           className='calendar-title'
//           picker="month"
//           bordered={false}
//           suffixIcon={false}
//           allowClear={false}
//           defaultValue={moment(new Date())}
//           format={customWeekStartEndFormat}
//           size={'large'}
//         />
//         <RightOutlined />
//       </h3>
//     </Row>
//     <Row>
//       <Radio.Group className='calendar-radio' name='type-calender'>
//         <Radio value={'date'}>Theo ngày</Radio>
//         <Radio value={'week'} checked>Theo tuần</Radio>
//       </Radio.Group>
//     </Row>
//   </div>
// );

// const CalendarCustom: React.FC = () => {
//   const [ selectedDate, setSelectedDate ] = useState<Array<Number | null>>([]);
//   const isDateSelect = true;

//   const onSelect = (value: Moment) => {
//     console.log(value)
//     if (isDateSelect) {
//       const newDate: Number = moment(value).startOf("day").valueOf();
//       setSelectedDate([ newDate, newDate ]);
//     } else {
//       const newDate: Number = moment(value).startOf("day").valueOf();
//       const newDay: Number = moment(value).day();
//       const min: Number = +newDate - +newDay*1000*60*60*24;
//       const max: Number = +newDate + (6 - +newDay)*1000*60*60*24;
//       setSelectedDate([ min, max ])
//     }
//   };

//   const dateFullCellRender = (date: Moment) => {
//     const isSelected = selectedDate.includes(moment(date).startOf("day").valueOf())
//     let selectStyle: React.CSSProperties = isSelected ?
//       {
//         position: 'relative',
//         zIndex: 2,
//         display: 'inlineBlock',
//         width: "24px",
//         height: "22px",
//         lineHeight: "22px",
//         backgroundColor: "#FFB800",
//         color: "#fff",
//         margin: "auto",
//         borderRadius: "12px",
//         transition: "background 0.3s, border 0.3s"
//       } : {}
//     return (<div style={selectStyle} >{date.date()}</div >)
//   };

//   return (
//     <Card style={{ width: 300 }} >
//       <Calendar
//         fullscreen={false}
//         headerRender={() => <CalendarHeader />}
//         dateFullCellRender={dateFullCellRender}
//         onSelect={onSelect}
//       />
//     </Card>
//   );
// };

// const DatePickerCustom: React.FC = () => {

//   return(
//     <Space direction="vertical">
//       <DatePicker 
//         open
//         panelRender={ () => <CalendarCustom /> } // Thay đổi calendar hiện ra
//         format={customWeekStartEndFormat}
//         defaultValue={moment(new Date())}
//       />
//     </Space>
//   );
// };

// export default DatePickerCustom;


import React, { useState, useEffect } from 'react';
import moment, { Moment, weekdaysMin, updateLocale } from 'moment';
import { Card, Col, DatePicker, DatePickerProps, Radio, Row, Space } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

updateLocale('en', {
    weekdaysMin: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"], // Custom tên cho thứ trong tuần
    week: {
        dow: 1, // Custom cho ngày đầu tiên là T2 với index = 1
        doy: 7 // Custom cho ngày 1 tháng 1 thuộc tuần đầu tiên
    }
}); // Custom cho moment

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

const calendarStyle = (day: any, value: any) => {
  const isSelected = () => value.isSame(day, 'day');
  const beforeToday = () => day.isBefore(new Date(), 'day');
  const isToday = () => day.isSame(new Date(), 'day');

  if (beforeToday()) return 'before';
  if (isSelected()) return 'date-selected';
  if (isToday()) return 'today';
  return '';
};

const customWeekStartEndFormat: DatePickerProps['format'] = (value) => (`Tháng ${moment(value).startOf('month').format('MM, YYYY')}`)

const CalendarHeader = ({value, setValue}: CalendarVar) => {
    const prevMonth = () => value.clone().subtract(1, 'month');
    const thisMonth = () => value.isSame(new Date(), 'month');
    const nextMonth = () => value.clone().add(1, 'month');

    return (
        <Row className='calendar-header'>
            <Row gutter={24}>
                <Col span={4} onClick={() => !thisMonth() && setValue(prevMonth())}><LeftOutlined /></Col>
                <Col span={16}>{customWeekStartEndFormat(value)}</Col>
                <Col span={4} onClick={() => setValue(nextMonth())}><RightOutlined /></Col>
            </Row>
            <Row>
                <Radio.Group className='calendar-radio' name='type-calender'>
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
    );
};

type CalendarDataProps = (Moment[] | null)[];
type CalendarVar = {
    value: Moment,
    setValue: React.Dispatch<React.SetStateAction<moment.Moment>>
};

const CalendarCustom = ({value, setValue}: CalendarVar): JSX.Element  => {
    const [calendar, setCalendar] = useState<CalendarDataProps>([]);

    useEffect(() => {
        setCalendar(calendarData(value));
    }, [value]);

    return(
        <Card style={{ width: 300 }} className='calendar-table'>
            <CalendarHeader value={value} setValue={setValue}/>
            {calendar.map((week: any) => (
                <Row className='calendar-week'>
                    {week.map((day: any) => (
                        <Col className='calendar-day' onClick={() => setValue(day)}>
                            <div className={calendarStyle(day, value)} >
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
    const [value, setValue] = useState<Moment>(moment()); // Thông tin về ngày, giờ hiện tại, theo Moment Object.

    return(
        <Space direction="vertical">
            <DatePicker
                open
                panelRender={ () => <CalendarCustom value={value} setValue={setValue} /> } // Thay đổi calendar hiện ra
                format={customWeekStartEndFormat}
                defaultValue={value}
            />
        </Space>
    );
};

export default DatePickerCustom;


// import React, { useState } from "react";
// import { DatePicker, Button } from "antd";
// import moment from "moment";

// const MultipleDatePicker = () => {
//   const [ selectedDate, setSelectedDate ] = useState<Array<Number | null>>([]);

//   const onValueChange = (date: any) => {
//     console.log(date);
//     const newDate: number = moment(date).startOf("day").valueOf();
//     if (selectedDate.includes( newDate )) {
//       setSelectedDate([...selectedDate.filter(item => item !== newDate)])
//     } else {
//       setSelectedDate([ ...selectedDate, newDate ])
//     }
//   };

//   const dateRender = (currentDate: any) => {
//     const isSelected = selectedDate.includes(moment(currentDate).startOf("day").valueOf())
//     let selectStyle: React.CSSProperties = isSelected ?
//       {
//         position: 'relative',
//         zIndex: 2,
//         display: 'inlineBlock',
//         width: "24px",
//         height: "22px",
//         lineHeight: "22px",
//         backgroundColor: "#1890ff",
//         color: "#fff",
//         margin: "auto",
//         borderRadius: "2px",
//         transition: "background 0.3s, border 0.3s"
//       } : {}
//     return (<div style={selectStyle} > {currentDate.date()}  </div >)
//   }

//   return (
//     <>
//       <div>
//         <DatePicker
//           open
//           dateRender={dateRender}
//           onChange={onValueChange}
//           picker='week'
//         />
//         <Button type='primary' onClick={() => console.log(selectedDate)}>Chon ngay</Button>
//       </div>
//     </>
//   )
// }
// export default MultipleDatePicker;