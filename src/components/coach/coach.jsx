import React from 'react';
import './coach.scss'; // We will create this file next

const Coach = () => {
  // Placeholder data for three coaches
  const coaches = [
    {
      id: 1,
      image: 'https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/470581714_1577196352922229_3585842071043195776_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=HVAHvIbecvYQ7kNvwEOnK_9&_nc_oc=AdmfKA-l9X9zo-YyKhHgzPSYp8pilNra89fwFuHvhtalicNJadJJ25ZzudoLHlxQN-k&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=owE5rgUrSLvAI5lG_VqPMg&oh=00_AfJjezUPbdA304rhYPYU4tS3HY9nG0vPHCXYAXeK9S-lNQ&oe=68424C8B', // Replace with actual image paths
      name: 'TS. Nguyễn Danh Nam',
      title: 'Master\'s in Tobacco Research and Tobacco Behavior....',
      rating: 1,
    },
    {
      id: 2,
      image: 'https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/470581714_1577196352922229_3585842071043195776_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=HVAHvIbecvYQ7kNvwEOnK_9&_nc_oc=AdmfKA-l9X9zo-YyKhHgzPSYp8pilNra89fwFuHvhtalicNJadJJ25ZzudoLHlxQN-k&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=owE5rgUrSLvAI5lG_VqPMg&oh=00_AfJjezUPbdA304rhYPYU4tS3HY9nG0vPHCXYAXeK9S-lNQ&oe=68424C8B', // Replace with actual image paths
      name: 'TS. Nguyễn Danh Nam',
      title: 'Master\'s in Tobacco Research and Tobacco Behavior....',
      rating: 1,
    },
    {
      id: 3,
      image: 'https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/470581714_1577196352922229_3585842071043195776_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=HVAHvIbecvYQ7kNvwEOnK_9&_nc_oc=AdmfKA-l9X9zo-YyKhHgzPSYp8pilNra89fwFuHvhtalicNJadJJ25ZzudoLHlxQN-k&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=owE5rgUrSLvAI5lG_VqPMg&oh=00_AfJjezUPbdA304rhYPYU4tS3HY9nG0vPHCXYAXeK9S-lNQ&oe=68424C8B', // Replace with actual image paths
      name: 'TS. Nguyễn Danh Nam',
      title: 'Master\'s in Tobacco Research and Tobacco Behavior....',
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
                {'★'.repeat(coach.rating)}{'☆'.repeat(5 - coach.rating)} {coach.rating}/5
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