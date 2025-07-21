import React, { useEffect, useState } from "react";
import { QuitStageService } from "../../services/quitState.service";
import { QuitPlanProgressService } from "../../services/quitPlanProgress.service";
import { toast } from "react-toastify";

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-GB");

const QuitPlanStages = ({ planId, onProgressRecorded }) => {
  const [stages, setStages] = useState([]);
  const [inputData, setInputData] = useState({});

  const fetchStages = async () => {
    try {
      const stageRes = await QuitStageService.getAllStagesOfPlan(planId); // ⬅️ API mới đã có `status` + `recordedToday`
      setStages(stageRes.data || []);
    } catch (err) {
      console.error("[fetchStages]", err);
      toast.error("Failed to load stages");
    }
  };

  useEffect(() => {
    if (!planId) return;
    fetchStages();
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
    const { cigarette_count = 0 } = inputData[stageId] || {};

    try {
      await QuitPlanProgressService.recordProgress(planId, stageId, {
        cigarette_count: Number(cigarette_count),
      });

      toast.success("Today's cigarette count recorded successfully!");
      fetchStages();
      if (onProgressRecorded) onProgressRecorded();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to record progress");
    }
  };

  return (
    <div>
      {stages.map((stage) => {
        const {
          _id,
          name,
          description,
          start_date,
          end_date,
          status,
          recordedToday,
        } = stage;

        const disabled = recordedToday || status !== "in_progress";
        const input = inputData[_id] || {};

        const statusLabelMap = {
          in_progress: "Ongoing",
          completed: "Completed",
          not_started: "Upcoming",
        };

        const colorClass = {
          in_progress: "bg-blue-50 ring-blue-200",
          completed: "bg-gray-100 ring-gray-300",
          not_started: "bg-yellow-50 ring-yellow-200",
        };

        const badgeClass = {
          in_progress: "bg-blue-100 text-blue-700",
          completed: "bg-gray-200 text-gray-700",
          not_started: "bg-yellow-100 text-yellow-700",
        };

        return (
          <div
            key={_id}
            className={`p-5 rounded-xl shadow-md mb-5 ring-1 ring-inset ${colorClass[status]}`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${badgeClass[status]}`}
              >
                {statusLabelMap[status]}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-2 whitespace-pre-line leading-relaxed">
              {description}
            </p>

            <p className="text-sm text-gray-600 mb-3">
              <strong>{formatDate(start_date)}</strong> →{" "}
              <strong>{formatDate(end_date)}</strong>
            </p>
            <p className="text-sm text-gray-600 mb-3 font-medium">
              Progress: {stage.progressDays} / {stage.totalDays} days
            </p>
            {status === "in_progress" && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <input
                  type="number"
                  placeholder="Today's cigarette count"
                  disabled={disabled}
                  value={input.cigarette_count || ""}
                  onChange={(e) =>
                    handleInputChange(_id, "cigarette_count", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md w-40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
                />
                <button
                  onClick={() => handleSubmit(_id)}
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
