import Actions from './components/Actions';
import Map from './components/Map';
import Dashboard from './components/Dashboard';
import Classement from './components/Classement';

function App() {
  return (
      <div>
          <h1>
            Centrale game
          </h1>
          <Map/>
          <Dashboard/>
          <Actions/>
          <Classement/>
      </div>
  );
}

export default App;
