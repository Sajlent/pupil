import { useAuthContext } from "@/app/providers";

import Button from "@/app/ui/forms/button/button";
import { ButtonTypes } from "@/app/types/Forms";
import Input from "@/app/ui/forms/input/input";
import { FC } from "react";

interface ISendMessageFormProps {
  receiverId: string;
  title: string;
}

const SendMessageForm: FC<ISendMessageFormProps> = ({ receiverId, title }) => {
  const { currentUser } = useAuthContext();
  // TODO: Handle actions
  // const sendMessageWithAuthorId = sendMessage.bind(null, currentUser?.uid || "");

  return (
    <form>
      <h3>
        Zgłaszasz się na ogłoszenie:
        <br />
        {title}
      </h3>
      <fieldset>
        odbiorca: {receiverId}
        <Input
          id="message"
          label="Wiadomość"
          name="message"
          type="textarea"
          required
        />
      </fieldset>

      <Button type={ButtonTypes.SUBMIT} label="Wyślij" title="Wyślij" />
    </form>
  );
};

export default SendMessageForm;
