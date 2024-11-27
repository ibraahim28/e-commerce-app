import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AppRouter from "./config/AppRouter";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App overflow-x-hidden">
        <AppRouter />
      </div>
    </Provider>
  );
}

export default App;
