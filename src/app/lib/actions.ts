import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  or,
  query,
  setDoc,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db, auth } from "@/app/scripts/firebase";
import { FormSchema } from "@/app/types/Forms";
import { ICityData, IUserData, UserType } from "@/app/types/User";
import { INoticeData } from "@/app/types/Notice";
import {
  IMessageBaseMeta,
  IMessageData,
  MessageStatus,
} from "@/app/types/Message";
import { normalizeFirebaseError } from "@/app/lib/validation";
import { DEFAULT_ERROR_MESSAGE } from "@/app/lib/constans";

const userRegistrationSchema = {
  email: "",
  password: "",
  displayName: "",
  type: "",
};

const userProfileSchema = {
  city: "",
  firstname: "",
  lastname: "",
  displayName: "",
  animals: [],
  summary: "",
  description: "",
  skills: "",
};

const noticeSchema = {
  animal: "",
  city: "",
  createdAt: "",
  title: "",
  description: "",
  ownerId: "",
  startDate: "",
  endDate: "",
  status: "",
};

const messageSchema = {
  authorId: "",
  message: "",
  noticeId: "",
  receiverId: "",
  status: MessageStatus.PENDING,
};

export async function registerUser(prevState: any, formData: FormData) {
  let state = { success: false, error: false, message: "" };

  try {
    // get data filled in registration form
    const values = mapValuesToSchema(userRegistrationSchema, formData);

    // validate if obligatory fields has values
    if (
      typeof values.email !== "string" ||
      !values.email.length ||
      typeof values.password !== "string" ||
      !values.password.length
    )
      return {
        success: false,
        error: true,
        message: "Proszę podać adres e-mail oraz hasło",
      };

    // send basic user credentials (email & password) to Firebase
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // after creating new user, save his additional data in users collection
        await setDoc(doc(db, "users", user.uid), {
          displayName: values.displayName,
          email: values.email,
          offerHistory: [],
          rating: [],
          type: values.type,
        });

        state = {
          success: true,
          error: false,
          message: "Pomyślnie założono konto.",
        };
      })
      .catch((error) => {
        state = {
          success: false,
          error: true,
          message: normalizeFirebaseError(error),
        };
      });
  } catch (error) {
    // pass error message to display on form
    state = {
      success: false,
      error: true,
      message: DEFAULT_ERROR_MESSAGE,
    };
  }

  return state;
}

export async function authenticate(prevState: any, formData: FormData) {
  const state = { isLoggedIn: false, message: "" };

  try {
    // get data filled in login form
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // validate if obligatory fields has values
    if (!email || !password)
      return {
        isLoggedIn: false,
        message: "Proszę podać adres e-mail oraz hasło.",
      };

    await setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        state.isLoggedIn = true;
        state.message = "Zalogowano pomyślnie";
      })
      .catch((error) => {
        state.message = normalizeFirebaseError(error);
      });
  } catch (error) {
    // pass error message to display on form
    state.message = DEFAULT_ERROR_MESSAGE;
  }

  return state;
}

export async function getUser(uid: string) {
  try {
    // get user from Firebase with auth
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();

      return { status: "success", data };
    } else {
      return {
        status: "error",
        message: "Użytkownik nie istnieje w naszym systemie.",
        data: {},
      };
    }
  } catch (error) {
    return {
      status: "error",
      message: DEFAULT_ERROR_MESSAGE,
      data: {},
    };
  }
}

async function getUserContactInfo(uid: string) {
  try {
    // get user from Firebase with auth
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      const { displayName, email } = data || {};

      return { displayName, email };
    }
  } catch (error) {
    // internal function - no need to display message
    return {};
  }
}

