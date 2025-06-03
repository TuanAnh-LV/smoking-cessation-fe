import React from 'react'
import './ImplementationTime.scss'
import { MdDateRange } from "react-icons/md";

const ImplementationTime = () => {
  return (
    <div className="implementation-time-container">
      <h2>Thời gian thực hiện</h2>
      <div className="date-inputs-container">
        <div className="date-input-group">
          <label htmlFor="startDate">Ngày bắt đầu</label>
          <div className="input-icon-container">
            <input type="text" id="startDate" placeholder="dd/mm/yyyy" />
            <MdDateRange className="calendar-icon-2" />
          </div>
        </div>
        <div className="date-input-group">
          <label htmlFor="endDate">Ngày dự kiến hoàn thành</label>
          <div className="input-icon-container">
            <input type="text" id="endDate" placeholder="dd/mm/yyyy" />
            <MdDateRange className="calendar-icon-2" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImplementationTime