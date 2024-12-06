import "./App.css";
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
