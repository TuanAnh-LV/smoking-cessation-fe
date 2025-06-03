import React from "react";
import "./coach.scss"; // We will create this file next

const Coach = () => {
  // Placeholder data for three coaches
  const coaches = [
    {
      id: 1,
      image:
        "https://media.istockphoto.com/id/610041376/vi/anh/b%C3%ACnh-minh-tuy%E1%BB%87t-%C4%91%E1%BA%B9p-tr%C3%AAn-bi%E1%BB%83n.jpg?s=612x612&w=0&k=20&c=Z7X7dpshWmCJx903eNpSjczaWwniiwh92r2yYahdqZY=", // Replace with actual image paths
      name: "TS. Nguyễn Danh Nam",
      title: "Master's in Tobacco Research and Tobacco Behavior....",
      rating: 1,
    },
    {
      id: 2,
      image:
        "https://media.istockphoto.com/id/610041376/vi/anh/b%C3%ACnh-minh-tuy%E1%BB%87t-%C4%91%E1%BA%B9p-tr%C3%AAn-bi%E1%BB%83n.jpg?s=612x612&w=0&k=20&c=Z7X7dpshWmCJx903eNpSjczaWwniiwh92r2yYahdqZY=", // Replace with actual image paths
      name: "TS. Nguyễn Danh Nam",
      title: "Master's in Tobacco Research and Tobacco Behavior....",
      rating: 1,
    },
    {
      id: 3,
      image:
        "https://media.istockphoto.com/id/610041376/vi/anh/b%C3%ACnh-minh-tuy%E1%BB%87t-%C4%91%E1%BA%B9p-tr%C3%AAn-bi%E1%BB%83n.jpg?s=612x612&w=0&k=20&c=Z7X7dpshWmCJx903eNpSjczaWwniiwh92r2yYahdqZY=", // Replace with actual image paths
      name: "TS. Nguyễn Danh Nam",
      title: "Master's in Tobacco Research and Tobacco Behavior....",
      rating: 1,
    },
  ];

  return (
    <div className="coach-section-container">
      <h2>Coach</h2>
      <div className="coach-cards-container">
        {coaches.map((coach) => (
          <div key={coach.id} className="coach-card">
            <img src={coach.image} alt={coach.name} />
            <div className="coach-info">
              <h3>{coach.name}</h3>
              <p>{coach.title}</p>
              <div className="coach-rating">
                {/* Simple star representation - replace with icons later */}
                {"★".repeat(coach.rating)}
                {"☆".repeat(5 - coach.rating)} {coach.rating}/5
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="more-button">More</button>
    </div>
  );
};

export default Coach;
