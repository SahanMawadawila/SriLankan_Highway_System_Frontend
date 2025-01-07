import { createContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  role: number;
  photo_url: string;
  accessToken: string;
  email: string;
  login: (
    roleNumber: number,
    photo_url: string,
    accessToken: string,
    email: string
  ) => void;
  logout: () => void;
  accessTokenChanger: (accessToken: string) => void;
}

const initialAuthContext: AuthContextType = {
  isAuthenticated: false,
  role: 0,
  accessToken: "",
  photo_url: "",
  email: "",
  login: () => {},
  logout: () => {},
  accessTokenChanger: () => {},
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
    email: "",
    accessToken: "",
  });

  const login = (
    roleNumber: number,
    photo_url: string,
    accessToken: string,
    email: string
  ) => {
    setAuth({
      role: roleNumber,
      photo_url: photo_url,
      isAuthenticated: true,
      accessToken: accessToken,
      email: email,
    });
  };

  const logout = () => {
    setAuth({
      role: 0,
      photo_url: "",
      isAuthenticated: false,
      accessToken: "",
      email: "",
    });
  };

  const accessTokenChanger = (accessToken: string) => {
    setAuth({ ...auth, accessToken });
  };

  return (
    <AuthContext.Provider
      value={{ ...auth, login, logout, accessTokenChanger }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
