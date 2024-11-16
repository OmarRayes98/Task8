import { useAppSelector } from "@/store/hook";
import { Navigate } from "react-router-dom";

const ProtectedRequiredUnAuth = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAppSelector((state) => state.auth);

  //if login before . can't go to login page ahain until logout
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default ProtectedRequiredUnAuth;
