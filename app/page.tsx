import { Message } from '../typings';
import InputChat from './component/InputChat'
import MessageList from './component/MessageList';
import { unstable_getServerSession } from 'next-auth/next';
import { Providers } from './component/providers';

async function HomePage() {

const data = await fetch('https://meta-messenger-gm8b-2wlt4ztwt-decole92.vercel.app'/api/getMessages).then((res) => res.json());

const messages: Message[] = data.messages;

const session = await unstable_getServerSession();

return (
   <Providers session={session}>
    <div>
        <MessageList initialMessage={messages} />
        <InputChat session={session} />
     </div>
    </Providers>

  )
}

export default HomePage
