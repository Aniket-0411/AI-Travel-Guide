import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navigation from "./Pages/Navigation";
import MainPage from "./Pages/MainPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ChatAI from "./Pages/ChatAI"
import EmailMeButton from "./Components/EmailMe";
import ResetPassword from "./Pages/ResetPassword";
import SetNewPassword from "./Pages/SetNewPassword";

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
            <Route path="/reset-password" element={<ResetPassword/>}/>
            <Route path="/set-password/:resetToken" element={<SetNewPassword/>}/>
          </Routes>
        </div>
          {/* <EmailMeButton dataToSend="Test" recipientEmail="ani.chopade57@gmail.com"/> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
