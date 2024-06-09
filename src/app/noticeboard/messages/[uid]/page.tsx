"use client";

export const dynamic = "force-dynamic";

import styles from "./messages.module.scss";

import { useEffect, useState } from "react";
import { getMessages } from "@/app/lib/actions";
import MessagesList from "@/app/ui/messages/messagesList/messagesList";
import Button from "@/app/ui/forms/button/button";
import { ButtonTypes, NotificationTypes } from "@/app/types/Forms";

import Image from "next/image";

export default function Page({ params }: { params: { uid: string } }) {
  const [messages, setMessages] = useState<{ sent: any[]; received: any[] }>({
    sent: [],
    received: [],
  });
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const uid = params.uid;

  useEffect(() => {
    async function fetchMessages() {
      const messages = await getMessages(uid);
      setMessages(messages || { sent: [], received: [] });
    }
    fetchMessages();
  }, [uid]);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1>Wiadomości</h1>
      </header>
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <Button
            type={ButtonTypes.BUTTON}
            title="Odebrane"
            label="Odebrane"
            isActive={selectedTab}
            messageBtn={true}
            onClick={() => setSelectedTab((isActiveButton) => !isActiveButton)}
          />

          <Button
            type={ButtonTypes.BUTTON}
            title="Wysłane"
            label="Wysłane"
            isActive={!selectedTab}
            messageBtn={true}
            onClick={() => setSelectedTab((isActiveButton) => !isActiveButton)}
          />
        </aside>
        <main className={styles.main}>
          {selectedTab && (
            <div>
              <h2>Odebrane</h2>
              {!messages.received.length && (
                <>
                  <Image
                    src={"/images/no-msg.jpg"}
                    width={300}
                    height={150}
                    alt="No message imgae"
                  />
                  <p>Nie masz jeszcze żadnych odebranych wiadomości. :(</p>
                </>
              )}
              {messages.received.length ? (
                <MessagesList initialMessages={messages.received} />
              ) : null}
            </div>
          )}
          {!selectedTab && (
            <div>
              <h2>Wysłane</h2>
              {!messages.sent.length && (
                <>
                  <Image
                    src={"/images/no-msg.jpg"}
                    width={300}
                    height={150}
                    alt="No message imgae"
                  />
                  <p>Nie masz jeszcze żadnych wysłanych wiadomości. :(</p>
                </>
              )}
              {messages.sent.length ? (
                <MessagesList initialMessages={messages.sent} />
              ) : null}
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
