"use client"
import {FormEvent, useState} from 'react'
import useSWR from 'swr';
import {v4 as uuid} from 'uuid';
import fetcher from '../../lib/fetchMessages';
import { Message } from '../../typings';
import { unstable_getServerSession } from 'next-auth/next';

type Props = {
    session: any | Awaited<ReturnType<typeof unstable_getServerSession>>
 }

function InputChat({session}: Props) {

const [input, setInput] = useState("");
const {data:messages, error, mutate} = useSWR<Message[]>("/api/getMessages", fetcher);

//console.log(messages);

  const addMessage = async (e:FormEvent<HTMLFormElement>) => {
  e.preventDefault();
 
  if(!input || !session) return;

  const messageToSend = input;

  setInput("");


  const id = uuid();

  const message: Message = {
     id, 
    message:messageToSend,
    created_at: Date.now(),
    username: session.user?.name as string,
    profilePic: session.user?.image as string,
    email: session.user?.email as string,
}
 
  const uploadMessageToUpstash = async () => {


    const data = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body:JSON.stringify({
            message,
        }),
    }).then(res => res.json());

  return [data.message, ...messages!]

  
  };

  
await mutate(uploadMessageToUpstash, {
optimisticData: [message, ...messages!],
rollbackOnError: true,
})

};

return (
 <form onSubmit={addMessage} className='flex w-full bg-white px-10 py-5 space-x-2 fixed z-50 bottom-0'>
    <input value={input} disabled={!session} onChange={(e) => setInput(e.target.value) } className="flex-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disable:cursor-not-allowed" placeholder="Type your message here..." />
    <button disabled={!input} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded disabled:opacity-50 disable:cursor-not-allowed' type="submit">Send</button>
 </form>
  )
}

export default InputChat