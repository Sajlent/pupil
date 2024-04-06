"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

import { auth, db } from "@/app/scripts/firebase";
import { UserType } from "@/app/types/User";
import { NotificationTypes } from "./types/Forms";
interface ICurrentUser {
  email: string | null;
  displayName: string | null;
  uid: string;
  type: UserType;
}

interface IAuthContext {
  currentUser: ICurrentUser | null;
}

interface INotification {
  text: string;
  type: NotificationTypes;
}
interface INotificationContext {
  notification: INotification | null;
  setNotification: (notification: INotification | null) => void;
}

const AuthContext = createContext<IAuthContext>({
  currentUser: null,
});

const NotificationContext = createContext<INotificationContext>({
  notification: {
    text: "",
    type: NotificationTypes.INFO,
  },
  setNotification: () => {},
});

export function Providers({ children }: PropsWithChildren) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);
  const [notification, setNotification] = useState<INotification | null>(null);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Get default user data from Firebase API
      const { email, uid } = user;
      // Get additional user data from User collection
      // TODO: add enums for collection names
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        if (!currentUser) {
          setCurrentUser({
            email,
            displayName: userData.displayName,
            uid,
            type: userData.type,
          });

          // router.push('/noticeboard');
        }
      } else {
        // Sign in went wrong, there is no data for this user
      }

      // ...
    } else {
      // User is signed out
      // ...
      console.log("signed out in context");
    }
  });

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      <NotificationContext.Provider value={{ notification, setNotification }}>
        {children}
      </NotificationContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  if (!AuthContext) {
    throw new Error("AuthContext has to be used within <AuthContext.Provider>");
  }

  return useContext(AuthContext);
}

export function useNotificationContext() {
  if (!NotificationContext) {
    throw new Error(
      "NotificationContext has to be used within <AuthContext.Provider>"
    );
  }

  return useContext(NotificationContext);
}
