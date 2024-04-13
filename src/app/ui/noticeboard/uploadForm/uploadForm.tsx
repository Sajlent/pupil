import { FC, useEffect } from "react";
import { useFormState } from "react-dom";

import { useNotificationContext } from "@/app/providers";
import { saveToBucket } from "@/app/lib/actions";
import Button from "@/app/ui/forms/button/button";
import { ButtonTypes, NotificationTypes } from "@/app/types/Forms";
import Input from "@/app/ui/forms/input/input";

interface IUploadFormProps {
  uid: string;
}

const initialState = {
  error: false,
  success: false,
};

const UploadForm: FC<IUploadFormProps> = ({ uid }) => {
  const { setNotification } = useNotificationContext();
  const saveToBucketWithUid = saveToBucket.bind(null, uid);
  const [uploadFormStatus, uploadFormAction] = useFormState(
    saveToBucketWithUid,
    initialState
  );

  console.log("uploadFormStatus", uploadFormStatus);

  useEffect(() => {
    if (uploadFormStatus.success) {
      setNotification({
        text: "Pomyślnie zapisano zdjęcie",
        type: NotificationTypes.SUCCESS,
      });
    }
  }, [uploadFormStatus]);

  return (
    <form action={uploadFormAction}>
      <fieldset>
        <Input
          id="photo"
          label="Zdjęcie profilowe"
          name="photo"
          type="file"
          required
        />
      </fieldset>

      <Button
        type={ButtonTypes.SUBMIT}
        label={"Zapisz zdjęcie"}
        title="Zapisz zdjęcie"
      />
    </form>
  );
};

export default UploadForm;