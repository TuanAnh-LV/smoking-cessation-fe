import React from 'react'
import StatCards from '../../components/StatCards'
import '../AchievementPage/AchievementPage.scss'
// Import icons based on the image
import { IoMedalOutline, IoStar } from "react-icons/io5"; // Trophy icon
import { FaRegCalendarAlt, FaCrown } from "react-icons/fa"; // Calendar icon
import { FaDollarSign } from "react-icons/fa"; // Dollar sign icon

import { RiBookmarkLine } from "react-icons/ri";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import BadgeCard from '../../components/BadgeCard/BadgeCard';
import UpcomingBade from '../../components/UpcomingBadge/UpcomingBade';

const AchievementPage = () => {
    // Placeholder data - Replace with actual data fetching logic
    const noSmokingData = {
        value: '8',
        label: 'Badge achieved',
        icon: IoMedalOutline, // Add icon component
       
    };

    const savingsData = {
        value: '3',
        label: 'Upcoming badge',
        icon: RiBookmarkLine, // Add icon component
        
    };

    const healthData = {
        value: '63%',
        label: 'Complete',
        icon: IoCheckmarkCircleOutline, // Add icon component
       
    };

    const badgesData = [
        {
            icon: <IoMedalOutline />, // Using the trophy icon for the first badge
            title: '1 Day smoking day',
            description: 'Complete your first day without smoking',
            rarity: 'Universal',
            achievedDate: '20-5-2025'
        },
        {
            icon: <FaRegCalendarAlt />, // Using a calendar icon
            title: 'Week Warrior',
            description: 'Complete your first day without smoking',
            rarity: 'Rare',
            achievedDate: '27-5-2025'
        },
        {
            icon: <FaDollarSign />, // Using a dollar sign icon
            title: '1 million Saver',
            description: 'Saved 1 million VNĐ',
            rarity: 'Epic',
            achievedDate: '27-5-2025' // No date specified in image for this one
        }
    ];

    const upcomingBadgesData = [
      {
        icon: <IoStar />,
        title: 'Monthly Master',
        description: 'Complete 1 month without smoking',
        rarity: 'Epic'
      },
      {
        icon: <FaCrown />,
        title: 'Yearly Champion',
        description: 'Complete your first day without smoking',
        rarity: 'Legend'
      }
    ];

    
    return (
        <div className="achievement-section">
            <h2>Achievement badge</h2>
            <p>Celebrate important milestones in your smoking cessation journey</p>
            <StatCards
                noSmokingData={noSmokingData}
                savingsData={savingsData}
                healthData={healthData}
            />
            <div className='full-badge'>
                <h3>Badge achieved</h3>
                <div className="badge-list">
                    {badgesData.map((badge, index) => (
                        <BadgeCard key={index} {...badge} />
                    ))}
                </div>
            </div>
            <div className='upcoming-badge-section'>
                <h3>Upcoming badge</h3>
                <div className='upcoming-badge-list'>
                    {upcomingBadgesData.map((badge, index) => (
                        <UpcomingBade key={index} {...badge} />
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default AchievementPage;