import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="back-button-container">
        <a href="/">&larr; Back</a>
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    // <div id="app">
    //   <nav>
    //     <a href="/">&larr; Back</a>
    //   </nav>

    //   <h1>Welcome to App Three</h1>
    //   <p>This is a React application</p>
    //   <img src={logo} alt="react logo" />
    // </div>
  );
}

export default App;
