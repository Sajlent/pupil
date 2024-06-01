"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";

import { useAuthContext, useNotificationContext } from "@/app/providers";
import { addNotice } from "@/app/lib/actions";
import {
  DEFAULT_ERROR_MESSAGE,
  animalsOptionsSchema,
} from "@/app/lib/constans";
import Input from "@/app/ui/forms/input/input";
import Select from "@/app/ui/forms/select/select";
import Button from "@/app/ui/forms/button/button";
import { ButtonTypes, NotificationTypes } from "@/app/types/Forms";
import Datepicker from "@/app/ui/forms/datepicker/datepicker";
import Loader from "@/app/ui/forms/loader/loader";

import styles from "../notices.module.scss";

const initialState = {};

export default function Page() {
  const { currentUser } = useAuthContext();
  const { setNotification } = useNotificationContext();
  const addNoticeWithOwnerId = addNotice.bind(null, currentUser?.uid || "");
  const [status, formAction] = useFormState(addNoticeWithOwnerId, initialState);

  useEffect(() => {
    if (status.success) {
      setNotification({
        text: "Pomyślnie dodano ogłoszenie.",
        type: NotificationTypes.SUCCESS,
      });
    } else if (status.error) {
      setNotification({
        text: DEFAULT_ERROR_MESSAGE,
        type: NotificationTypes.ERROR,
      });
    }
  }, [setNotification, status]);

  return (
    <section className={styles.root}>
      <header>
        <h1 className={styles.heading}>Dodaj nowe ogłoszenie</h1>
      </header>

      <form className={styles.form} action={formAction}>
        <fieldset className={styles.form__fieldset}>
          <Input
            id="title"
            label="Tytuł ogłoszenia"
            name="title"
            type="text"
            required
          />
          <Input id="city" label="Miasto" name="city" type="text" required />
          <Datepicker
            id="startDate"
            name="startDate"
            label="Data rozpoczęcia"
            required
          />
          <Datepicker
            id="endDate"
            name="endDate"
            label="Data zakończenia"
            required
          />
          <Select
            id="animal"
            label="Do jakiego gatunku należy Twój pupil?"
            name="animal"
            options={animalsOptionsSchema}
            required
          />
        </fieldset>
        <fieldset className={styles.form__fieldset}>
          <Input
            id="description"
            label="Opis"
            name="description"
            type="textarea"
            placeholder="Opisz potrzeby swojego pupila..."
          />
        </fieldset>
        <Button
          type={ButtonTypes.SUBMIT}
          label="Dodaj ogłoszenie"
          title="Dodaj ogłoszenie"
        />
        <Loader />
      </form>
    </section>
  );
}
