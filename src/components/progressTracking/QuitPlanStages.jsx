import React, { useEffect, useState, useRef } from "react";
import { QuitStageService } from "../../services/quitState.service";
import { QuitPlanProgressService } from "../../services/quitPlanProgress.service";
import { toast } from "react-toastify";

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-GB");

const getTodayVN = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const vn = new Date(utc + 7 * 60 * 60 * 1000);
  vn.setHours(0, 0, 0, 0);
  return vn;
};

const useDayChange = (callback, lastCheckedDateRef, onDayChanged) => {
  useEffect(() => {
    const scheduleNextCheck = () => {
      const now = new Date();
      const nextDay = new Date(now);
      nextDay.setDate(now.getDate() + 1);
      nextDay.setHours(0, 0, 0, 0);
      const delay = nextDay.getTime() - now.getTime();
      return setTimeout(() => {
        callback();
        if (onDayChanged) onDayChanged();
        lastCheckedDateRef.current = getTodayVN();
        scheduleNextCheck();
      }, delay);
    };

    const timer = scheduleNextCheck();

    return () => clearTimeout(timer);
  }, [callback, lastCheckedDateRef, onDayChanged]);
};

const QuitPlanStages = ({ planId, onProgressRecorded }) => {
  const [stages, setStages] = useState([]);
  const [inputData, setInputData] = useState({});
  const [recordedToday, setRecordedToday] = useState({});
  const lastCheckedDateRef = useRef(null);

  const fetchStagesAndCheckProgress = async () => {
    try {
      const stageRes = await QuitStageService.getAllStagesOfPlan(planId);
      const stageList = stageRes.data || [];
      setStages(stageList);

      const today = getTodayVN();
      lastCheckedDateRef.current = today;

      const statusMap = {};

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
              const recordDateUTC = new Date(r.date);
              const vnDate = new Date(
                recordDateUTC.getTime() + 7 * 60 * 60 * 1000
              );
              vnDate.setHours(0, 0, 0, 0);
              return vnDate.getTime() === today.getTime();
            });

            statusMap[stage._id] = !!found;
          } catch {
            statusMap[stage._id] = false;
          }
        })
      );

      setRecordedToday(statusMap);
    } catch (err) {
      console.error("[fetchStagesAndCheckProgress]", err);
      toast.error("Failed to load stages or progress data");
    }
  };

  useEffect(() => {
    if (!planId) return;
    fetchStagesAndCheckProgress();
  }, [planId]);

  // Gọi custom hook để auto detect ngày mới
  useDayChange(fetchStagesAndCheckProgress, lastCheckedDateRef);

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

      toast.success("Today's cigarette count recorded successfully!");
      setRecordedToday((prev) => ({ ...prev, [stageId]: true }));

      if (onProgressRecorded) onProgressRecorded();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to record progress");
    }
  };

  return (
    <div>
      <h2>📋 Quit Plan Stages</h2>
      {stages.map((stage) => {
        const today = getTodayVN();

        const stageStart = new Date(stage.start_date);
        const stageEnd = new Date(stage.end_date);
        stageStart.setHours(0, 0, 0, 0);
        stageEnd.setHours(0, 0, 0, 0);

        const isFutureStage = stageStart > today;
        const isPastStage = stageEnd < today;
        const isCurrentStage = !isFutureStage && !isPastStage;

        const stageStatusLabel = isFutureStage
          ? " Upcoming"
          : isPastStage
          ? " Completed"
          : " Ongoing";

        const disabled = recordedToday[stage._id] || !isCurrentStage;
        const input = inputData[stage._id] || {};

        return (
          <div
            key={stage._id}
            className={`p-5 rounded-xl shadow-md mb-5 ring-1 ring-inset
              ${
                stageStatusLabel === " Ongoing"
                  ? "bg-blue-50 ring-blue-200"
                  : stageStatusLabel === " Completed"
                  ? "bg-gray-100 ring-gray-300"
                  : "bg-yellow-50 ring-yellow-200"
              }`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                {stage.name}
              </h3>
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  stageStatusLabel === " Ongoing"
                    ? "bg-blue-100 text-blue-700"
                    : stageStatusLabel === " Completed"
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
              <strong>{formatDate(stage.start_date)}</strong> →{" "}
              <strong>{formatDate(stage.end_date)}</strong>
            </p>

            {isCurrentStage && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <input
                  type="number"
                  placeholder="Today's cigarette count"
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
                  {disabled ? "Recorded today" : "Record progress"}
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
