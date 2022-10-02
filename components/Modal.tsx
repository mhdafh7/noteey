
import { useRef, useState } from "react"
import styles from "../styles/Modal.module.scss"

const Modal = ({ id, title, body, isPinned, showModal, setShowModal }) => {

  const [modalTitle, setModalTitle] = useState(title)
  const [modalBody, setModalBody] = useState(body)

  const modalRef = useRef()

  // remove todo
  const removeTodo = () => { }

  // update todo
  const updateTodo = () => { }

  // close modal
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false)
      updateTodo()
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    updateTodo()
    setShowModal(false)
  }

  const handleTitleChange = (e) => {
    setModalTitle(e.target.value)
  }

  const handleBodyChange = (e) => {
    setModalBody(e.target.value)
  }

  return (
    <>
      {showModal ? (
        <div className={styles.contaier} onClick={closeModal}>
          <main>
            <form onSubmit={handleSubmit}>
              <span></span>
              <input type="text" placeholder="Title" onChange={handleTitleChange} value={modalTitle} />
              <textarea cols={20} rows={6} onChange={handleBodyChange} value={modalBody} />
              <div className={styles.toolBar}>
                <span className={styles.delete}></span>
                <button type="submit" className={styles.submit}>Done</button>
              </div>
            </form>
          </main>
        </div>
      ) : null}
    </>
  )
}
export default Modal