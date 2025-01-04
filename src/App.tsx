import { Home } from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import UserDashBoard from "./components/User/UserDashBoard";
import { RequireAuth } from "./components/RequireAuth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        <Route path="/user">
          <Route element={<RequireAuth allowedRole={2024} />}>
            <Route index element={<UserDashBoard />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
