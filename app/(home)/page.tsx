import TabBar from "@/components/TabBar";
import NoteList from "@/components/NoteList";
import MobileBottomNavbar from "@/components/MobileBottomNavbar";

import styles from "./Home.module.scss";

export default async function Home() {
  return (
    <main className={styles.main}>
      <TabBar />
      <NoteList />
      <MobileBottomNavbar />
    </main>
  );
}
