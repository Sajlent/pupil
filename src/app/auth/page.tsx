'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { registerUser } from '@/app/lib/actions';
import Button from '@/app/ui/forms/button/button';
import Input from '@/app/ui/forms/input/input';
import RadioGroup from '@/app/ui/forms/radioGroup/radioGroup';

import { ButtonTypes } from '@/app/types/Forms';
import { UserType } from '@/app/types/User';

import styles from './loginForm.module.scss';

const initialState = {
  message: '',
};

const userTypesSchema = [
  {
    id: UserType.PETSITTER,
    value: UserType.PETSITTER,
    label: 'opiekun',
  },
  {
    id: UserType.PETOWNER,
    value: UserType.PETOWNER,
    label: 'właściciel',
  },
];

export default function Page() {
  const { register } = useForm();
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
              register={register}
            />
            <Input
              id="password"
              label="Hasło"
              name="password"
              type="password"
              register={register}
            />
            <Input
              id="displayName"
              label="Nazwa użytkownika"
              name="displayName"
              type="displayName"
              register={register}
            />
          </fieldset>
          <RadioGroup
            name="type"
            fields={userTypesSchema}
            legend="Wybierz rodzaj użytkownika:"
          />
          <Button type={ButtonTypes.SUBMIT} label="Zarejestruj się" />
          <p aria-live="polite" role="status">
            {state?.message}
          </p>
        </form>
      </div>
    </main>
  );
}
