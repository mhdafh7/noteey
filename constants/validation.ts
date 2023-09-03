import passwordValidation from "@/libs/PasswordValidation";
import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(8).max(200),
});

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().optional(),
  email: Yup.string().email("Invalid email").required("Required"),
  password: passwordValidation,
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
