import { useMutation } from "@tanstack/react-query";
import AuthRoutes from "../routes/auth.routes";

const useSignUp = () => {
  return useMutation({
    mutationFn: AuthRoutes.signUp,
  });
};

const AuthMutations = {
  useSignUp,
};

export default AuthMutations;
