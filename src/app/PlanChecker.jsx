import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { QuitPlanService } from "../services/quitPlan.service";

const PlanChecker = () => {
  const { userInfo, token } = useAuth();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  // const location = useLocation();
  useEffect(() => {
    setChecked(false);
  }, [token, userInfo]);

  useEffect(() => {
    if (!token || !userInfo?._id || checked) {
      console.log("PlanChecker đợi token + userInfo hoặc đã checked...");
      return;
    }
    // if (!location.pathname.startsWith("/progress")) {
    //   setChecked(true);
    //   return;
    // }
    const verifyPlan = async () => {
      const storedPlanId = localStorage.getItem("currentPlanId");

      if (storedPlanId) {
        try {
          const res = await QuitPlanService.getQuitPlanDetail(storedPlanId);
          if (res?.status === "ongoing") {
            setChecked(true);
            return;
          } else {
            localStorage.removeItem("currentPlanId");
          }
        } catch {
          localStorage.removeItem("currentPlanId");
        }
      }

      try {
        const plansRes = await QuitPlanService.getUserQuitPlans(userInfo._id);
        const plans = plansRes.data;
        const activePlan = plans.find((p) => p.status === "ongoing");
        if (activePlan) {
          localStorage.setItem("currentPlanId", activePlan._id);
          window.dispatchEvent(new Event("storage"));
          navigate(`/progress/${activePlan._id}`);
        }
      } catch (err) {
        console.error("Lỗi getUserQuitPlans:", err);
      }

      setChecked(true);
    };

    verifyPlan();
  }, [token, userInfo, navigate, checked]);

  return null;
};

export default PlanChecker;
