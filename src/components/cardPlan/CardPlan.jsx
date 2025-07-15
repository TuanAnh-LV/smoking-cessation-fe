import React, { useEffect, useState } from "react";
import "./CardPlan.scss";
import { GrPlan } from "react-icons/gr";
import { QuitPlanService } from "../../services/quitPlan.service";

const CardPlan = ({ selectedStartDate, onLastStageEndDate }) => {
  const [suggestedStages, setSuggestedStages] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  useEffect(() => {
    if (!selectedStartDate) {
      setSuggestedStages([]); // reset nếu chưa chọn ngày
      return;
    }

    const formatDateDMY = (date) => {
      if (!date) return "";
      return new Date(date).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };

    QuitPlanService.getSuggestedQuitPlan()
      .then((res) => {
        const today = new Date(selectedStartDate);
        today.setHours(0, 0, 0, 0);

        const stages = res.suggested_stages || res.data?.suggested_stages || [];

        const simulatedStages = stages.map((stage, index) => {
          const start = new Date(today);
          start.setDate(start.getDate() + index * 7);
          const end = new Date(start);
          end.setDate(start.getDate() + 6);

          return {
            ...stage,
            start_date: formatDateDMY(start),
            end_date: formatDateDMY(end),
          };
        });

        setSuggestedStages(simulatedStages);

        if (simulatedStages.length > 0 && onLastStageEndDate) {
          const last = simulatedStages[simulatedStages.length - 1];
          const [dd, mm, yyyy] = last.end_date.split("/");
          const parsedEndDate = new Date(`${yyyy}-${mm}-${dd}`);
          parsedEndDate.setHours(0, 0, 0, 0);
          onLastStageEndDate(parsedEndDate);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch suggested stages", err);
      });
  }, [selectedStartDate]);

  const handlePlanSelect = (planId) => {
    setSelectedPlanId(planId);
  };

  return (
    <div className="plan-container">
      <div className="plan-title">
        <span className="calendar-icon">
          <GrPlan />
        </span>
        <h2>Suggested Plan Based on Your Smoking Data</h2>
      </div>
      <div className="plan-cards">
        <div
          className="card full-width"
          style={{ maxWidth: "1000px", width: "100%", margin: "0 auto" }}
        >
          <h3>Personalized Quit Plan</h3>
          {!selectedStartDate ? (
            <p className="text-center text-gray-500">
              Please select a start date to view your personalized plan.
            </p>
          ) : (
            <>
              <p className="time">
                Estimated duration: {suggestedStages.length * 7} days
              </p>

              <p>
                This plan is tailored to your smoking status and quitting goal.
              </p>
              <h4>Stages:</h4>
              <ul
                className="stage-row"
                style={{ justifyContent: "space-between" }}
              >
                {suggestedStages.map((stage, index) => (
                  <li className="stage-box" key={index}>
                    <div className="stage-item">
                      <div className="stage-name">
                        <strong>{stage.name}</strong>
                      </div>
                      <div className="stage-date">
                        ({stage.start_date} → {stage.end_date})
                      </div>
                      <div className="stage-description">
                        {stage.description.split("\n").map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="text-center mt-4">
                <button
                  className={`button ${
                    selectedPlanId === 99 ? "selected" : ""
                  }`}
                  onClick={() => handlePlanSelect(99)}
                >
                  Choose this plan
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardPlan;
