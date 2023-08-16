import { User } from "@prisma/client";
import { fetcher } from ".";

export const register = async (user: Partial<User>) => {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
    json: false,
  });
};

export const login = async (user: Partial<User>) => {
  return fetcher({
    url: "/api/login",
    method: "POST",
    body: user,
    json: false,
  });
};
