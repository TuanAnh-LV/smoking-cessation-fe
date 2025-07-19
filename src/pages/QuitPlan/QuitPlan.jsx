import React, { useEffect, useState } from "react";
import "./QuitPlan.scss";
import { FaHeart } from "react-icons/fa";
import CardPlan from "../../components/cardPlan/CardPlan";
import ImplementationTime from "../../components/ImplementationTime/ImplementationTime";
import Coach from "../../components/coach/coach";
import NotificationSettings from "../../components/NotificationSettings/NotificationSettings";
import { SmokingStatusService } from "../../services/smokingStatus.service";
import { QuitPlanService } from "../../services/quitPlan.service";
import { UserService } from "../../services/user.service";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const QuitPlan = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [latestStatus, setLatestStatus] = useState(null);
  const [stageSuggestion, setStageSuggestion] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { userInfo } = useAuth();
  const [membershipPackageCode, setMembershipPackageCode] = useState(null);
  const [goal, setGoal] = useState("");
  const [note, setNote] = useState("");
  const [reasons, setReasons] = useState([]);
  const [reasonsDetail, setReasonsDetail] = useState("");
  const [selectedCoachId, setSelectedCoachId] = useState(null);
  const navigate = useNavigate();
  const reasonOptions = [
    "Health for yourself and your family",
    "Save costs",
    "Improve appearance",
    "Set an example for your children",
    "Increase confidence",
    "Improves mouth and teeth odor",
    "Long-lasting stress relief",
    "Other",
  ];

  const handleReasonChange = (e) => {
    const { value, checked } = e.target;
    setReasons((prev) =>
      checked ? [...prev, value] : prev.filter((r) => r !== value)
    );
  };

  useEffect(() => {
    SmokingStatusService.getLatestPrePlanStatus()
      .then((res) => {
        setLatestStatus(res);
        const { cigarette_count, suction_frequency } = res;

        if (cigarette_count <= 5 && suction_frequency === "light") {
          setStageSuggestion(
            "\ud83d\udca1 Suggested: 2 stages (Reduce → Quit)"
          );
        } else if (cigarette_count <= 15 || suction_frequency === "medium") {
          setStageSuggestion(
            "\ud83d\udca1 Suggested: 3 stages (Cut down → Quit → Maintain)"
          );
        } else {
          setStageSuggestion(
            "\ud83d\udca1 Suggested: 4 stages (Reduce gradually → Quit → Sustain)"
          );
        }
      })
      .catch(() => {
        setStageSuggestion(
          "\u2139\ufe0f No smoking status found. A default 3-stage plan will be used."
        );
      });
  }, []);

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        if (!userInfo?._id) return;
        const res = await UserService.getUserMembership(userInfo._id);
        const code = res?.data?.package_id?.name;
        setMembershipPackageCode(code);
      } catch (err) {
        console.error("Failed to fetch membership", err);
      }
    };

    fetchMembership();
  }, [userInfo]);

  const handleSavePlan = async () => {
    if (!startDate || isNaN(startDate.getTime())) {
      toast.error("Please select a valid start date");
      return;
    }

    try {
      setIsSaving(true);

      const startDateISO = startDate.toISOString();

      const res = await QuitPlanService.createQuitPlan({
        goal,
        start_date: startDateISO,
        note,
        coach_user_id: selectedCoachId || null,
        reasons,
        reasons_detail: reasonsDetail,
      });

      localStorage.setItem("currentPlanId", res.data.plan._id);
      navigate(`/progress/${res.data.plan._id}`);
      toast.success("Quit plan created successfully!");
    } catch (err) {
      console.error("Failed to create quit plan", err);
      toast.error("Failed to create quit plan.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="quit-plan-page">
      <h1 className="title">Make a plan to quit smoking</h1>
      <p className="subtitle">
        Create a smoking cessation plan that fits your situation and goals
      </p>

      {stageSuggestion && (
        <div className="suggestion-box">{stageSuggestion}</div>
      )}

      <div className="form-grid">
        <div className="reasons-card">
          <div className="reasons-header">
            <span className="icon">
              <FaHeart />
            </span>
            <span className="reasons-title">Reasons for quitting smoking</span>
          </div>
          <div className="reasons-list">
            {reasonOptions.map((reason, idx) => (
              <label className="reason-item" key={idx}>
                <input
                  type="checkbox"
                  value={reason}
                  checked={reasons.includes(reason)}
                  onChange={handleReasonChange}
                />
                <span>{reason}</span>
              </label>
            ))}
          </div>
          <textarea
            className="reasons-textarea"
            placeholder="Describe in detail your reasons..."
            value={reasonsDetail}
            onChange={(e) => setReasonsDetail(e.target.value)}
          />
        </div>

        <div className="goal-card">
          <h3>Your goal</h3>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="goal-select"
          >
            <option value="">-- Select your quit goal --</option>
            <option value="quit_completely">Quit smoking completely</option>
            <option value="reduce_gradually">Reduce gradually then quit</option>
            <option value="just_cut_down">Just want to cut down</option>
          </select>

          <h4 style={{ marginTop: "1rem" }}>Other notes (optional)</h4>
          <textarea
            className="note-textarea"
            placeholder="Anything else you'd like to share..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>

      <ImplementationTime
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
      />

      <CardPlan selectedStartDate={startDate} onLastStageEndDate={setEndDate} />

      {membershipPackageCode === "pro" && (
        <>
          <Coach setSelectedCoachId={setSelectedCoachId} />
          <NotificationSettings />
        </>
      )}

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          className="save-button"
          onClick={handleSavePlan}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save plan"}
        </button>
      </div>
    </div>
  );
};

export default QuitPlan;
