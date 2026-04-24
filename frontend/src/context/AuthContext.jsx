import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/auth/me", {
        withCredentials: true,
      });

      setUser(response.data);
      console.log(user);
    } catch (err) {
      setUser(null);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        userData,
        { withCredentials: true },
      );

      if (response.data.message === "Login Successful!") {
        fetchUser();
        return true;
      }

      return false;
    } catch (error) {
      setUser(null);
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
