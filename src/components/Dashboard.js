import { useState, useEffect } from 'react';



// This component displays the dashboard with clan statistics



function Dashboard() {
  const [clanStats, setClanStats] = useState([]); // start empty 
  useEffect(() => {
    fetch('http://127.0.0.1:8000/leaderboard')   // send request
      .then(response => response.json())          // when response arrives, parse JSON
      .then(data => setClanStats(data));          // when JSON is ready, store it
  }, []);

  return (
   <div>
      <h2>Dashboard</h2>
      {clanStats
        .sort((a, b) => b.pixels - a.pixels)
        .map(clan => (
          <div key={clan.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ backgroundColor: clan.color, width: 20, height: 20 }}></div>
            <p>{clan.name}: {clan.pixels} pixels</p>
          </div>
        ))}
    </div>
  );
}

export default Dashboard;