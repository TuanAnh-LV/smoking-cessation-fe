import React, { useState, useEffect } from "react";
import "./StatusPage.scss";
import { FaSmoking } from "react-icons/fa";
import { SmokingStatusService } from "../../services/smokingStatus.service";
import { useNavigate } from "react-router-dom";

const StatusPage = () => {
  const [cigarettesPerDay, setCigarettesPerDay] = useState("");
  const [suctionFrequency, setSuctionFrequency] = useState("");
  const [pricePerPackage, setPricePerPackage] = useState("");
  const [packsPerWeek, setPacksPerWeek] = useState("");

  const [monthlyExpenses, setMonthlyExpenses] = useState("0");
  const [annualCosts, setAnnualCosts] = useState("0");
  const [cigarettesPerYear, setCigarettesPerYear] = useState("0");

  const navigate = useNavigate();

  useEffect(() => {
    const numCigarettesPerDay = parseFloat(cigarettesPerDay) || 0;
    const numPricePerPackage = parseFloat(pricePerPackage) || 0;
    const numPacksPerWeek = parseFloat(packsPerWeek) || 0;

    const monthly = numPacksPerWeek * numPricePerPackage;
    const annual = monthly * 12;
    const yearlyCigs = numCigarettesPerDay * 365;

    setMonthlyExpenses(
      monthly.toLocaleString("vi-VN", { minimumFractionDigits: 2 })
    );
    setAnnualCosts(
      annual.toLocaleString("vi-VN", { minimumFractionDigits: 2 })
    );
    setCigarettesPerYear(
      yearlyCigs.toLocaleString("vi-VN", { maximumFractionDigits: 0 })
    );
  }, [cigarettesPerDay, pricePerPackage, packsPerWeek]);

  const isFormValid = () => {
    return (
      cigarettesPerDay && suctionFrequency && pricePerPackage && packsPerWeek
    );
  };

  const handleSubmit = async () => {
    const cigarette_count = parseInt(cigarettesPerDay);
    const money_spent =
      parseFloat(pricePerPackage) * parseFloat(packsPerWeek) || 0;

    try {
      await SmokingStatusService.recordInitialSmokingStatus({
        cigarette_count,
        money_spent,
        time_of_smoking: new Date().toISOString(),
        suction_frequency: suctionFrequency, // light | medium | heavy
        health_note: "",
      });
      navigate("/quit-plan");
    } catch (error) {
      console.error("❌ Failed to record initial smoking status:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="status-page">
      <h1 className="title">Smoking Status</h1>
      <p className="subtitle">
        Record and track smoking habits to create an effective smoking cessation
        plan
      </p>

      <div className="info-card">
        <div className="info-header">
          <span className="icon" role="img" aria-label="smoke">
            <FaSmoking />
          </span>
          <span className="info-title">Current information</span>
        </div>

        <div className="info-form">
          <div className="form-group">
            <label>Number of cigarettes/day</label>
            <input
              type="number"
              placeholder="10"
              value={cigarettesPerDay}
              onChange={(e) => setCigarettesPerDay(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Suction frequency</label>
            <select
              value={suctionFrequency}
              onChange={(e) => setSuctionFrequency(e.target.value)}
            >
              <option value="">Select Frequency</option>
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="heavy">Heavy</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price/package (VND)</label>
            <input
              type="text"
              placeholder="25.000"
              value={
                pricePerPackage === ""
                  ? ""
                  : parseFloat(pricePerPackage).toLocaleString("vi-VN")
              }
              onChange={(e) =>
                setPricePerPackage(e.target.value.replace(/\./g, ""))
              }
            />
          </div>

          <div className="form-group">
            <label>Number of packs/week</label>
            <input
              type="number"
              placeholder="3.5"
              value={packsPerWeek}
              onChange={(e) => setPacksPerWeek(e.target.value)}
            />
          </div>
        </div>

        <button
          className="plan-btn"
          disabled={!isFormValid()}
          onClick={handleSubmit}
        >
          Make a Plan
        </button>
      </div>

      <div className="summary-row">
        <div className="summary-box">
          <div>Monthly expenses</div>
          <div className="summary-value">{monthlyExpenses} VNĐ</div>
        </div>
        <div className="summary-box">
          <div>Annual costs</div>
          <div className="summary-value">{annualCosts} VNĐ</div>
        </div>
        <div className="summary-box">
          <div>Cigarettes/year</div>
          <div className="summary-value">{cigarettesPerYear}</div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
