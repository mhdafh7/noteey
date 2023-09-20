import { Prisma } from "@prisma/client";

const signUp = async (user: Prisma.UserCreateInput) => {
  const res = await fetch(`/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return res.json();
};

const AuthRoutes = {
  signUp,
};

export default AuthRoutes;
