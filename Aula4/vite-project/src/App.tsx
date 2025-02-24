import './App.css'
import { Greeting } from './components/Greeting.tsx'
import {Card} from './components/Card.tsx';


const App = () => {
  const handleButtonClick = () => {
    alert('Botão clicado!');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <Card
        title="Título do Card"
        description="Esta é uma descrição simples para o card."
        buttonText="Clique Aqui"
        onButtonClick={handleButtonClick}
      />
    </div>
  );
};

export default App;

const data = {
  title: 'Título do Card',
  description: 'Esta é uma descrição simples para o card.',
  button: 'Clique Aqui',
};

function App() {
  return (
    <counter/> )
  }