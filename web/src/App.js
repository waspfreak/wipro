import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Button from "./components/button/Button";
import Icon from "./components/icon/Icon";
import ButtonIcon from "./components/buttonIcon/ButtonIcon";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Icon
          color="green"
          viewBox="0 0 28 28"
          width="50"
          height="50"
          icon="Interface"
        ></Icon>
        <Button title="Button" secondary large wrapperStyle="test" />
        <Button title="Button"  large wrapperStyle="test" icon="Arrow" iconColor="red" />
        <ButtonIcon
          buttonColor="buttonColor"
          icon="Home"
          iconColor="green"
          iconSizeHeight="28"
          iconSizeWidth="28"
        />
      </header>
    </div>
  );
}

export default App;
