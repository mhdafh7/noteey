import { useState, useEffect, useRef } from "react"
import { db } from "../utils/firebase/firebase"
import { addDoc } from 'firebase/firestore'
import styles from "../styles/AddNote.module.scss"

const AddNote = ({ notesRef }) => {

    const [inputTitle, setInputTitle] = useState("")
    const [inputBody, setInputBody] = useState("")
    const [isPinned, setIsPinned] = useState(false)
    const [showInput, setShowInput] = useState(false)

    const titleRef = useRef(null)
    const pinRef = useRef(null)

    // create note

    const createNote = async () => {
        await addDoc(notesRef, { title: inputTitle, body: inputBody, isPinned: isPinned })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createNote()

        // reseting states
        setInputBody("")
        setInputTitle("")
        setIsPinned(false)
        setShowInput(false)
    }

    // close input when clicking outside of the input
    const handleClickOutside = (e) => {
        const { current: wrap } = titleRef
        const { current: wrap2 } = pinRef
        console.log(wrap,wrap2);
        

        if ((wrap && !wrap.contains(e.target)) && (wrap2 && !wrap2.contains(e.target))) {
            setShowInput(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.wrapper}>
                    {showInput && (
                        <div className={styles.titleWrapper}>
                            <input
                                className={styles.titleInput}
                                type="text"
                                placeholder="Title"
                                ref={titleRef}
                                value={inputTitle}
                                onChange={(e) => {
                                    setInputTitle(e.target.value)
                                }}
                                onFocus={() => {
                                    setShowInput(true)
                                }}
                            />
                        </div>
                    )}
                    <textarea
                        className={styles.bodyInput}
                        cols={20}
                        rows={2}
                        placeholder="Add a note..."
                        value={inputBody}
                        onChange={(e) => {
                            setInputBody(e.target.value)
                        }}
                        onFocus={() => {
                            setShowInput(true)
                        }}
                    />
                </div>
                {
                    inputTitle || inputBody ? (
                        <div className={styles.buttonWrapper}>
                            <span title="Pin note" ref={pinRef} className={styles.pinIcon} onClick={() => { setIsPinned(!isPinned) }}>
                                {!isPinned ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.7419 1.08301C14.8404 1.08283 14.9381 1.10208 15.0292 1.13966C15.1203 1.17724 15.2031 1.23241 15.2729 1.30201L22.6979 8.72701C22.8385 8.86765 22.9175 9.05839 22.9175 9.25726C22.9175 9.45613 22.8385 9.64686 22.6979 9.78751C21.9779 10.5075 21.0899 10.6695 20.4434 10.6695C20.1779 10.6695 19.9409 10.6425 19.7534 10.611L15.0524 15.312C15.1761 15.8106 15.2564 16.319 15.2924 16.8315C15.3614 17.8845 15.2444 19.362 14.2124 20.394C14.0717 20.5346 13.881 20.6136 13.6821 20.6136C13.4833 20.6136 13.2925 20.5346 13.1519 20.394L8.90838 16.152L4.13538 20.925C3.84288 21.2175 2.30688 22.278 2.01438 21.9855C1.72188 21.693 2.78238 20.1555 3.07488 19.8645L7.84788 15.0915L3.60588 10.848C3.46528 10.7074 3.38629 10.5166 3.38629 10.3178C3.38629 10.1189 3.46528 9.92815 3.60588 9.78751C4.63788 8.75551 6.11538 8.63701 7.16838 8.70751C7.68087 8.74342 8.18928 8.82372 8.68788 8.94751L13.3889 4.24801C13.3496 4.01958 13.3296 3.78828 13.3289 3.55651C13.3289 2.91151 13.4909 2.02351 14.2124 1.30201C14.3529 1.16181 14.5434 1.08305 14.7419 1.08301V1.08301ZM14.9249 4.25101V4.24801V4.25101ZM14.9249 4.24801V4.25101C14.9682 4.38296 14.974 4.52435 14.9417 4.65942C14.9094 4.7945 14.8402 4.91794 14.7419 5.01601L9.43938 10.317C9.34086 10.4151 9.21701 10.4839 9.08165 10.5157C8.9463 10.5475 8.80478 10.541 8.67288 10.497H8.66988L8.64888 10.491C8.50618 10.4483 8.3621 10.4102 8.21688 10.377C7.83954 10.289 7.45586 10.2308 7.06938 10.203C6.43638 10.161 5.81538 10.215 5.30688 10.428L13.5719 18.6915C13.7834 18.1815 13.8374 17.562 13.7954 16.929C13.7572 16.3931 13.6606 15.863 13.5074 15.348L13.5014 15.3285V15.327C13.4571 15.1949 13.4505 15.0531 13.4823 14.9174C13.5141 14.7818 13.583 14.6577 13.6814 14.559L18.9854 9.25651C19.0875 9.15375 19.2172 9.08277 19.3589 9.05216C19.5005 9.02155 19.6479 9.03261 19.7834 9.08401L19.9274 9.11701C20.0579 9.14251 20.2394 9.16801 20.4434 9.16801C20.6144 9.16801 20.7884 9.15151 20.9579 9.10801L14.8904 3.04201C14.8469 3.21151 14.8304 3.38701 14.8304 3.55651C14.8311 3.78958 14.8624 4.02156 14.9234 4.24651L14.9249 4.24801Z" fill="#1D1D1B" />
                                    </svg>
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.828 0.721986C8.89371 0.721868 8.95879 0.734702 9.01954 0.759754C9.08028 0.784806 9.13549 0.821584 9.182 0.867986L14.132 5.81799C14.2257 5.91175 14.2784 6.0389 14.2784 6.17149C14.2784 6.30407 14.2257 6.43122 14.132 6.52499C13.652 7.00499 13.06 7.11299 12.629 7.11299C12.452 7.11299 12.294 7.09499 12.169 7.07399L9.035 10.208C9.11751 10.5404 9.17104 10.8793 9.195 11.221C9.241 11.923 9.16301 12.908 8.47501 13.596C8.38124 13.6897 8.25409 13.7424 8.1215 13.7424C7.98892 13.7424 7.86177 13.6897 7.768 13.596L4.939 10.768L1.757 13.95C1.562 14.145 0.538004 14.852 0.343004 14.657C0.148004 14.462 0.855004 13.437 1.05 13.243L4.232 10.061L1.404 7.23199C1.31027 7.13822 1.25761 7.01107 1.25761 6.87849C1.25761 6.7459 1.31027 6.61875 1.404 6.52499C2.092 5.83699 3.077 5.75799 3.779 5.80499C4.12066 5.82893 4.4596 5.88246 4.792 5.96499L7.926 2.83199C7.89985 2.6797 7.88647 2.5255 7.886 2.37099C7.886 1.94099 7.99401 1.34899 8.47501 0.867986C8.56871 0.774517 8.69565 0.722014 8.828 0.721986V0.721986Z" fill="#1D1D1B" />
                                    </svg>
                                )}
                            </span>
                            <button
                                className={styles.done}
                                onFocus={() => setShowInput(true)}
                                type="submit"
                                tabIndex={0}
                                disabled={!inputBody && !inputTitle}
                            >
                                Done
                            </button>

                        </div>
                    ) : (<div></div>)
                }
            </form>
        </div>
    )
}
export default AddNote
