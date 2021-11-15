import logo from "./logo.svg";
import "./App.css";
import Typical from "react-typical";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typical steps={["Cuyhub", 1000, "Cuyhub Community!", 500]} loop={Infinity} wrapper="p" />
      </header>
    </div>
  );
}

export default App;
