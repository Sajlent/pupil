"use client";

import { useFormState } from "react-dom";
import Image from "next/image";
import Link from "next/link";

import { authenticate } from "@/app/lib/actions";

import Input from "@/app/ui/forms/input/input";
import Button from "@/app/ui/forms/button/button";

import { ButtonTypes } from "@/app/types/Forms";

import styles from "./page.module.scss";

const initialState = {
  isLoggedIn: false,
  message: "",
};

export default function Home() {
  const [state, formAction] = useFormState(authenticate, initialState);

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <Image src="/images/cat.jpg" width={128} height={128} alt="Cat" />
        <h1 className={styles.heading}>The best petsitter app!</h1>
        {state.isLoggedIn ? (
          <>
            <p>{state.message}</p>
            <p>
              Przejdź do <Link href={"/noticeboard"}>Strony głównej</Link>
            </p>
          </>
        ) : (
          <>
            <form action={formAction} className={styles.form}>
              <fieldset>
                <legend className={styles.form__legend}>Logowanie</legend>
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
              </fieldset>
              <Button
                type={ButtonTypes.SUBMIT}
                label="Zaloguj się"
                title="Zaloguj się"
              />
              <p aria-live="polite" role="status" className={styles.error}>
                {state.message}
              </p>
            </form>
            <p>
              Nie masz konta?
              <br />
              <Link href={"/auth"}>Zarejestruj się!</Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
