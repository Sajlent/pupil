import { FirebaseError } from "firebase/app";

export const normalizeFirebaseError = (error: unknown) => {
  console.log("error", error);

  if (typeof error !== "object") return "Wystąpił błąd.";

  const { code } = error as FirebaseError;

  switch (code) {
    case "auth/invalid-credential":
      return "Podano błędne dane logowania.";
    case "auth/email-already-in-use":
      return "Użytkownik z podanym adresem e-mail jest już zarejestrowany w aplikacji.";
    case "auth/weak-password":
      return "Hasło powinno składać się z minimum 6 znaków.";
    default:
      return "Wystąpił błąd.";
  }
};
