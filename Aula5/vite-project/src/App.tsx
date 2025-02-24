import './App.css'
import { Counter } from './components/Counter';
import { Clock } from './components/Clock';

function App() {
  return (
    <div>
      <Clock />
      <Counter name="Miguel" age={25}/>
    </div>
  );
}

export default App;