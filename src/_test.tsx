import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

const DatePickerCustom: React.FC = () => {
  const [ selectedDate, setSelectedDate ] = useState<Array<Number | null>>([]);
  const isDateSelect = false;
  
  const onChange: DatePickerProps['onChange'] = (value, dateString) => {
    // Khi thay đổi sự lựa chọn (selected)
    // 'value' là thông tin về ngày giờ click vào, theo kiểu moment
    // 'dateString' là chỗi là ngày hôm nay, vd: '2022-19-06'
    if (isDateSelect) {
      const newDate: Number = moment(value).startOf("day").valueOf();
      setSelectedDate([ newDate, newDate ]);
    } else {
      const newDate: Number = moment(value).startOf("day").valueOf();
      const newDay: Number = moment(value).day();
      const min: Number = +newDate - +newDay*1000*60*60*24;
      const max: Number = +newDate + (6 - +newDay)*1000*60*60*24;
      setSelectedDate([ min, max ])
    }
  };

  const dateRender: DatePickerProps['dateRender'] = (currentDate) => {
    // Khi ta Render bảng dữ liệu render sẽ nằm trong thẻ div bên dưới
    // 'currentDate' là dữ liệu của ô ta hover, selected
    // 'today' là dữ liệu của hôm nay
    if (isDateSelect) {
      const isSelected = selectedDate.includes(moment(currentDate).startOf("day").valueOf())
      let selectStyle: React.CSSProperties = isSelected ?
        {
          position: 'relative',
          zIndex: 2,
          display: 'inlineBlock',
          width: "24px",
          height: "22px",
          lineHeight: "22px",
          backgroundColor: "orange",
          color: "#fff",
          margin: "auto",
          borderRadius: "12px",
          transition: "background 0.3s, border 0.3s"
        } : {}
      return (<div style={selectStyle} > {currentDate.day()}  </div >)
    } else {
      const isSelected = selectedDate.includes(moment(currentDate).startOf("day").valueOf())
      let selectRankStyle: React.CSSProperties = isSelected ?
        {
          position: 'relative',
          zIndex: 2,
          display: 'inlineBlock',
          // width: "24px",
          height: "22px",
          lineHeight: "22px",
          backgroundColor: "orange",
          color: "#fff",
          margin: "auto",
          borderRadius: "12px",
          transition: "background 0.3s, border 0.3s"
        } : {}
      return (
        <div style={selectRankStyle}> 
          <div>{currentDate.date()}</div>
        </div>
      );
    }
  };

  const onSelect: DatePickerProps['onSelect'] = value => {
    console.log(value);
  };

  const customWeekStartEndFormat: DatePickerProps['format'] = value =>
  `${moment(value).startOf('week').format('MM/DD')} ~ ${moment(value)
    .endOf('week')
    .format('MM/DD')}`;
  
  return(
    <Space direction="vertical">
      <DatePicker 
        open
        dateRender={dateRender} // Khi ta Render bảng dữ liệu render sẽ nằm trong thẻ div bên dưới
        // panelRender // Thay đổi calendar hiện ra
        onChange={onChange} // Khi thay đổi sự lựa chọn (selected)
        format={customWeekStartEndFormat}
        onSelect={onSelect}
        picker='week'
      />
    </Space>
  );
};

export default DatePickerCustom;