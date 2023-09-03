"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

import GoogleIcon from "@/public/images/google-icon.png";
import styles from "./styles.module.scss";

type loginButtonProps = {
  callbackUrl: string;
};

export const GoogleLoginButton = ({ callbackUrl }: loginButtonProps) => {
  const handleLogin = async () => signIn("google", { callbackUrl });
  return (
    <button className={styles.googleLoginButton} onClick={handleLogin} type="button">
      <Image src={GoogleIcon} alt="Google Icon" width={20} height={20} />
      <span>Continue with Google</span>
    </button>
  );
};
