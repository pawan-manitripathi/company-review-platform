import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CompanyDetails from "./pages/CompanyDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company/:id" element={<CompanyDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;