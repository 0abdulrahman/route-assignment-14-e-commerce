import { Navigate } from "react-router-dom";

function AuthGuard({ children }) {
  const token = localStorage.getItem("userToken");

  if (!token) return <Navigate replace to="/" />;

  return <>{children}</>;
}

export default AuthGuard;
