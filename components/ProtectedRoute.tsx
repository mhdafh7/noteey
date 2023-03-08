import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);
  return <div>{user ? children : null}</div>;
};

export default ProtectedRoute;
