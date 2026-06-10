
const clanStats = [
  { name: 'BDE', color: '#3B82F6', pixels: 1200 },
  { name: 'BDA', color: '#F59E0B', pixels: 850 },
  { name: 'BDS', color: '#10B981', pixels: 650 },
];


// This component displays the dashboard with clan statistics

function Dashboard() {
  return (
   <div>
    // Dashboard title
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

