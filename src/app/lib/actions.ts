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
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db, auth } from "@/app/scripts/firebase";
import { FormSchema } from "@/app/types/Forms";
import { IUserData, UserType } from "@/app/types/User";
import { normalizeFirebaseError } from "@/app/lib/validation";

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
  title: "",
  description: "",
};

export async function registerUser(prevState: any, formData: FormData) {
  let state = { error: false, message: "" };

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
      return { error: true, message: "Proszę podać adres e-mail oraz hasło" };

    // send basic user credentials (email & password) to Firebase
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // after creating new user, save his additional data in users collection
        await setDoc(doc(db, "users", user.uid), {
          displayName: values.displayName,
          type: values.type,
        });

        state = { error: false, message: "Pomyślnie założono konto." };
      })
      .catch((error) => {
        state = {
          error: true,
          message: normalizeFirebaseError(error),
        };
      });
  } catch (error) {
    // pass error message to display on form
    state = {
      error: true,
      message: "Wystąpił błąd.",
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
    state.message = "Wystąpił błąd.";
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

      return data;
    }
  } catch (error) {
    // display error component
  }
}

export async function updateUserProfile(
  uid: string,
  prevState: any,
  formData: FormData
) {
  const values = mapValuesToSchema(userProfileSchema, formData);

  try {
    const usersRef = doc(db, "users", uid);

    setDoc(usersRef, values, { merge: true });
  } catch (error) {
    console.log(error);
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

  uploadBytes(storageRef, file).then(() => {
    getDownloadURL(ref(storage, `userAvatars/${uid}`)).then((url) => {
      const usersRef = doc(db, "users", uid);

      setDoc(usersRef, { photo: url }, { merge: true });
    });
  });

  return { ...prevState, success: true };
}

export async function addNotice(prevState: any, formData: FormData) {
  const values = mapValuesToSchema(noticeSchema, formData);

  try {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "notices"), values);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.log(error);
  }

  return { ...prevState, success: true };
}

export async function getPetsittersList(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  const data: IUserData[] = [];
  const constraints = [where("type", "==", UserType.PETSITTER)];
  const { city: cityFilter, animals: animalFilter } = searchParams;

  if (cityFilter) constraints.push(where("city", "==", cityFilter));
  if (animalFilter)
    constraints.push(where("animals", "array-contains", animalFilter));

  const q = query(collection(db, "users"), ...constraints);

  try {
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
