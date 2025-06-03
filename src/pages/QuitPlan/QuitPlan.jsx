import React from "react";
import "./QuitPlan.scss";
import { FaHeart } from "react-icons/fa";
import CardPlan from "../../components/cardPlan/CardPlan";
import ImplementationTime from "../../components/ImplementationTime/ImplementationTime";
import Coach from "../../components/coach/coach";
import NotificationSettings from "../../components/NotificationSettings/NotificationSettings";

const reasons = [
  "Health for yourself and your family",
  "Save costs",
  "Improve appearance",
  "Set an example for your children",
  "Increase confidence",
  "Improves mouth and teeth odor",
  "Long-lasting stress relief",
  "Other",
];

const QuitPlan = () => {
  return (
    <div className="quit-plan-page">
      <h1 className="title">Make a plan to quit smoking</h1>
      <p className="subtitle">
        Create a smoking cessation plan that fits your situation and goals
      </p>
      <div className="reasons-card">
        <div className="reasons-header">
          <span className="icon">
            <FaHeart />
          </span>
          <span className="reasons-title">Reasons for quitting smoking</span>
        </div>
        <div className="reasons-list">
          {reasons.map((reason, idx) => (
            <label className="reason-item" key={idx}>
              <input type="checkbox" />
              <span>{reason}</span>
            </label>
          ))}
        </div>
        <textarea
          className="reasons-textarea"
          placeholder="Describe in detail your reasons..."
        />
      </div>
      <CardPlan />
      <ImplementationTime />
      <Coach />
      {/* set up notifications */}
      <NotificationSettings/>
    </div>
  );
};

export default QuitPlan;
