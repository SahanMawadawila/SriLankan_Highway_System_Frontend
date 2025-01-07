import { Home } from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import UserDashBoard from "./components/User/UserDashBoard";
import { RequireAuth } from "./components/RequireAuth";
import { UserDetailsFetch } from "./components/User/UserDetailsFetch";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        <Route path="/user">
          <Route element={<RequireAuth allowedRole={2024} />}>
            <Route index element={<UserDetailsFetch />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
