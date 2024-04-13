import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import MainPage from "./Components/MainPage/MainPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" exact element={<MainPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
