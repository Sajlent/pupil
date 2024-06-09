import { FC } from "react";

import { ButtonTypes, ButtonVariants } from "@/app/types/Forms";
import Image from "next/image";

import styles from "./button.module.scss";

interface IButtonProps {
  type: ButtonTypes;
  title: string;
  label?: string;
  icon?: string;
  image?: string;
  disabled?: boolean;
  variant?: ButtonVariants;
  additionalStyles?: string;
  isActive?: boolean;
  messageBtn?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button: FC<IButtonProps> = ({
  title,
  type,
  label = null,
  icon = null,
  image = null,
  disabled = false,
  variant = ButtonVariants.PRIMARY,
  additionalStyles = "",
  isActive = false,
  messageBtn = false,
  onClick,
}) => {
  const variantClass = variant
    ? styles[`button--${variant}`]
    : styles[`button--primary`];

  const activeClass = isActive
    ? styles[`button--active`]
    : styles[`button--no-active`];
  return (
    <button
      className={`${styles.button} ${variantClass} ${additionalStyles} ${messageBtn && activeClass}`}
      title={title}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <i className={`lnr lnr-${icon}`} />}
      {image && <Image src={`${image}`} width={30} height={30} alt={"icons"} />}
      {label && label}
    </button>
  );
};

export default Button;
