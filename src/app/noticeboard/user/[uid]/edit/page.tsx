"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import { getUser, updateUserProfile } from "@/app/lib/actions";
import {
  DEFAULT_ERROR_MESSAGE,
  animalsOptionsSchema,
} from "@/app/lib/constans";

import { useNotificationContext } from "@/app/providers";
import Button from "@/app/ui/forms/button/button";
import { ButtonTypes, NotificationTypes } from "@/app/types/Forms";
import Input from "@/app/ui/forms/input/input";
import Select from "@/app/ui/forms/select/select";
import UploadForm from "@/app/ui/noticeboard/uploadForm/uploadForm";
import Loader from "@/app/ui/forms/loader/loader";
import { IUserData } from "@/app/types/User";

import styles from "../user.module.scss";

const initialState = {};

export default function Page({ params }: { params: { uid: string } }) {
  const { setNotification } = useNotificationContext();
  const uid = params.uid;
  const updateUserProfileWithUid = updateUserProfile.bind(null, uid);
  const [profileDataStatus, formAction] = useFormState(
    updateUserProfileWithUid,
    initialState
  );
  const [data, setData] = useState<IUserData | null>(null);

  useEffect(() => {
    if (profileDataStatus.success) {
      setNotification({
        text: "Pomyślnie zapisano dane profilowe.",
        type: NotificationTypes.SUCCESS,
      });
    } else if (profileDataStatus.error) {
      setNotification({
        text: DEFAULT_ERROR_MESSAGE,
        type: NotificationTypes.ERROR,
      });
    }
  }, [profileDataStatus, setNotification]);

  useEffect(() => {
    getUser(uid).then((userData) => {
      if (userData?.status === "error" && userData.message) {
        setNotification({
          text: userData.message,
          type: NotificationTypes.ERROR,
        });
      } else if (userData.status === "success" && !data) {
        setData(userData.data as IUserData);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) return null;

  return (
    <section className={styles.section}>
      <header>
        <h1>Edytuj profil</h1>
      </header>
      <form action={formAction} className={styles.form}>
        <div className={styles.form__top}>
          <fieldset className={styles.form__fieldset}>
            <legend className={styles.form__legend}>Dane postawowe</legend>
            <Input
              id="firstname"
              label="Imię"
              name="firstname"
              defaultValue={data.firstname}
              type="text"
              required
            />
            <Input
              id="lastname"
              label="Nazwisko"
              name="lastname"
              defaultValue={data.lastname}
              type="text"
              required
            />
            <Input
              id="displayName"
              label="Nazwa użytkownika"
              name="displayName"
              defaultValue={data.displayName}
              type="text"
              required
            />
            <Input
              id="city"
              label="Miasto"
              name="city"
              defaultValue={data.city}
              type="text"
              required
            />
          </fieldset>
          <fieldset className={styles.form__fieldset}>
            <legend className={styles.form__legend}>Zwierzęta do opieki</legend>
            <Select
              id="animals"
              label="Wybierz gatunki"
              name="animals"
              defaultValue={data.animals || []}
              options={animalsOptionsSchema}
              multiple
            />
          </fieldset>
        </div>
        <fieldset className={styles.form__fieldset}>
          <legend className={styles.form__legend}>Dane opisowe</legend>
          <Input
            id="summary"
            label="Podsumowanie"
            name="summary"
            defaultValue={data.summary}
            type="text"
          />
          <Input
            id="description"
            label="Opis"
            name="description"
            defaultValue={data.description}
            type="textarea"
          />
          <Input
            id="skills"
            label="Umiejętności"
            name="skills"
            defaultValue={data.skills}
            type="textarea"
          />
        </fieldset>
        <Button
          type={ButtonTypes.SUBMIT}
          label="Zapisz zmiany"
          title="Zapisz zmiany"
        />
        <Loader />
      </form>
      <UploadForm uid={uid} />
    </section>
  );
}
