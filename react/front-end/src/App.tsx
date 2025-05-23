import "./index.css";

import Home from "./pages/home";
import BillSplitForm from "./pages/billSplitForm";
import NotFound from "./pages/notFound";
import PayBillSplit from "./pages/payBillSplit";
import TestPage from "./pages/test";

import PrivateRoute from "./utility/privateRoute";
import { AuthProvider } from "./context/authContext";
import { UserProfileProvider } from "./context/userProfileContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import SuccessRegister from "./pages/successregister";
import Profile from "./pages/profile";

function App() {
  return (
    <AuthProvider>
      <UserProfileProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PrivateRoute component={<Home />} />} />
            <Route
              path="/bill-split/:mode/:id"
              element={<PrivateRoute component={<BillSplitForm />} />}
            />
            <Route
              path="/bill-split/create/"
              element={<PrivateRoute component={<BillSplitForm />} />}
            />
            <Route path="/profile" element={<PrivateRoute component={<Profile />} />} />
            <Route path="/pay-bill-split/:id" element={<PayBillSplit />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/authorization" >
              <Route path="/authorization/login" element={<Login />} />
              <Route path="/authorization/register" element={<Register />} />
              <Route path="/authorization/successregister" element={<SuccessRegister />} />
            </Route>
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </Router>
      </UserProfileProvider>
    </AuthProvider>
  );
}

export default App;
