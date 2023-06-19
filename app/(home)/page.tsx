"use client";
import { useState, useEffect, useContext } from "react";
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import NoteList from "@/components/NoteList";
import { ModalContext } from "@/context/ModalContext";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "@/components/ProtectedRoute";
import MobileBottomNavbar from "@/components/MobileBottomNavbar";
import styles from "./Home.module.scss";
import "react-toastify/dist/ReactToastify.css";
import AddNoteModal from "@/components/AddNoteModal";

export default function Home() {
  // TODO: improve toasts
  // const { user } = useAuth();

  const [noteList, setNoteList] = useState([]);
  const { isOpen } = useContext(ModalContext);
  console.log(isOpen);

  useEffect(() => {
    setNoteList([
      {
        title: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        title: "Dummy Title 1",
        description: "This is a dummy description for the first item.",
      },
      {
        title: "Sample Title",
        description: "This is a sample description for the second item.",
      },
      {
        title: "Sample Title",
        description: "This is a sample description for the second item.",
      },
      {
        title: "Sample Title",
        description: "This is a sample description for the second item.",
      },
      {
        title: "Sample Title",
        description: "This is a sample description for the second item.",
      },
      {
        title: "Sample Title",
        description: "This is a sample description for the second item.",
      },
      {
        title: "Testing 123",
        description: "Just testing the description field.",
      },
      {
        title: "JSON Data",
        description: "A JSON object with title and description fields.",
      },
      {
        title: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        title: "Example Title",
        description: "An example description for the seventh item.",
      },
      {
        title: "Random Title",
        description: "This is a random description for the eighth item.",
      },
      {
        title: "Dummy Title 2",
        description: "Just another dummy description.",
      },
      {
        title: "Final Entry",
        description:
          "The last entry in the array with title and description fields.",
      },
    ]);
  }, []);
  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  // const notesRef = collection(db, "notes");
  // const sortedData = query(notesRef, orderBy("isPinned", "desc"));

  // useEffect(() => {
  //   if (user) {
  //     // getNotes();
  //     // console.log("Notes fetched");
  //   }
  // }, [user]);

  // get notes
  // const getNotes = async () => {
  //   onSnapshot(sortedData, (querySnapshot: DocumentData) =>
  //     setNoteList(
  //       querySnapshot.docs.map((note: DocumentData) => ({
  //         id: note.id,
  //         title: note.data().title,
  //         body: note.data().body,
  //         isPinned: note.data().isPinned,
  //       }))
  //     )
  //   );
  // };

  return (
    // <ProtectedRoute>
    <div className={styles.container}>
      <Header />
      <TabBar />
      <main className={styles.main}>
        <NoteList noteList={noteList} />
        <MobileBottomNavbar />
        {isOpen ? <AddNoteModal /> : null}
      </main>
      <ToastContainer theme="colored" limit={3} />
    </div>
    // </ProtectedRoute>
  );
}
