import "./index.css";

import Login from "./pages/login";
import Home from "./pages/home";
import CreateBillSplit from "./pages/createBillSplit";

import PrivateRoute from "./utility/privateRoute";
import { AuthProvider } from "./context/authContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute component={<Home />} />} />
          <Route
            path="/create-bill-split"
            element={<PrivateRoute component={<CreateBillSplit />} />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
