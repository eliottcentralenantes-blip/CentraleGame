import { useState } from 'react';

// Available actions a player can perform on the map
const actions = [
  { id: 'attack', label: 'Attack', cost: 100 },
  { id: 'expand', label: 'Expand', cost: 50 },
  { id: 'spell', label: 'Cast Spell', cost: 200 },
];

function Actions() {
  // Player's current currency (monnaie) — hardcoded for now, will come from backend later
  const [currency, setCurrency] = useState(150);

  // Called when a player clicks an action button
  const handleAction = (action) => {
    if (currency >= action.cost) {
      setCurrency(currency - action.cost); // deduct (déduire) the cost
      console.log(`Action ${action.label} performed`);
    } else {
      console.log('Not enough currency');
    }
  };

  return (
    <div>
      <h2>Actions</h2>
      <p>Currency: {currency}</p>
      {actions.map(action => (
        <button
          key={action.id}
          onClick={() => handleAction(action)}
          style={{ display: 'block', margin: '5px 0' }}
        >
          {action.label} ({action.cost})
        </button>
      ))}
    </div>
  );
}

export default Actions;