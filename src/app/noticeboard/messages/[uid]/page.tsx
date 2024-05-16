import { getMessages } from "@/app/lib/actions";
import MessagesList from "@/app/ui/messages/messagesList/messagesList";

export default async function Page({ params }: { params: { uid: string } }) {
  const uid = params.uid;
  const messages = await getMessages(uid);

  return (
    <section>
      <header>
        <h1>Wiadomości</h1>
        {!messages?.length && <p>Nie masz jeszcze żadnych wiadomości. :(</p>}
      </header>
      {messages?.length ? <MessagesList initialMessages={messages} /> : null}
    </section>
  );
}
