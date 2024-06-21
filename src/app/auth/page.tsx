"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import Image from "next/image";

import { registerUser } from "@/app/lib/actions";
import Button from "@/app/ui/forms/button/button";
import Input from "@/app/ui/forms/input/input";
import RadioGroup from "@/app/ui/forms/radioGroup/radioGroup";
import Loader from "@/app/ui/forms/loader/loader";

import { ButtonTypes } from "@/app/types/Forms";
import { UserType } from "@/app/types/User";

import styles from "./loginForm.module.scss";

const initialState = {
  success: false,
  error: false,
  message: "",
};

const userTypesSchema = [
  {
    id: UserType.PETSITTER,
    value: UserType.PETSITTER,
    label: "opiekun",
  },
  {
    id: UserType.PETOWNER,
    value: UserType.PETOWNER,
    label: "właściciel",
  },
];

export default function Page() {
  const [state, formAction] = useFormState(registerUser, initialState);
  const { pending } = useFormStatus();

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <div className={styles.container__left_side}>
          <Image
            src="/images/dwa-koty.jpg"
            width={400}
            height={320}
            alt="Cats"
          />
          {state.success && (
            <div className={styles.container__left_side__description}>
              <p>{state.message}</p>

              <Link href="/noticeboard/">
                <Button
                  type={ButtonTypes.BUTTON}
                  title="Strona główna"
                  label="Strona główna"
                />
              </Link>
            </div>
          )}
        </div>
        {!state.success && (
          <div className={styles.container__right_side}>
            <form action={formAction} className={styles.form}>
              <fieldset>
                <legend className={styles.form__legend}>Rejestracja</legend>
                <Input
                  id="email"
                  label="E-mail"
                  name="email"
                  type="email"
                  required
                />
                <Input
                  id="password"
                  label="Hasło"
                  name="password"
                  type="password"
                  required
                />
                <Input
                  id="displayName"
                  label="Nazwa użytkownika"
                  name="displayName"
                  type="text"
                  required
                />
              </fieldset>
              <RadioGroup
                name="type"
                fields={userTypesSchema}
                legend="Wybierz rodzaj użytkownika:"
                required
              />
              <Button
                type={ButtonTypes.SUBMIT}
                label="Zarejestruj się"
                title="Zarejestruj się"
                disabled={pending}
              />
              <Loader />
              <p aria-live="polite" role="status" className={styles.error}>
                {state.message}
              </p>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
