import { Calendar, Col, Radio, Row, Select, DatePicker } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import moment from 'moment';
import React, { useState } from 'react';

const CalendarHeader = (): JSX.Element => (
  <div style={{ padding: 10 }}>
    <Row>
      <h3>
        <LeftOutlined />
        <span>Tháng</span>
        <DatePicker
          className='calendar-title'
          picker="month"
          bordered={false}
          suffixIcon={false}
          allowClear={false}
          defaultValue={moment(new Date(), 'MM/YYYY')}
          size={'large'}
          format={'MM, YYYY'}
        />
        <RightOutlined />
      </h3>
    </Row>
    <Row>
      <Radio.Group className='calendar-radio' name='type-calender'>
        <Radio value={'date'}>Theo ngày</Radio>
        <Radio value={'week'} checked>Theo tuần</Radio>
      </Radio.Group>
    </Row>
  </div>
);

const CalendarPanel = (): JSX.Element => {
  return (
    <div className='calendar'>
      <Calendar
        fullscreen={false}
        headerRender={() => <CalendarHeader />}
      />
    </div>
  );
};

const Datepicker: React.FC = () => {
  const [ selectedDate, setSelectedDate ] = useState<Array<Number | null>>([]);

  const onValueChange = (date: any) => {
    const newDate: Number = moment(date).startOf("day").valueOf(); console.log(newDate);
    if (selectedDate.includes( newDate )) {
      setSelectedDate([...selectedDate.filter(item => item !== newDate)])
    } else {
      setSelectedDate([ ...selectedDate, newDate ])
    }
  };

  const dateRender = (currentDate: any) => {
    const isSelected = selectedDate.includes(moment(currentDate).startOf("day").valueOf())
    let selectStyle: React.CSSProperties = isSelected ?
      {
        position: 'relative',
        zIndex: 2,
        display: 'inlineBlock',
        width: "24px",
        height: "22px",
        lineHeight: "22px",
        backgroundColor: "#1890ff",
        color: "#fff",
        margin: "auto",
        borderRadius: "2px",
        transition: "background 0.3s, border 0.3s"
      } : {}
    return (<div style={selectStyle} > {currentDate.date()}  </div >)
  }

  return <DatePicker
    open
    dateRender={dateRender}
    onChange={onValueChange}
    panelRender={ () => <CalendarPanel /> }
    picker='week'
  />;
};

export default Datepicker;

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