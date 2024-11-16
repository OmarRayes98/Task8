import { useAppSelector } from "@/store/hook";
import { Navigate } from "react-router-dom";

const ProtectedRequirdAuth = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRequirdAuth;
