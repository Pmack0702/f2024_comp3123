import logo from './logo.svg';
import './App.css';
import Intro from './Intro';
import Student from './student';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Intro/>
        <Student studentID="101412431" name="Meet Patel" />
        
      
      </header>
    </div>
  );
}

export default App;
