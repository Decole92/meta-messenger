import { Message } from "../typings";
import InputChat from "./component/InputChat";
import MessageList from "./component/MessageList";
import { unstable_getServerSession } from "next-auth/next";
import { Providers } from "./component/providers";

async function HomePage() {
  const data = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`
  ).then((res) => res.json());

  const messages: Message[] = data.messages;

  const session = await unstable_getServerSession();

  return (
    <Providers session={session}>
      <MessageList initialMessage={messages} />
      <InputChat session={session} />
    </Providers>
  );
}

export default HomePage;
