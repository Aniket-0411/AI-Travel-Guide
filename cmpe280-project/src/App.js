import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navigation from "./Pages/Navigation";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ChatAI from "./Pages/ChatAI"
import EmailMeButton from "./Components/EmailMe";
import ResetPassword from "./Pages/ResetPassword";
import SetNewPassword from "./Pages/SetNewPassword";
import Profile from "./Pages/Profile";
import ListView from "./Pages/ListView";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation/>
          <Routes>
            <Route path="/" exact element={<ListView/>}/>
            <Route path="/chat" exact element ={<ChatAI/>}/>
            <Route path="/login" exact element={<Login/>}/>
            <Route path="/register" exact element={<Register/>}/>
            <Route path="/reset-password" element={<ResetPassword/>}/>
            <Route path="/set-password/:resetToken" element={<SetNewPassword/>}/>
            <Route path="/profile" exact element={<Profile/>}/>
            <Route path="/list" exact element={<ListView/>}/>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          
      </div>
    </BrowserRouter>
  );
}

export default App;
