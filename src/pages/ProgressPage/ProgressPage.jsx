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
      console.error("Lỗi khi tải dữ liệu tóm tắt", err);
    }
  };

  useEffect(() => {
    if (planId) fetchSummary();
  }, [planId]);

  const statData = summary
    ? {
        noSmokingData: {
          value: `${summary.progress_days || 0} ngày`,
          icon: IoCheckmarkCircleOutline,
          label: "Số ngày ghi nhận",
        },
        savingsData: {
          value: `${
            summary.total_money_spent?.toLocaleString("vi-VN") || 0
          } VNĐ`,
          icon: IoCheckmarkCircleOutline,
          label: "Tiền đã tiết kiệm",
        },
        healthData: {
          value: `${summary.completion_rate || 0}%`,
          icon: IoCheckmarkCircleOutline,
          label: "Mức hoàn thành",
        },
      }
    : {};

  return (
    <div className={styles["progress-page-container"]}>
      <header>
        <h1>📈 Theo dõi tiến trình cai thuốc</h1>
        <p>Cập nhật hàng ngày và theo dõi sự tiến bộ</p>
      </header>

      {summary && (
        <StatCards
          noSmokingData={statData.noSmokingData}
          savingsData={statData.savingsData}
          healthData={statData.healthData}
        />
      )}

      <section className={styles["progress-section"]}>
        <h2>🗓️ Giai đoạn và ghi nhận hàng ngày</h2>
        <QuitPlanStages planId={planId} onProgressRecorded={fetchSummary} />
      </section>
    </div>
  );
};

export default ProgressPage;
