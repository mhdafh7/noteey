import { Metadata } from "next";
import "@/styles/globals.scss";
import { ModalProvider } from "@/context/ModalContext";

export const metadata: Metadata = {
  title: "Noteey",
  description: "A Note taking Web Application made using Nextjs",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "notes",
    "note taking",
    "noteey",
  ],
  authors: [
    {
      name: "Muhammed Aflah",
      url: "https://www.mhdafh.codes",
    },
  ],
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
      <ModalProvider>
        <body>{children}</body>
      </ModalProvider>
    </html>
  );
}
