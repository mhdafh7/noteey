import Head from "next/head"
import Header from "../components/Header"
import TabBar from "../components/TabBar"
import NoteList from "../components/NoteList"
// import Pagination from "../components/Pagination"
import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify'
import { db } from '../utils/firebase/firebase'
import { collection, getDocs, orderBy, query, onSnapshot } from 'firebase/firestore'
import styles from "../styles/Index.module.scss"
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {

    // TODO: imporove state management using context

    const [noteList, setNoteList] = useState([])

    const notesRef = collection(db, "notes")
    const sortedData = query(notesRef, orderBy("isPinned", "desc"))




    useEffect(() => {
        getNotes()

        console.log("Notes fetched")
    }, [])

    // get notes
    const getNotes = async () => {
        onSnapshot(sortedData, (querySnapshot) => {
            setNoteList(
                querySnapshot.docs.map((note) => ({
                    id: note.id,
                    title: note.data().title,
                    body: note.data().body,
                    isPinned: note.data().isPinned

                }))
            )
        })
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Noteey</title>
                <meta name="description" content="A Note taking solution" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.paperBg}></div>
            <Header />
            <TabBar notesRef={notesRef} />

            <main className={styles.main}>
                <NoteList noteList={noteList} />
            </main>
            {/* TODO: pagination 
            <footer>
                <Pagination />
            </footer> */}
            <ToastContainer theme="colored" limit={3} />
        </div>
    )
}
