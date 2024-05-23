import { UserType } from "@/app/types/User";
import { MessageType } from "@/app/types/Message";

const getAcceptedOfferText = (
  userType: UserType,
  messageType: MessageType,
  contactEmail: string
) => {
  if (userType === UserType.PETOWNER && messageType === MessageType.RECEIVED) {
    return "Oferta zaakceptowana. Petsitter skontaktuje się z Tobą mailowo w celu ustalenia szczegółów.";
  } else if (
    userType === UserType.PETOWNER &&
    messageType === MessageType.SENT
  ) {
    return `Petsitter zaakceptował Twoją ofertę. Skontaktuj się z nim pod adresem: ${contactEmail}`;
  } else if (
    userType === UserType.PETSITTER &&
    messageType === MessageType.RECEIVED
  ) {
    return "Oferta zaakceptowana. Właściciel skontaktuje się z Tobą mailowo w celu ustalenia szczegółów.";
  } else if (
    userType === UserType.PETSITTER &&
    messageType === MessageType.SENT
  ) {
    return `Właściciel zwierzęcia zaakceptował Twoje zgłoszenie. Skontaktuj się z nim pod adresem: ${contactEmail}`;
  }

  return "";
};

export default getAcceptedOfferText;
