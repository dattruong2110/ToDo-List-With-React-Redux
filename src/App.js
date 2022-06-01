import React from "react";
import "./App.css";
import { Card } from "@material-ui/core";
import { Filters } from "./Components/Filters/filters";

function App() {
  return (
    <div className='App'>
      <Card 
        className='box-shadow box-shadow-hover' 
        style={{ marginTop: '30px', height: '690px', backgroundColor: 'rgb(255 255 255)' }}
      >
        <h1 
          style={{ 
            marginTop: '10px', 
            fontSize: '1.8rem', 
            textAlign: 'center', 
            color: '#3f51b5' 
          }}
        >
          TODO APP
        </h1>
        <Filters />
      </Card>
    </div>
  );
}

export default App;