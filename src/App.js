import React from 'react';
import Quiz from './components/Quiz'; // Importe o componente Quiz

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Quiz Engine</h1>
      </header>
      <main>
        <Quiz /> {/* Renderize o componente Quiz aqui */}
      </main>
    </div>
  );
}

export default App;
