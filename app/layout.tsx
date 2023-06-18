import { Metadata } from "next";
import { AuthProvider } from "../context/AuthProvider";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Noteey",
  description:
    "Noteey is a simple note taking app built with Next.js and DynamoDB.",
};
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <AuthProvider> */}
        <body>{children}</body>
      {/* </AuthProvider> */}
    </html>
  );
}
