import { useEffect, useId } from "react";
import "./Modal.css";

/**
 * @typedef {Object} ModalProps
 * @property {boolean} [isOpen] показывать ли окно
 * @property {string} [title] заголовок окна
 * @property {() => void} [onClose] закрытие: крестик, клик на фон или Esc
 * @property {React.ReactNode} [children] содержимое окна
 */

/** @param {ModalProps} props */
function Modal({ isOpen = false, title = "", onClose = () => {}, children = null }) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Пока окно открыто, страница под ним не прокручивается
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal__close" type="button" aria-label="Close" onClick={onClose}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <h2 className="modal__title" id={titleId}>
          {title}
        </h2>

        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;