import { Home } from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import UserDashBoard from "./components/User/UserDashBoard";
import { RequireAuth } from "./components/RequireAuth";
import { UserDetailsFetch } from "./components/User/UserDetailsFetch";
import { AddNewVehicle } from "./components/User/Add-new-vehicle";
import { ViewAllVehicles } from "./components/User/View-all-vehicles";
import { AddCard } from "./components/User/Add-card";
import { ViewCard } from "./components/User/View-Card";
import { ViewPaymentHistory } from "./components/User/View-Payment_history";
import { SendMessage } from "./components/User/Send-message";
import { Notifications } from "./components/User/Notifications";
import { Help } from "./components/User/Help";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        <Route path="/user">
          <Route element={<RequireAuth allowedRole={2024} />}>
            <Route element={<UserDashBoard />}>
              <Route index element={<ViewAllVehicles />} />
              <Route path="vehicle">
                <Route path="add-new" element={<AddNewVehicle />} />
              </Route>
              <Route path="payments">
                <Route path="add-card" element={<AddCard />} />
                <Route path="view-cards" element={<ViewCard />} />
                <Route path="history" element={<ViewPaymentHistory />} />
              </Route>
              <Route path="send-message" element={<SendMessage />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="help" element={<Help />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
