import React from "react";
import "./App.css";
import { Filters } from "./Components/Filters/filters";

function App() {
  return (
    <div className='App'>
      <h1 style={{ fontSize: '1.8rem' }}>TODO APP</h1>
      <Filters />
    </div>
  );
}

export default App;