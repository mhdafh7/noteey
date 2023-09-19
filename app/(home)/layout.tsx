import Header from "@/components/Header";
import DrawerMenu from "@/components/DrawerMenu";

import styles from "./Home.module.scss";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={styles.container}>
      <Header />
      <DrawerMenu />
      {children}
    </section>
  );
}
