import { createContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  role: number;
  photo_url: string;
  accessToken: string;
  login: (roleNumber: number, photo_url: string, accessToken: string) => void;
  logout: () => void;
}

const initialAuthContext: AuthContextType = {
  isAuthenticated: false,
  role: 0,
  accessToken: "",
  photo_url: "",
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext(initialAuthContext);

interface AuthProviderType {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [auth, setAuth] = useState({
    role: 0,
    photo_url: "",
    isAuthenticated: false,
    accessToken: "",
  });

  const login = (
    roleNumber: number,
    photo_url: string,
    accessToken: string
  ) => {
    setAuth({
      role: roleNumber,
      photo_url: photo_url,
      isAuthenticated: true,
      accessToken: accessToken,
    });
  };

  const logout = () => {
    setAuth({
      role: 0,
      photo_url: "",
      isAuthenticated: false,
      accessToken: "",
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