export async function updateUserProfile(
  uid: string,
  prevState: any,
  formData: FormData
) {
  const values = mapValuesToSchema(userProfileSchema, formData);
  const { city } = values;

  try {
    // Save user details
    const usersRef = doc(db, "users", uid);

    await setDoc(usersRef, values, { merge: true });

    // Save new city to filters
    if (typeof city === "string" && city.length) {
      const normalizedCityName = replacePolishCharacters(city).toLowerCase();
      const citiesRef = doc(db, "cities", normalizedCityName);
      const docSnap = await getDoc(citiesRef);

      // Check if city is already added to collection
      if (!docSnap.exists()) {
        await setDoc(citiesRef, { value: city, label: city });
      }
    }
  } catch (error) {
    console.log(error);
    return { ...prevState, error: true };
  }

  return { ...prevState, success: true };
}

export async function saveToBucket(
  uid: string,
  prevState: any,
  formData: FormData
) {
  const file = formData.get("photo") as File;

  if (!file.size) return { ...prevState, error: true };

  const storage = getStorage();
  const storageRef = ref(storage, `userAvatars/${uid}`);

  uploadBytes(storageRef, file)
    .then(() => {
      getDownloadURL(ref(storage, `userAvatars/${uid}`)).then((url) => {
        const usersRef = doc(db, "users", uid);

        setDoc(usersRef, { photo: url }, { merge: true });
      });
    })
    .catch(() => {
      return { ...prevState, error: true };
    });

  return { ...prevState, success: true };
}

export async function addNotice(
  uid: string,
  prevState: any,
  formData: FormData
) {
  formData.set("ownerId", uid);
  formData.set("createdAt", new Date().getTime().toString());
  formData.set("status", "notaccepted"); // Set the status field in the formData

  const values = mapValuesToSchema(noticeSchema, formData);
  const { city } = values;

  try {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "notices"), values);

    if (typeof city === "string" && city.length) {
      const normalizedCityName = replacePolishCharacters(city).toLowerCase();
      const citiesRef = doc(db, "cities", normalizedCityName);
      const docSnap = await getDoc(citiesRef);

      // Check if city is already added to collection
      if (!docSnap.exists()) {
        await setDoc(citiesRef, { value: city, label: city });
      }
    }
  } catch (error) {
    return { ...prevState, error: true };
  }

  return { ...prevState, success: true };
}

export async function getPetsittersList(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  const data: IUserData[] = [];
  const constraints = [where("type", "==", UserType.PETSITTER)];
  const { city: cityFilter, animal: animalFilter } = searchParams;

  if (cityFilter) constraints.push(where("city", "==", cityFilter));
  if (animalFilter)
    constraints.push(where("animals", "array-contains", animalFilter));

  try {
    const q = query(collection(db, "users"), ...constraints);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const petsitterData = doc.data() as IUserData;

      data.push({
        ...petsitterData,
        id: doc.id,
      });
    });
  } catch (error) {
    console.error(error);
  }

  return data;
}

export async function getNoticesList(
  searchParams: {
    [key: string]: string | string[] | undefined;
  },
  onlyNotAccepted?: boolean
) {
  const data: INoticeData[] = [];
  const constraints = [];
  const { city: cityFilter, animal: animalFilter } = searchParams;

  if (cityFilter) constraints.push(where("city", "==", cityFilter));

  if (animalFilter) constraints.push(where("animal", "==", animalFilter));

  if (onlyNotAccepted) {
    constraints.push(where("status", "==", "notaccepted"));
  } else {
    constraints.push(where("status", "==", "approved"));
  }

  const q = query(collection(db, "notices"), ...constraints);

  try {
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const noticesData = doc.data() as INoticeData;

      data.push({
        ...noticesData,
        id: doc.id,
      });
    });
  } catch (error) {
    console.error(error);
  }

  return data;
}

