import "./App.css";
import Routes from "./router/Router";
import ContextProvider from "./context/context";

function App() {
  return (
    <div className="App select-none">
      <ContextProvider>
        <Routes />
      </ContextProvider>
    </div>
  );
}

export default App;
