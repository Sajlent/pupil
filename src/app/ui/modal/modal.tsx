import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  MouseEvent,
} from "react";
import { createPortal } from "react-dom";

import { useModalContext } from "@/app/providers";
import Button from "@/app/ui/forms/button/button";

import { ButtonTypes, ButtonVariants } from "@/app/types/Forms";

import styles from "./modal.module.scss";

interface IModalProps {}

const Modal: FC<PropsWithChildren<IModalProps>> = () => {
  const { modal, setModal } = useModalContext();
  const modalRef = useRef<HTMLDialogElement>(null);

  const closeModal = useCallback(() => {
    setModal({
      isOpen: false,
      content: null,
    });
  }, [setModal]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        // @ts-ignore
        !modalRef.current.contains(event.target)
      ) {
        closeModal();
      }
    };
    // @ts-ignore
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      // @ts-ignore
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [closeModal]);

  return createPortal(
    <div className={styles.root}>
      <dialog className={styles.modal} ref={modalRef} open={modal.isOpen}>
        <Button
          title="Zamknij"
          type={ButtonTypes.BUTTON}
          icon="cross"
          variant={ButtonVariants.ICON}
          onClick={closeModal}
          additionalStyles={styles.modal__close}
        />
        {modal.content}
      </dialog>
    </div>,
    document.body
  );
};

export default Modal;