export async function acceptNotice(uid: string) {
  try {
    const noticeRef = doc(db, "notices", uid);
    await updateDoc(noticeRef, {
      status: "approved",
    });
    console.log("succes accepting note" + uid);
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
}

async function getNoticeTitle(uid: string) {
  try {
    const noticeRef = doc(db, "notices", uid);
    const noticeSnap = await getDoc(noticeRef);

    if (noticeSnap.exists()) {
      const data = noticeSnap.data();

      return data.title;
    }
  } catch (error) {
    // internal function - no need to display message
    return {};
  }
}

export async function getCities() {
  const data: ICityData[] = [];

  try {
    const querySnapshot = await getDocs(collection(db, "cities"));

    querySnapshot.forEach((doc) => {
      const citiesData = doc.data() as ICityData;

      data.push(citiesData);
    });
  } catch (error) {
    console.error(error);
  }

  return data;
}

export async function getMessages(uid: string) {
  const data: { sent: IMessageData[]; received: IMessageData[] } = {
    sent: [],
    received: [],
  };
  const constraints = [
    where("authorId", "==", uid),
    where("receiverId", "==", uid),
  ];

  try {
    const q = query(collection(db, "messages"), or(...constraints));
    const querySnapshot = await getDocs(q);

    for await (const doc of querySnapshot.docs) {
      const messageData = doc.data() as IMessageBaseMeta;
      const { authorId, noticeId, receiverId } = messageData;

      const { displayName: authorDisplayName, email: authorEmail } =
        (await getUserContactInfo(authorId)) || {};
      const noticeTitle = noticeId && (await getNoticeTitle(noticeId));

      if (receiverId === uid) {
        data.received.push({
          ...messageData,
          authorDisplayName,
          authorEmail,
          id: doc.id,
          noticeTitle,
        } as IMessageData);
      } else if (authorId === uid) {
        data.sent.push({
          ...messageData,
          authorDisplayName,
          authorEmail,
          id: doc.id,
          noticeTitle,
        } as IMessageData);
      }
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function sendMessage(
  data: IMessageBaseMeta,
  prevState: any,
  formData: FormData
) {
  const { authorId, noticeId, receiverId, status } = data;

  formData.set("authorId", authorId);
  formData.set("noticeId", noticeId || "");
  formData.set("receiverId", receiverId);
  formData.set("status", status);

  const values = mapValuesToSchema(messageSchema, formData);

  try {
    // Add a new document with a generated id.
    await addDoc(collection(db, "messages"), values);

    // Add message to offer history, so petsitter won't answer to same notice twice
    if (noticeId) addToOfferHistory(authorId, noticeId);

    // revalidatePath("/noticeboard/notices");

    return { ...prevState, success: true, error: false };
  } catch (error) {
    console.log(error);
    return { ...prevState, success: false, error: true };
  }
}

async function addToOfferHistory(userId: string, noticeId: string) {
  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, {
    offerHistory: arrayUnion(noticeId),
  });
}

export async function addRatingPoints(userId: string, points: number[]) {
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, {
      rating: points,
    });

    return { success: true, error: false };
  } catch (error) {
    return { success: false, error: true };
  }
}

export async function rejectOffer(uid: string) {
  // TODO: Maybe add rejected status instead of deleting message from database?
  try {
    await deleteDoc(doc(db, "messages", uid));
  } catch (error) {
    console.error(error);
  }
}

export async function acceptOffer(uid: string) {
  try {
    const messagesRef = doc(db, "messages", uid);

    await updateDoc(messagesRef, { status: "accepted" });
  } catch (error) {
    console.error(error);
  }
}

const mapValuesToSchema = (schema: FormSchema, formData: FormData) => {
  const values = { ...schema };

  for (let field in schema) {
    if (Array.isArray(schema[field as keyof typeof schema])) {
      values[field] = formData.getAll(field) as string[];
    } else {
      values[field] = formData.get(field) as string;
    }
  }

  return values;
};

const replacePolishCharacters = (inputString: string) => {
  const polishChars = {
    ą: "a",
    ć: "c",
    ę: "e",
    ł: "l",
    ń: "n",
    ó: "o",
    ś: "s",
    ź: "z",
    ż: "z",
  };

  return inputString.replace(
    /[ąćęłńóśźż]/g,
    (match) => polishChars[match as keyof typeof polishChars] || match
  );
};
