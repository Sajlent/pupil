import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '@/app/scripts/firebase';

const userRegistrationSchema = {
  email: '',
  password: '',
  displayName: '',
  type: '',
};

export async function registerUser(prevState: any, formData: FormData) {
  try {
    // get data filled in registration form
    for (let field in userRegistrationSchema) {
      // @ts-ignore
      userRegistrationSchema[field] = formData.get(field);
    }

    console.log('userRegistrationSchema', userRegistrationSchema);

    // validate if obligatory fields has values
    // TODO: Better validation, e.g. password length
    if (
      !userRegistrationSchema.email.length ||
      !userRegistrationSchema.password.length
    )
      return { message: 'Proszę podać adres e-mail oraz hasło' };

    // send basic user credentials (email & password) to Firebase
    createUserWithEmailAndPassword(
      auth,
      userRegistrationSchema.email,
      userRegistrationSchema.password
    )
      .then((userCredential) => {
        const user = userCredential.user;

        // after creating new user, save his additional data in users collection
        setDoc(doc(db, 'users', user.uid), {
          displayName: userRegistrationSchema.displayName,
          type: userRegistrationSchema.type,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Already used email is handled by Firebase - it returns message: "EMAIL_EXISTS"

        console.error(errorCode + ' ' + errorMessage);
      });
  } catch (error) {
    // pass error message to display on form
    return { message: 'Wystąpił błąd.' };
  }

  // TODO: handle Firebase
  return { message: 'Pomyślnie założono konto.' };
}

export async function authenticate(prevState: any, formData: FormData) {
  const state = { isLoggedIn: false, message: '' };
  try {
    // get data filled in login form
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // validate if obligatory fields has values
    if (!email || !password)
      return {
        isLoggedIn: false,
        message: 'Proszę podać adres e-mail oraz hasło',
      };

    await setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        state.isLoggedIn = true;
        state.message = 'Zalogowano pomyślnie';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage);
        // TODO: handle wrong credentials
        state.message = errorMessage;
      });
  } catch (error) {
    // pass error message to display on form
    // return { message: 'Wystąpił błąd.' };
  }

  return state;
}

export async function getUser(uid: string) {
  try {
    // get user from Firebase with auth
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();

      return { ...data };
    }
  } catch (error) {
    // display error component
  }
}
