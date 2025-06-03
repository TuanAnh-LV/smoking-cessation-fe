import React, { useEffect, useState } from "react";
import "./BadgeCard.scss";

const BadgeCard = ({ icon, title, description, rarity, achievedDate }) => {
  return (
    <div className="badge-card">
      <div className="badge-icon">{icon}</div>
      <h4 className="badge-title">{title}</h4>
      <p className="badge-description">{description}</p>
      <div className={`badge-rarity rarity-${rarity.toLowerCase()}`}>
        {rarity}
      </div>
      <p className="badge-achieved-date">Achieved: {achievedDate}</p>
      <button className="share-button">Share</button>
    </div>
  );
};

export default BadgeCard;
