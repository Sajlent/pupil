"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import Link from "next/link";

import { useAuthContext, useNotificationContext } from "@/app/providers";
import { addNotice } from "@/app/lib/actions";
import { navigate } from "@/app/lib/navigate";
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

import styles from "./noticesAdd.module.scss";

const initialState = {};

export default function Page() {
  const { currentUser } = useAuthContext();
  const { setNotification } = useNotificationContext();
  const addNoticeWithOwnerId = addNotice.bind(null, currentUser?.uid || "");
  const [status, formAction] = useFormState(addNoticeWithOwnerId, initialState);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [endDateError, setEndDateError] = useState<string>("");

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    // Reset endDate if startDate is changed to a date after the current endDate
    if (new Date(newStartDate) > new Date(endDate)) {
      setEndDate("");
      setEndDateError(""); // Reset error message
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    // Only set endDate if it is after or on the same day as startDate
    if (new Date(newEndDate) >= new Date(startDate)) {
      setEndDate(newEndDate);
      setEndDateError(""); // Clear error message
    } else {
      setEndDateError(
        "Data zakończenia nie może być wcześniejsza niż data rozpoczęcia"
      );
    }
  };

  useEffect(() => {
    if (status.success) {
      setNotification({
        text: "Pomyślnie dodano ogłoszenie.",
        type: NotificationTypes.SUCCESS,
      });

      navigate("/noticeboard/notices");
    } else if (status.error) {
      setNotification({
        text: DEFAULT_ERROR_MESSAGE,
        type: NotificationTypes.ERROR,
      });
    }
  }, [setNotification, status]);

  return (
    <section className={styles.root}>
      <span></span>
      <div className={styles.leftPanel}>
        <h1 className={styles.heading}>Dodaj nowe ogłoszenie</h1>

        <Image
          src={"/images/formularz.jpg"}
          width={600}
          height={400}
          alt="form_image"
        />
        <p className={styles.description}>
          Dodaj ogłoszenie, aby ktoś mógł się zaopiekować Twoim zwierzakiem.
          Nasi opiekunowie to sprawdzeni profesjonaliści, którzy zapewnią
          Twojemu pupilowi najlepszą opiekę. Wypełnij formularz, aby zgłosić
          potrzeby swojego zwierzaka, a my pomożemy Ci znaleźć idealnego
          opiekuna. Opisz szczegóły dotyczące opieki, takie jak terminy, miejsce
          oraz szczególne wymagania Twojego pupila.
        </p>
        <Link href={"/noticeboard/notices"}>
          <Button
            type={ButtonTypes.BUTTON}
            label="Powrót do ogłoszeń"
            title="Powrót do ogłoszeń"
          />
        </Link>
      </div>

      <div className={styles.rightPanel}>
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
            <div className={styles.date__box}>
              <Datepicker
                id="startDate"
                name="startDate"
                label="Data rozpoczęcia"
                required
                value={startDate}
                onChange={handleStartDateChange}
              />
              <Datepicker
                id="endDate"
                name="endDate"
                label="Data zakończenia"
                required
                value={endDate}
                min={startDate} // Set min date for endDate to startDate
                onChange={handleEndDateChange}
              />
              {endDateError && (
                <div className={styles.error}>{endDateError}</div>
              )}
            </div>
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
      </div>
    </section>
  );
}
