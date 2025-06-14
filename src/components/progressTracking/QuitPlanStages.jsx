import React, { useEffect, useState } from "react";
import { QuitStageService } from "../../services/quitState.service";
import { QuitPlanProgressService } from "../../services/quitPlanProgress.service";
import { toast } from "react-toastify";

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("vi-VN");

const QuitPlanStages = ({ planId, onProgressRecorded }) => {
  const [stages, setStages] = useState([]);
  const [inputData, setInputData] = useState({});
  const [recordedToday, setRecordedToday] = useState({});

  useEffect(() => {
    if (!planId) return;

    const fetchStagesAndCheckProgress = async () => {
      try {
        const stageRes = await QuitStageService.getAllStagesOfPlan(planId);
        const stageList = stageRes.data || [];
        setStages(stageList);

        const vnNow = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);
        const today = new Date(vnNow);
        today.setHours(0, 0, 0, 0);
        const statusMap = {};

        // Chỉ gọi API progress nếu stage đã bắt đầu
        await Promise.all(
          stageList.map(async (stage) => {
            const stageStart = new Date(stage.start_date);
            stageStart.setHours(0, 0, 0, 0);

            if (stageStart > today) {
              statusMap[stage._id] = false;
              return;
            }

            try {
              const res = await QuitPlanProgressService.getAllProgress(
                planId,
                stage._id
              );
              const found = res.data?.some((r) => {
                const date = new Date(r.date);
                date.setHours(0, 0, 0, 0);
                return date.getTime() === today.getTime();
              });
              statusMap[stage._id] = !!found;
            } catch {
              statusMap[stage._id] = false;
            }
          })
        );

        setRecordedToday(statusMap);
      } catch (err) {
        toast.error("Không thể tải giai đoạn hoặc tiến trình");
      }
    };

    fetchStagesAndCheckProgress();
  }, [planId]);

  const handleInputChange = (stageId, field, value) => {
    setInputData((prev) => ({
      ...prev,
      [stageId]: {
        ...prev[stageId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (stageId) => {
    const todayStr = new Date().toISOString();
    const { cigarette_count = 0 } = inputData[stageId] || {};

    try {
      await QuitPlanProgressService.recordProgress(planId, stageId, {
        cigarette_count: Number(cigarette_count),
        date: todayStr,
      });

      toast.success("Đã ghi nhận số điếu thuốc hôm nay!");
      setRecordedToday((prev) => ({ ...prev, [stageId]: true }));

      if (onProgressRecorded) onProgressRecorded();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Ghi tiến trình thất bại");
    }
  };

  return (
    <div>
      <h2>📋 Giai đoạn kế hoạch cai thuốc</h2>
      {stages.map((stage) => {
        const now = new Date();
        const vnNow = new Date(now.getTime() + 7 * 60 * 60 * 1000);

        const today = new Date(vnNow);
        today.setHours(0, 0, 0, 0);

        const stageStart = new Date(stage.start_date);
        const stageEnd = new Date(stage.end_date);

        const stageStartVN = new Date(
          stageStart.getTime() + 7 * 60 * 60 * 1000
        );
        const stageEndVN = new Date(stageEnd.getTime() + 7 * 60 * 60 * 1000);

        stageStartVN.setHours(0, 0, 0, 0);
        stageEndVN.setHours(0, 0, 0, 0);

        const isFutureStage = stageStartVN > today;
        const isPastStage = stageEndVN < today;
        const isCurrentStage = !isFutureStage && !isPastStage;

        const stageStatusLabel = isFutureStage
          ? "⏳ Chưa đến"
          : isPastStage
          ? "✅ Đã kết thúc"
          : "🔵 Đang diễn ra";

        const disabled = recordedToday[stage._id] || !isCurrentStage;
        const input = inputData[stage._id] || {};

        return (
          <div
            key={stage._id}
            className={`p-5 rounded-xl shadow-md mb-5 ring-1 ring-inset
              ${
                stageStatusLabel === "🔵 Đang diễn ra"
                  ? "bg-blue-50 ring-blue-200"
                  : stageStatusLabel === "✅ Đã kết thúc"
                  ? "bg-gray-100 ring-gray-300"
                  : "bg-yellow-50 ring-yellow-200"
              }`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                📌 {stage.name}
              </h3>
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  stageStatusLabel === "🔵 Đang diễn ra"
                    ? "bg-blue-100 text-blue-700"
                    : stageStatusLabel === "✅ Đã kết thúc"
                    ? "bg-gray-200 text-gray-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {stageStatusLabel}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-2 whitespace-pre-line leading-relaxed">
              {stage.description}
            </p>

            <p className="text-sm text-gray-600 mb-3">
              📅 <strong>{formatDate(stage.start_date)}</strong> →{" "}
              <strong>{formatDate(stage.end_date)}</strong>
            </p>

            {isCurrentStage && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <input
                  type="number"
                  placeholder="Số điếu thuốc hôm nay"
                  disabled={disabled}
                  value={input.cigarette_count || ""}
                  onChange={(e) =>
                    handleInputChange(
                      stage._id,
                      "cigarette_count",
                      e.target.value
                    )
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md w-40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
                />

                <button
                  onClick={() => handleSubmit(stage._id)}
                  disabled={disabled}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    disabled
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {disabled ? "Đã ghi hôm nay" : "Ghi tiến trình"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuitPlanStages;
