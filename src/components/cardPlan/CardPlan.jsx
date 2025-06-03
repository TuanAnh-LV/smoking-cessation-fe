import React from "react";
import "./CardPlan.scss";
import { GrPlan } from "react-icons/gr";

const CardPlan = () => {
  const [selectedPlanId, setSelectedPlanId] = React.useState(null);

  const handlePlanSelect = (planId) => {
    setSelectedPlanId(planId);
    console.log("Plan selected with ID:", planId);
  };

  const plansData = [
    {
      id: 1,
      title: "Tapering plan",
      time: "4 weeks",
      description: "25% reduction in medication quantity per week",
      stages: [
        "Week 1: 25% reduction (7-8 cigarettes/day)",
        "Week 2: 50% off (5 cigarettes/day)",
        "Week 3: Reduce 75% (2-3 cigarettes/day)",
        "Week 4: Completely quit",
      ],
    },
    {
      id: 2,
      title: "Sudden withdrawal plan",
      time: "1 day",
      description: "Stop smoking completely from day one",
      stages: [
        "Chuẩn bị tinh thần",
        "Loại bỏ tất cả thuốc lá",
        "Bắt đầu kế hoạch hỗ trợ",
        "Theo dõi và kiên trì",
      ],
    },
    {
      id: 3,
      title: "Step by step plan",
      time: "8 weeks",
      description: "Reduce slowly with specific goals",
      stages: [
        "Week 1-2: Reduce smoking time",
        "Week 3-4: Reduce quantity",
        "Week 5-6: Only smoke at certain times",
        "Week 7-8: Completely quit",
      ],
    },
  ];

  return (
    <div className="plan-container">
      <div className="plan-title">
        <span className="calendar-icon">
          <GrPlan />
        </span>
        <h2>Choose a plan</h2>
      </div>
      <div className="plan-cards row">
        {plansData.map((plan) => (
          <div className="card col-lg-4 col-md-6 col-sm-12" key={plan.id}>
            <h3>{plan.title}</h3>
            <div className="content-card">
              <p className="time">Time: {plan.time}</p>
              <p>{plan.description}</p>
              <h4>Stages:</h4>
              <ul>
                {plan.stages.map((stage, index) => (
                  <li key={index}>{stage}</li>
                ))}
              </ul>
            </div>
            <button
              className={`button ${
                selectedPlanId === plan.id ? "selected" : ""
              }`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              Choose this plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPlan;
