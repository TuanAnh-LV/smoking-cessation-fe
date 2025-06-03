import React from 'react'
import styles from './ProgressPage.module.css'
import StatCards from '../../components/StatCards'
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

const ProgressPage = () => {
  // Sample data - replace with data from API call later
  const noSmokingData = { value: '15',icon: IoCheckmarkCircleOutline, label: 'No smoking day' };
  const savingsData = { value: '450.000 VNĐ',icon: IoCheckmarkCircleOutline, label: 'Save money' };
  const healthData = { value: '85%',icon: IoCheckmarkCircleOutline, label: 'Sức khỏe cải thiện' };

  return (
    <div className={styles['progress-page-container']}>
      <header>
        <h1>Smoking withdrawal process</h1>
        <p>Monitor details of the smoking cessation process and positive improvements</p>
      </header>

      <StatCards 
        noSmokingData={noSmokingData}
        savingsData={savingsData}
        healthData={healthData}
      />

      <section className={styles['progress-section']}>
        <h2>Progress by week</h2>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>No smoking day</th>
              <th>Savings money</th>
              <th>Mood</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Week 1</td>
              <td><span className={styles['day-badge']}>7 days</span></td>
              <td>87.500 VNĐ</td>
              <td><span className={styles['hard']}>hard</span></td>
            </tr>
            <tr>
              <td>Week 2</td>
              <td><span className={styles['day-badge']}>7 days</span></td>
              <td>175.000 VNĐ</td>
              <td><span className={styles['Better']}>Better</span></td>
            </tr>
            <tr>
              <td>Week 3</td>
              <td><span className={styles['day-badge']}>1 day</span></td>
              <td>262.500 VNĐ</td>
              <td><span className={styles['Positive']}>Positive</span></td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>

        <div className={styles['date-info']}>
          <p>Start date: 20-6-2025</p>
          <p>End date: 27-6-2025</p>
        </div>
      </section>
    </div>
  )
}

export default ProgressPage