import axios from "axios";
import { createContext, useEffect, useState } from "react";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/auth";

export const userContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function forgotPassword(email) {
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/forgotPasswords`, {
        email,
      });
      return { status: "success", data: res };
    } catch (error) {
      return { status: "error", data: error };
    } finally {
      setLoading(false);
    }
  }

  async function confirmResetCode(resetCode) {
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/verifyResetCode`, {
        resetCode,
      });
      return { status: "success", data: res };
    } catch (error) {
      return { status: "error", data: error };
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword(formData) {
    try {
      setLoading(true);
      const res = await axios.put(`${BASE_URL}/resetPassword`, {
        email: formData.email,
        newPassword: formData.newPassword,
      });
      return { status: "success", data: res };
    } catch (error) {
      return { status: "error", data: error };
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) setUser({ token: token });
  }, []);

  return (
    <userContext.Provider value={{ setUser, forgotPassword, confirmResetCode, resetPassword, user, loading }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
