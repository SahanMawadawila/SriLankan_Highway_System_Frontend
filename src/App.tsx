import { Home } from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import UserDashBoard from "./components/User/UserDashBoard";
import { RequireAuth } from "./components/RequireAuth";
//import { UserDetailsFetch } from "./components/User/UserDetailsFetch";
import { AddNewVehicle } from "./components/User/Add-new-vehicle";
import { ViewAllVehicles } from "./components/User/View-all-vehicles";
import { AddCard } from "./components/User/Add-card";
import { ViewCard } from "./components/User/View-Card";
import { ViewPaymentHistory } from "./components/User/View-Payment_history";
import { SendMessage } from "./components/User/Send-message";
import { Notifications } from "./components/User/Notifications";
import { Help } from "./components/User/Help";
import { UserData } from "./Data/user";
import { AdminData } from "./Data/admin";
import { PoliceData } from "./Data/police";
import { Intercxhanges } from "./components/Admin/Interchanges";
import { VerifyUser } from "./components/Admin/Verify-user";
import { VerifyVehicle } from "./components/Admin/Verify-vehicle";
import { AdminNotifications } from "./components/Admin/notifications";
import { TrackUser } from "./components/Police/Track-user";
import { PoliceNotifications } from "./components/Police/Notifications";
import { Messages } from "./components/Police/Messages";
import { SingleInterchange } from "./components/Admin/single-interchange";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        <Route path="/user">
          <Route element={<RequireAuth allowedRole={2024} />}>
            <Route element={<UserDashBoard data={UserData.navMain} />}>
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
        <Route path="/admin">
          <Route element={<RequireAuth allowedRole={5401} />}>
            <Route element={<UserDashBoard data={AdminData.navMain} />}>
              <Route index element={<Intercxhanges />} />
              <Route path="verify">
                <Route path="user" element={<VerifyUser />} />
                <Route path="vehicle" element={<VerifyVehicle />} />
              </Route>
              <Route path="notifications" element={<AdminNotifications />} />
              <Route
                path="interchanges/:interchangeName"
                element={<SingleInterchange />}
              />
            </Route>
          </Route>
        </Route>
        <Route path="/police">
          <Route element={<RequireAuth allowedRole={4048} />}>
            <Route element={<UserDashBoard data={PoliceData.navMain} />}>
              <Route index element={<Messages />} />
              <Route path="track-user" element={<TrackUser />} />
              <Route path="notifications" element={<PoliceNotifications />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
