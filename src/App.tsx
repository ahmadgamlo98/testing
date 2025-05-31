import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard/dashboard";
import DashboardCrypto from "./pages/dashboardCrypto/dashboardCrypto";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <Routes>
        <Route path="/dashboardCrypto" element={<DashboardCrypto />} />
      </Routes>
    </Router>
  );
}

export default App;
