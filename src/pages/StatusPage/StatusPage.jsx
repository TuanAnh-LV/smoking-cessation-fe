import React from "react";
import "./StatusPage.scss";
import { FaSmoking } from "react-icons/fa";

const StatusPage = () => {
  return (
    <div className="status-page">
      <h1 className="title">Smoking Status</h1>
      <p className="subtitle">
        Record and track smoking habits to create an effective smoking cessation
        plan
      </p>
      <div className="info-card">
        <div className="info-header">
          <span role="img" aria-label="smoke" className="icon">
            <FaSmoking />
          </span>
          <span className="info-title">Current information</span>
        </div>
        <div className="info-form">
          <div className="form-group">
            <label>Number of cigarettes/day</label>
            <input type="number" placeholder="10" />
          </div>
          <div className="form-group">
            <label>Suction frequency</label>
            <select>
              <option>Value</option>
            </select>
          </div>
          <div className="form-group">
            <label>Price/package(VND)</label>
            <input type="number" placeholder="25.000" />
          </div>
          <div className="form-group">
            <label>Number of packs/week</label>
            <input type="number" placeholder="3.5" />
          </div>
        </div>
        <button className="plan-btn">Make a Plan</button>
      </div>
      <div className="summary-row">
        <div className="summary-box">
          <div>Monthly expenses</div>
          <div className="summary-value">378.875 VNĐ</div>
        </div>
        <div className="summary-box">
          <div>Annual costs</div>
          <div className="summary-value">378.875 VNĐ</div>
        </div>
        <div className="summary-box">
          <div>Điếu thuốc /năm</div>
          <div className="summary-value">378.875 VNĐ</div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
