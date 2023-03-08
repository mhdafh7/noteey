import Head from "next/head";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import NoteList from "../components/NoteList";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { db } from "../libs/firebase/firebase";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { DocumentData } from "@firebase/firestore-types";
import styles from "../styles/Home.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthProvider";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Home() {
  // TODO: improve toasts
  // TODO: pinned notes hide when no notes
  const { user } = useAuth();

  const [noteList, setNoteList] = useState([]);

  const notesRef = collection(db, "notes");
  const sortedData = query(notesRef, orderBy("isPinned", "desc"));

  useEffect(() => {
    if (user) {
      getNotes();
      console.log("Notes fetched");
    }
  }, [user]);

  // get notes
  const getNotes = async () => {
    onSnapshot(sortedData, (querySnapshot: DocumentData) =>
      setNoteList(
        querySnapshot.docs.map((note: DocumentData) => ({
          id: note.id,
          title: note.data().title,
          body: note.data().body,
          isPinned: note.data().isPinned,
        }))
      )
    );
  };

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <Head>
          <title>Noteey</title>
          <meta
            name="description"
            content="A Note taking Web Application made using Nextjs"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <TabBar notesRef={notesRef} />
        <main className={styles.main}>
          <NoteList noteList={noteList} />
        </main>
        <ToastContainer theme="colored" limit={3} />
      </div>
    </ProtectedRoute>
  );
}
