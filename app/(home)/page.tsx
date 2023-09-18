import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import NoteList from "@/components/NoteList";
import MobileBottomNavbar from "@/components/MobileBottomNavbar";
import DrawerMenu from "@/components/DrawerMenu";

import styles from "./Home.module.scss";

export default async function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <DrawerMenu />
      <main className={styles.main}>
        <TabBar />
        <NoteList />
        <MobileBottomNavbar />
      </main>
    </div>
  );
}
