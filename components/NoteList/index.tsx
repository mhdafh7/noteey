"use client";

import { useState } from "react";

import { Note } from "@prisma/client";
import { MasonryGrid } from "@egjs/react-grid";
import { useCurrentNoteStore } from "@/store/note";

import NoteItem from "../Note";
import NoteModal from "../NoteModal";
import MobileNoteModal from "../MobileNoteModal";

import styles from "./styles.module.scss";

const NoteList = () => {
  const [noteList] = useState([
    {
      id: "1",
      ownerId: "user_id_1",
      title: "Meeting Agenda",
      description: "Discuss project updates and plan for the next quarter.",
      isPinned: false,
      deleted: false,
      createdAt: new Date(), // Replace with actual timestamps
      updatedAt: new Date(), // Replace with actual timestamps
    },
    {
      id: "2",
      ownerId: "user_id_1",
      title: "Grocery List",
      description: "Milk, eggs, bread, and fruits.",
      isPinned: true,
      deleted: false,
      createdAt: new Date(), // Replace with actual timestamps
      updatedAt: new Date(), // Replace with actual timestamps
    },
    {
      id: "3",
      ownerId: "user_id_2",
      title: "Reminder",
      description: "Don't forget to call mom on her birthday!",
      isPinned: false,
      deleted: false,
      createdAt: new Date(), // Replace with actual timestamps
      updatedAt: new Date(), // Replace with actual timestamps
    },
    {
      id: "4",
      ownerId: "user_id_2",
      title: "Study Notes",
      description: "Review chapters 5 to 10 for the exam.",
      isPinned: true,
      deleted: false,
      createdAt: new Date(), // Replace with actual timestamps
      updatedAt: new Date(), // Replace with actual timestamps
    },
    {
      id: "5",
      ownerId: "user_id_3",
      title: "Vacation Plans",
      description: "Book flights and hotels for the summer vacation.",
      isPinned: false,
      deleted: false,
      createdAt: new Date(), // Replace with actual timestamps
      updatedAt: new Date(), // Replace with actual timestamps
    },
    {
      id: "6",
      ownerId: "user_id_3",
      title: "Recipes",
      description: "Find new recipes for dinner this week.",
      isPinned: false,
      deleted: false,
      createdAt: new Date(), // Replace with actual timestamps
      updatedAt: new Date(), // Replace with actual timestamps
    },
    {
      id: "7",
      ownerId: "user_id_4",
      title: "Gift Ideas",
      description: "Birthday gift ideas for Sarah.",
      isPinned: true,
      deleted: false,
      createdAt: new Date(), // Replace with actual timestamps
      updatedAt: new Date(), // Replace with actual timestamps
    },
    {
      id: "8",
      ownerId: "user_id_4",
      title: "Home Repairs",
      description: "Fix the leaky faucet in the kitchen.",
      isPinned: false,
      deleted: false,
      createdAt: new Date(), // Replace with actual timestamps
      updatedAt: new Date(), // Replace with actual timestamps
    },
    {
      id: "9",
      ownerId: "user_id_5",
      title: "Book Recommendations",
      description: "Ask friends for book recommendations.",
      isPinned: false,
      deleted: false,
      createdAt: new Date(), // Replace with actual timestamps
      updatedAt: new Date(), // Replace with actual timestamps
    },
    {
      id: "10",
      ownerId: "user_id_5",
      title: "Workout Routine",
      description: "Plan the weekly workout routine.",
      isPinned: true,
      deleted: false,
      createdAt: new Date(), // Replace with actual timestamps
      updatedAt: new Date(), // Replace with actual timestamps
    },
    {
      id: "11",
      ownerId: "user_id_6",
      title: "Coding Project",
      description: "Work on the coding project for the client.",
      isPinned: false,
      deleted: false,
      createdAt: new Date(), // Replace with actual timestamps
      updatedAt: new Date(), // Replace with actual timestamps
    },
    {
      id: "12",
      ownerId: "user_id_6",
      title: "Travel Itinerary",
      description: "Create an itinerary for the business trip.",
      isPinned: false,
      deleted: false,
      createdAt: new Date(), // Replace with actual timestamps
      updatedAt: new Date(), // Replace with actual timestamps
    },
    {
      id: "13",
      ownerId: "user_id_7",
      title: "Music Playlist",
      description: "Create a playlist for the road trip.",
      isPinned: true,
      deleted: false,
      createdAt: new Date(), // Replace with actual timestamps
      updatedAt: new Date(), // Replace with actual timestamps
    },
    {
      id: "14",
      ownerId: "user_id_7",
      title: "Financial Planning",
      description: "Review monthly expenses and savings.",
      isPinned: false,
      deleted: false,
      createdAt: new Date(), // Replace with actual timestamps
      updatedAt: new Date(), // Replace with actual timestamps
    },
    {
      id: "15",
      ownerId: "user_id_8",
      title: "Project Ideas",
      description: "Brainstorm ideas for the next project.",
      isPinned: true,
      deleted: false,
      createdAt: new Date(), // Replace with actual timestamps
      updatedAt: new Date(), // Replace with actual timestamps
    },
  ]);

  const isNoteModalOpen = useCurrentNoteStore((state) => state.isNoteModalOpen);
  const setIsNoteModalOpen = useCurrentNoteStore(
    (state) => state.setIsNoteModalOpen
  );

  const pinnedNotes = noteList.filter((note: Note) => note.isPinned);
  const unpinnedNotes = noteList.filter((note: Note) => !note.isPinned);

  return noteList.length !== 0 ? (
    <>
      {isNoteModalOpen ? (
        <>
          <NoteModal setIsModalOpen={setIsNoteModalOpen} />
          <MobileNoteModal />
        </>
      ) : null}
      {pinnedNotes.length > 0 && (
        <div className={styles.container}>
          <h3 className={styles.title}>
            Pinned <span>Notes</span>
          </h3>
          <MasonryGrid
            gap={20}
            defaultDirection="end"
            align="center"
            autoResize
          >
            {pinnedNotes.map((note: Note) => (
              <NoteItem
                id={note.id}
                key={note.id}
                title={note.title}
                description={note.description}
                isPinned={note.isPinned}
                createdAt={note.createdAt}
                updatedAt={note.updatedAt}
                ownerId={note.ownerId}
              />
            ))}
          </MasonryGrid>
          <hr />
        </div>
      )}
      <div className={styles.container}>
        <MasonryGrid gap={20} defaultDirection="end" align="center" autoResize>
          {unpinnedNotes.map((note: Note) => (
            <NoteItem
              id={note.id}
              key={note.id}
              title={note.title}
              description={note.description}
              isPinned={note.isPinned}
              createdAt={note.createdAt}
              updatedAt={note.updatedAt}
              ownerId={note.ownerId}
            />
          ))}
        </MasonryGrid>
      </div>
    </>
  ) : (
    <div className={styles.emptyContainer}>
      <h4 className={styles.emptyMessage}>Notes you add appear here</h4>
    </div>
  );
};
export default NoteList;
