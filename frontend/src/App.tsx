import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
