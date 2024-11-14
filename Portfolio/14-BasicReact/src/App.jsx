import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import sw from "./data/data.js";
import Display from "./components/Display.jsx";


function App() {

  return (
    <div className="App">
        <Display data={sw}/>
    </div>
  );
}
export default App;
