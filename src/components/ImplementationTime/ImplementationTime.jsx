import React from "react";
import "./ImplementationTime.scss";
import { MdDateRange } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ImplementationTime = () => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  return (
    <div className="implementation-time-container">
      <h2>Thời gian thực hiện</h2>
      <div className="date-inputs-container">
        <div className="date-input-group">
          <label htmlFor="startDate">Ngày bắt đầu</label>
          <div className="input-icon-container">
            <DatePicker
              id="startDate"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className="date-input"
            />
            <MdDateRange className="calendar-icon-2" />
          </div>
        </div>
        <div className="date-input-group">
          <label htmlFor="endDate">Ngày dự kiến hoàn thành</label>
          <div className="input-icon-container">
            <DatePicker
              id="endDate"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className="date-input"
            />
            <MdDateRange className="calendar-icon-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationTime;
