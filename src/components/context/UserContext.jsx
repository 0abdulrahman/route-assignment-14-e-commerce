import { createContext, useEffect, useState } from "react";

// 1- Create the context
export const userContext = createContext();

// 2- Create the provider
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) setUser({ token: token });
  }, []);

  return (
    // 3- Provide the values
    <userContext.Provider value={{ user, setUser }}>{children}</userContext.Provider>
  );
}

export default UserProvider;
