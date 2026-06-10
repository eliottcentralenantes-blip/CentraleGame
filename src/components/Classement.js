// Individual player ranking — hardcoded for now, will come from backend later
const players = [
  { id: 1, name: 'Marc', clan: 'BDE', score: 1500 },
  { id: 2, name: 'Julie', clan: 'BDA', score: 1350 },
  { id: 3, name: 'Tom', clan: 'BDS', score: 1100 },
];

function Classement() {
  return (
    <div>
      <h2>Classement</h2>
      {players
        .sort((a, b) => b.score - a.score)
        .map((player, index) => (
          <div
            key={player.id}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <span>#{index + 1}</span>
            <span>{player.name}</span>
            <span>({player.clan})</span>
            <span>{player.score} pts</span>
          </div>
        ))}
    </div>
  );
}

export default Classement;