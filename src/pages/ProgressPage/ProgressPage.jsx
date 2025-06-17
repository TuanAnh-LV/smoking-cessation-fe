// ProgressPage.jsx
import React, { useEffect, useState } from "react";
import StatCards from "../../components/StartCards/StatCards";
import QuitPlanStages from "../../components/progressTracking/QuitPlanStages";
import { QuitPlanService } from "../../services/quitPlan.service";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import styles from "./ProgressPage.module.css";

const ProgressPage = () => {
  const [summary, setSummary] = useState(null);
  const planId = localStorage.getItem("currentPlanId");

  const fetchSummary = async () => {
    try {
      const res = await QuitPlanService.getPlanSummary(planId);
      setSummary(res.data);
    } catch (err) {
      console.error("Error loading summary data", err);
    }
  };

  useEffect(() => {
    if (planId) fetchSummary();
  }, [planId]);

  const statData = summary
    ? {
        noSmokingData: {
          value: `${summary.progress_days || 0} days`,
          icon: IoCheckmarkCircleOutline,
          label: "Recorded days",
        },
        savingsData: {
          value: `${
            summary.total_money_spent?.toLocaleString("vi-VN") || 0
          } VND`,
          icon: IoCheckmarkCircleOutline,
          label: "Money saved",
        },
        healthData: {
          value: `${summary.completion_rate || 0}%`,
          icon: IoCheckmarkCircleOutline,
          label: "Completion rate",
        },
      }
    : {};

  return (
    <div className={styles["progress-page-container"]}>
      <header>
        <h1>Quit Smoking Progress Tracking</h1>
        <p>Update daily and monitor your improvement</p>
      </header>

      {summary && (
        <StatCards
          noSmokingData={statData.noSmokingData}
          savingsData={statData.savingsData}
          healthData={statData.healthData}
        />
      )}

      <section className={styles["progress-section"]}>
        <h2> Stages and Daily Records</h2>
        <QuitPlanStages planId={planId} onProgressRecorded={fetchSummary} />
      </section>
    </div>
  );
};

export default ProgressPage;
