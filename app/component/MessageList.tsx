'use client';
import { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../../lib/fetchMessages';
import { clientPusher } from '../../lib/pusher';
import { Message } from '../../typings';
import MessageComponent from './MessageComponent';


type Props = {
  initialMessage: Message[];
}

function MessageList({initialMessage}: Props) {

const {data:messages, error, mutate} = useSWR<Message[]>("api/getMessages", fetcher);

function handleScroll() {
     window.scroll({
       top: document.body.offsetHeight,
       behavior: 'auto',
       });
   }

useEffect(() => {

 const channel = clientPusher.subscribe("message");
  channel.bind("new-message", async (data: Message) => {

    if(messages?.find((message) => message.id === data.id)) return;

 if(!messages){
    mutate(fetcher);
    }else{
     mutate(fetcher, {
        optimisticData: [data, ...messages!],
        rollbackOnError: true,
      });
    }
  });

  
return () => {
    channel.unbind();
    channel.unsubscribe();
}
  

}, [messages, mutate, clientPusher]);

useEffect(() => {
  handleScroll();
 }, [messages, clientPusher]);
 
 

return (
<div className='space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto'>
{
  (messages || initialMessage).map((message) => (
    <MessageComponent key={message.id} message={message} />
  )
  )
 }
  </div>

  )
}

export default MessageList