import { AuthProvider } from "../context/AuthProvider";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: any) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
