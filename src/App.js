import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AppRouter from './config/AppRouter';



function App() {
  return (
    <div className="App overflow-x-hidden">
      <AppRouter />
    </div>
  );
}

export default App;
