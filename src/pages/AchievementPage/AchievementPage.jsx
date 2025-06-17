import React, { useEffect, useState } from "react";
import { BadgeService } from "../../services/badge.service";
import StatCards from "../../components/StartCards/StatCards";
import "../AchievementPage/AchievementPage.scss";

import { IoLogoNoSmoking, IoMedalOutline, IoStar } from "react-icons/io5";
import { FaRegCalendarAlt, FaCrown } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";

import { RiBookmarkLine } from "react-icons/ri";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import BadgeCard from "../../components/BadgeCard/BadgeCard";
import UpcomingBade from "../../components/UpcomingBadge/UpcomingBade";

const AchievementPage = () => {
  const [achievedBadges, setAchievedBadges] = useState([]);
  const [upcomingBadges, setUpcomingBadges] = useState([]);
  const [statData, setStatData] = useState({
    noSmokingData: {
      value: "0",
      label: "Badge achieved",
      icon: IoMedalOutline,
    },
    savingsData: {
      value: "0",
      label: "Upcoming badge",
      icon: RiBookmarkLine,
    },
    healthData: {
      value: "0%",
      label: "Complete",
      icon: IoCheckmarkCircleOutline,
    },
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await BadgeService.getBadgeSummary();
        const summary = res.data;

        setStatData({
          noSmokingData: {
            value: `${summary.badge_achieved_count}`,
            label: "Badge achieved",
            icon: IoMedalOutline,
          },
          savingsData: {
            value: `${summary.badge_upcoming_count}`,
            label: "Upcoming badge",
            icon: RiBookmarkLine,
          },
          healthData: {
            value: `${summary.completion_rate}%`,
            label: "Complete",
            icon: IoCheckmarkCircleOutline,
          },
        });
      } catch (err) {
        console.error("Failed to load badge summary", err);
      }
    };

    fetchSummary();
  }, []);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const achievedRes = await BadgeService.getUserBadges();
        setAchievedBadges(achievedRes.data.badges || []);

        const upcomingRes = await BadgeService.getUpcomingBadges();
        setUpcomingBadges(upcomingRes.data.badges || []);
      } catch (err) {
        console.error("Failed to load badges", err);
      }
    };

    fetchBadges();
  }, []);

  return (
    <div className="achievement-section">
      <h1>Achievement badge</h1>
      <p>Celebrate important milestones in your smoking cessation journey</p>
      <StatCards
        noSmokingData={statData.noSmokingData}
        savingsData={statData.savingsData}
        healthData={statData.healthData}
      />

      <div className="full-badge">
        <h3>Badge achieved</h3>
        <div className="badge-list">
          {achievedBadges.map((badge) => (
            <BadgeCard
              key={badge._id}
              icon={<IoMedalOutline />}
              title={badge.name}
              description={badge.description}
              rarity={badge.type}
              achievedDate={
                badge.granted_date
                  ? new Date(badge.granted_date).toLocaleDateString("en-US", {
                      timeZone: "UTC",
                    })
                  : ""
              }
            />
          ))}
        </div>
      </div>
      <div className="upcoming-badge-section">
        <h3>Upcoming badge</h3>
        <div className="upcoming-badge-list">
          {upcomingBadges.map((badge) => (
            <UpcomingBade
              key={badge._id}
              icon={<IoStar />} // hoặc tùy logic
              title={badge.name}
              description={badge.description}
              rarity={badge.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementPage;
