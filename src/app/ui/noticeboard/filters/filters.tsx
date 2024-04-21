"use client";

import { ChangeEvent, FC, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Select from "@/app/ui/forms/select/select";

import styles from "./filters.module.scss";

interface IFiltersProps {
  config: {
    id: string;
    label: string;
    options: {
      label: string;
      value: string;
    }[];
  }[];
}

const Filters: FC<IFiltersProps> = ({ config }) => {
  const filtersRef = useRef<HTMLFormElement>(null!);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const initialParams = new URLSearchParams(searchParams);

  if (!Array.isArray(config)) return null;

  const handleFilterChange = (event: ChangeEvent) => {
    const params = new URLSearchParams(searchParams);
    const filterElement = event.currentTarget as HTMLSelectElement;
    const { id, value } = filterElement;

    if (value) {
      params.set(id, value);
    } else {
      params.delete(id);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  if (filtersRef.current && initialParams.size === 0) {
    filtersRef.current.reset();
  }

  return (
    <form ref={filtersRef}>
      <h3>Wyszukaj</h3>
      {config.map((filter) => (
        <div className={styles.filter} key={filter.id}>
          <Select
            defaultValue={initialParams.get(filter.id) || ""}
            id={filter.id}
            label={""}
            placeholder={filter.label}
            name={filter.id}
            options={filter.options}
            onChange={handleFilterChange}
          />
        </div>
      ))}
    </form>
  );
};

export default Filters;
