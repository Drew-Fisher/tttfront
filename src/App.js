import React from "react";
import logo from "./logo.svg";
import "./scss/main.scss";
import Game from "./game";
import TestP from "./testp";
import TttGame from "./tttGame";
import TttBoard from "./tttComponents/tttBoard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TttBoard />
      </header>
    </div>
  );
}

export default App;
