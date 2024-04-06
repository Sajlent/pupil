"use client";

import { useFormState } from "react-dom";
import Link from "next/link";

import { registerUser } from "@/app/lib/actions";
import Button from "@/app/ui/forms/button/button";
import Input from "@/app/ui/forms/input/input";
import RadioGroup from "@/app/ui/forms/radioGroup/radioGroup";

import { ButtonTypes } from "@/app/types/Forms";
import { UserType } from "@/app/types/User";

import styles from "./loginForm.module.scss";

const initialState = {
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

  return (
    <main className={styles.root}>
      <div className={styles.container}>
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
          />
          <Button
            type={ButtonTypes.SUBMIT}
            label="Zarejestruj się"
            title="Zarejestruj się"
          />
          <p
            aria-live="polite"
            role="status"
            className={`${styles.message} ${state.error ? styles["message--error"] : ""}`}
          >
            {state.message}
          </p>
        </form>
        <p>
          Przejdź do <Link href={"/noticeboard"}>Strony głównej</Link>
        </p>
      </div>
    </main>
  );
}
