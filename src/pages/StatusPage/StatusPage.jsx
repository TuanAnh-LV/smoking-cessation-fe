import React, { useState, useEffect } from "react";
import "./StatusPage.scss";
import { FaSmoking } from "react-icons/fa";
import { Link } from "react-router-dom";

const StatusPage = () => {
  // State variables for input fields
  const [cigarettesPerDay, setCigarettesPerDay] = useState("");
  const [suctionFrequency, setSuctionFrequency] = useState(""); // Assuming this might be a number input later or has numerical value
  const [pricePerPackage, setPricePerPackage] = useState("");
  const [packsPerWeek, setPacksPerWeek] = useState("");

  // State variables for calculated outputs
  const [monthlyExpenses, setMonthlyExpenses] = useState("0");
  const [annualCosts, setAnnualCosts] = useState("0");
  const [cigarettesPerYear, setCigarettesPerYear] = useState("0");

  // Recalculate outputs whenever inputs change
  useEffect(() => {
    const numCigarettesPerDay = parseFloat(cigarettesPerDay) || 0;
    const numPricePerPackage = parseFloat(pricePerPackage) || 0;
    const numPacksPerWeek = parseFloat(packsPerWeek) || 0;

    // Assuming 20 cigarettes per package for calculation

    // Calculations
    const calculatedMonthlyExpenses = numPacksPerWeek * numPricePerPackage;
    const calculatedAnnualCosts = numPacksPerWeek * numPricePerPackage * 52;
    const calculatedCigarettesPerYear = numCigarettesPerDay * 365;

    // Format outputs
    const formattedMonthlyExpenses = calculatedMonthlyExpenses.toLocaleString(
      "vi-VN",
      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    );
    const formattedAnnualCosts = calculatedAnnualCosts.toLocaleString("vi-VN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const formattedCigarettesPerYear =
      calculatedCigarettesPerYear.toLocaleString("vi-VN", {
        maximumFractionDigits: 0,
      });

    setMonthlyExpenses(formattedMonthlyExpenses);
    setAnnualCosts(formattedAnnualCosts);
    setCigarettesPerYear(formattedCigarettesPerYear);
  }, [cigarettesPerDay, pricePerPackage, packsPerWeek]); // Dependencies array

  // Check if all required fields are filled
  const isFormValid = () => {
    // Check if the state variables for required inputs have values
    // Assuming cigarettesPerDay, suctionFrequency, pricePerPackage, and packsPerWeek are required
    return (
      cigarettesPerDay !== "" &&
      suctionFrequency !== "" &&
      pricePerPackage !== "" &&
      packsPerWeek !== ""
    );
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
          <span role="img" aria-label="smoke" className="icon">
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
            {/* Assuming this select will eventually map to a numerical value for calculations */}
            <select
              value={suctionFrequency}
              onChange={(e) => setSuctionFrequency(e.target.value)}
            >
              {/* Replace these example options with your actual frequency categories and numerical values */}
              <option value="">Select Frequency</option>
              <option value="1">Light</option>
              <option value="2">Medium</option>
              <option value="3">Heavy</option>
            </select>
          </div>
          <div className="form-group">
            <label>Price/package(VND)</label>
            <input
              type="text"
              placeholder="25.000"
              value={
                pricePerPackage === ""
                  ? ""
                  : parseFloat(pricePerPackage).toLocaleString("vi-VN", {
                      maximumFractionDigits: 0,
                    })
              }
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\./g, "");
                setPricePerPackage(rawValue);
              }}
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
        <Link to="/quit-plan">
          <button className="plan-btn" disabled={!isFormValid()}>
            Make a Plan
          </button>
        </Link>
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
