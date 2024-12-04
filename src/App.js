import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AppRouter from "./config/AppRouter";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useEffect } from "react";

function App() {
  useEffect(()=> {
    const localstorageItem = localStorage.getItem('checkoutQuantity')

    if (!localstorageItem) {
      localStorage.setItem('checkoutQuantity', JSON.stringify([]))
    }

  },[])
  return (
    <Provider store={store}>
      <div className="App overflow-x-hidden">
        <AppRouter />
      </div>
    </Provider>
  );
}

export default App;
