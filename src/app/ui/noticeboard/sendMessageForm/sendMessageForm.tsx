import { FC } from "react";
import { useFormState } from "react-dom";

import { useAuthContext } from "@/app/providers";
import { sendMessage } from "@/app/lib/actions";

import { ButtonTypes, ButtonVariants } from "@/app/types/Forms";
import { MessageStatus } from "@/app/types/Message";
import Input from "@/app/ui/forms/input/input";
import Button from "@/app/ui/forms/button/button";
import Loader from "@/app/ui/forms/loader/loader";

import styles from "./sendMessageForm.module.scss";

interface ISendMessageFormProps {
  noticeId?: string;
  receiverDisplayName?: string;
  receiverId: string;
  title?: string;
}

const initialState: any = {};

const SendMessageForm: FC<ISendMessageFormProps> = ({
  noticeId,
  receiverDisplayName,
  receiverId,
  title,
}) => {
  const { currentUser, setCurrentUser } = useAuthContext();
  const sendMessageWithIds = sendMessage.bind(null, {
    authorId: currentUser?.uid || "",
    receiverId,
    noticeId,
    status: MessageStatus.PENDING,
  });
  const [status, formAction] = useFormState(sendMessageWithIds, initialState);

  if (status.success) {
    // Optimistic update
    if (
      noticeId &&
      Array.isArray(currentUser?.offerHistory) &&
      !currentUser.offerHistory.includes(noticeId)
    ) {
      const updatedHistory = [...currentUser.offerHistory, noticeId];

      setCurrentUser({
        ...currentUser,
        offerHistory: updatedHistory,
      });
    }

    return (
      <div className={styles.info}>
        <i
          className={`${styles.info__icon} ${styles["info__icon--success"]} lnr lnr-checkmark-circle`}
        />
        <h3>Wiadomość wysłana poprawnie!</h3>
        <p>Oczekuj na akceptację adresata.</p>
      </div>
    );
  }

  if (status.error) {
    return (
      <div className={styles.info}>
        <i
          className={`${styles.info__icon} ${styles["info__icon--error"]} lnr lnr-warning`}
        />
        <h3>Wystąpił błąd</h3>
        <p>Prosimy spróbować później.</p>
      </div>
    );
  }

  return (
    <section>
      <header className={styles.header}>
        {noticeId && (
          <>
            <p role="doc-subtitle">Zgłaszasz się na ogłoszenie:</p>
            <h3>{title}</h3>
          </>
        )}
        {receiverDisplayName && (
          <>
            <p role="doc-subtitle">
              Wysyłasz prośbę o możliwość opieki do petsittera:
            </p>
            <h3>{receiverDisplayName}</h3>
          </>
        )}
      </header>
      <form action={formAction}>
        <fieldset>
          <Input
            id="message"
            label="Wiadomość"
            name="message"
            type="textarea"
            placeholder="Krótko opisz swoje warunki współpracy..."
            required
          />
        </fieldset>

        <Button
          variant={ButtonVariants.SECONDARY}
          type={ButtonTypes.SUBMIT}
          label="Wyślij wiadomość"
          title="Wyślij"
        />
        <Loader />
      </form>
    </section>
  );
};

export default SendMessageForm;
