import { FC } from "react";

import { ButtonTypes, ButtonVariants } from "@/app/types/Forms";

import styles from "./button.module.scss";

interface IButtonProps {
  type: ButtonTypes;
  title: string;
  label?: string;
  icon?: string;
  variant?: ButtonVariants;
  additionalStyles?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button: FC<IButtonProps> = ({
  title,
  type,
  label = null,
  icon = null,
  variant = ButtonVariants.PRIMARY,
  additionalStyles = "",
  onClick,
}) => {
  const variantClass = variant
    ? styles[`button--${variant}`]
    : styles[`button--primary`];

  return (
    <button
      className={`${styles.button} ${variantClass} ${additionalStyles}`}
      title={title}
      type={type}
      onClick={onClick}
    >
      {icon && <i className={`lnr lnr-${icon}`} />}
      {label && label}
    </button>
  );
};

export default Button;
