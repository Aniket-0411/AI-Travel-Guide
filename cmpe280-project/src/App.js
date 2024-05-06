import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navigation from "./Pages/Navigation";
import MainPage from "./Pages/MainPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ChatAI from "./Pages/ChatAI"

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation/>
        <div>
          <Routes>
            <Route path="/" exact element={<MainPage/>}/>
            <Route path="/chat" exact element ={<ChatAI/>}/>
            <Route path="/login" exact element={<Login/>}/>
            <Route path="/register" exact element={<Register/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
