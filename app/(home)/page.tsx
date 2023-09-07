import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import NoteList from "@/components/NoteList";
import MobileBottomNavbar from "@/components/MobileBottomNavbar";
import styles from "./Home.module.scss";

export default async function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <TabBar />
      <main className={styles.main}>
        <NoteList />
        <MobileBottomNavbar />
      </main>
    </div>
  );
}
