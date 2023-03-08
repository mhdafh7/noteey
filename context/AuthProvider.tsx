import React, {
  ReactNode,
  useEffect,
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { auth } from "../libs/firebase/firebase";
import {
  Auth,
  UserCredential,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export type AuthProviderProps = {
  children?: ReactNode;
};

export type AuthContextModel = {
  auth: Auth;
  user: User | null;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => {};
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  sendPasswordResetEmail?: (email: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextModel>(
  {} as AuthContextModel
);

export function useAuth(): AuthContextModel {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  function signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(auth, email);
  }
  async function logOut() {
    setUser(null);
    await signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const values = {
    signUp,
    user,
    signIn,
    resetPassword,
    logOut,
    loading,
    setLoading,
    auth,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
