import { useUserContext } from "../../UserContext";
import styles from "./Modal.module.css";

function Modal({ isOpen, setIsOpen, children }) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {children}
        <div className={styles.modalClose}>
          <button onClick={closeModal}>close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
