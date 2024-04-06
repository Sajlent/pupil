"use client";

import { useFormState } from "react-dom";

import { addNotice } from "@/app/lib/actions";
import { animalsOptionsSchema } from "@/app/lib/constans";
import Input from "@/app/ui/forms/input/input";
import Select from "@/app/ui/forms/select/select";
import Button from "@/app/ui/forms/button/button";
import { ButtonTypes } from "@/app/types/Forms";

const initialState = {};

export default function Page() {
  const [status, formAction] = useFormState(addNotice, initialState);

  return (
    <section>
      <h1>Dodaj nowe ogłoszenie</h1>

      <form action={formAction}>
        <fieldset>
          <Input id="title" label="Tytuł" name="title" type="text" required />
          <Input id="city" label="Miasto" name="city" type="text" required />
          <Select
            id="animal"
            label="Zwierzę"
            name="animal"
            options={animalsOptionsSchema}
            required
          />
        </fieldset>
        <fieldset>
          <Input
            id="description"
            label="Opis"
            name="description"
            type="textarea"
          />
        </fieldset>
        <Button
          type={ButtonTypes.SUBMIT}
          label="Dodaj ogłoszenie"
          title="Dodaj ogłoszenie"
        />
      </form>
    </section>
  );
}
