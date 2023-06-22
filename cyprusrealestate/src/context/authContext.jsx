import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext({});
const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL})

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

  const login = async (inputs) => {
    try {
      const res = await axiosInstance.post("/auth/login", inputs);
  

      // setCurrentUser({ isLoggedIn: true, token: access_token });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async (inputs) => {
    try{
    await axiosInstance.post("/auth/logout");
    setCurrentUser(null);
    }catch(err){
      console.error("Logout failed:", error);
    }
  };
  
  return (
    <AuthContext.Provider value={{ auth, setAuth, persist,setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;