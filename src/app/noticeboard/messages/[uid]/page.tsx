import { getMessages } from "@/app/lib/actions";
import MessagesList from "@/app/ui/messages/messagesList/messagesList";

export default async function Page({ params }: { params: { uid: string } }) {
  const uid = params.uid;
  const messages = await getMessages(uid);
  const { sent, received } = messages || {};

  return (
    <section>
      <header>
        <h1>Wiadomości</h1>
      </header>
      <div>
        <h2>Odebrane</h2>
        {!received?.length && (
          <p>Nie masz jeszcze żadnych odebranych wiadomości. :(</p>
        )}
        {received?.length ? <MessagesList initialMessages={received} /> : null}
      </div>
      <div>
        <h2>Wysłane</h2>
        {!sent?.length && (
          <p>Nie masz jeszcze żadnych wysłanych wiadomości. :(</p>
        )}
        {sent?.length ? <MessagesList initialMessages={sent} /> : null}
      </div>
    </section>
  );
}
