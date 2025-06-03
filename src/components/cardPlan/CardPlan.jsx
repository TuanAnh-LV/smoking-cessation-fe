import React from 'react';
import './CardPlan.scss';
import { GrPlan } from "react-icons/gr";


const CardPlan = () => {
  return (
    <div className="plan-container">
      <div className="plan-title">
        <span className="calendar-icon"><GrPlan />
        </span>
        <h2>Choose a plan</h2>
      </div>
      <div className="plan-cards row">
        <div className="card col-lg-4 col-md-6 col-sm-12">
          <h3>Tapering plan</h3>
          <div className='content-card'>
          <p className="time">Time: 4 weeks</p>
          <p>25% reduction in medication quantity per week</p>
          <h4>Stages:</h4>
          <ul>
            <li>Week 1: 25% reduction (7-8 cigarettes/day)</li>
            <li>Week 2: 50% off (5 cigarettes/day)</li>
            <li>Week 3: Reduce 75% (2-3 cigarettes/day)</li>
            <li>Week 4: Completely quit</li>
          </ul>
          </div>
          <button className="button">Choose this plan</button>
        </div>
        <div className="card col-lg-4 col-md-6 col-sm-12">
          <h3>Sudden withdrawal plan</h3>
          <div className='content-card'>
          <p className="time">Time: 1 day</p>
          <p>Stop smoking completely from day one</p>
          <h4>Stages:</h4>
          <ul>
            <li>Chuẩn bị tinh thần</li>
            <li>Loại bỏ tất cả thuốc lá</li>
            <li>Bắt đầu kế hoạch hỗ trợ</li>
            <li>Theo dõi và kiên trì</li>
          </ul>
          </div>
          <button className="button">Choose this plan</button>
        </div>
        <div className="card col-lg-4 col-md-6 col-sm-12">
          <h3>Step by step plan</h3>
          <div className='content-card'>
          <p className="time">Time: 8 weeks</p>
          <p>Reduce slowly with specific goals</p>
          <h4>Stages:</h4>
          <ul>
            <li>Week 1-2: Reduce smoking time</li>
            <li>Week 3-4: Reduce quantity</li>
            <li>Week 5-6: Only smoke at certain times</li>
            <li>Week 7-8: Completely quit</li>
          </ul>
          </div>
          <button className="button">Choose this plan</button>
        </div>
      </div>
    </div>
  );
};

export default CardPlan;