import Head from "next/head"
import Header from "../components/Header"
import TabBar from "../components/TabBar"
import NoteList from "../components/NoteList"
import Pagination from "../components/Pagination"
import styles from "../styles/Index.module.scss"
import { useState, useEffect } from "react"
import { db } from '../utils/firebase/firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore'

export default function Home() {

    const [noteList, setNoteList] = useState([])
    const notesRef = collection(db, "notes")
    const sortedData = query(notesRef, orderBy("isPinned", "desc"))


    // dummy data
    // const noteList = [
    //     {
    //         "id": 1,
    //         "isPinned": true,
    //         "title": "delectus aut autem",
    //         "body": "Heloo im under the water"
    //     },
    //     {
    //         "id": 2,
    //         "isPinned": false,
    //         "title": "quis ut nam facilis et officia qui",
    //         "body": "Heloo im under the water"
    //     },
    //     {
    //         "id": 3,
    //         "isPinned": true,
    //         "title": "fugiat veniam minus",
    //         "body": "Heloo im under the water"
    //     },
    //     {
    //         "id": 4,
    //         "isPinned": false,
    //         "title": "et porro tempora",
    //         "body": "not under the water"
    //     },
    //     {
    //         "id": 5,
    //         "isPinned": false,
    //         "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    //         "body": "Heloo im under the water"
    //     },
    //     {
    //         "id": 6,
    //         "isPinned": false,
    //         "title": "qui ullam ratione quibusdam voluptatem quia omnis",
    //         "body": "Heloo im under the water"
    //     },
    //     {
    //         "id": 7,
    //         "isPinned": false,
    //         "title": "illo expedita consequatur quia in",
    //         "body": "Heloo im under the water"
    //     },
    //     {
    //         "id": 8,
    //         "isPinned": true,
    //         "title": "quo adipisci enim quam ut ab",
    //         "body": "not under the water"
    //     },
    // ]

    useEffect(() => {
        getNotes()
    }, [notesRef])

    // get notes
    const getNotes = async () => {
        const data = await getDocs(sortedData)
        setNoteList(data.docs.map((note) => ({ ...note.data(), id: note.id })))
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
        </div>
    )
}
