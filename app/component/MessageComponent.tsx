import Image from "next/image";
import { Message } from "../../typings";
import { useSession } from "next-auth/react";
import TimeAgo from 'react-timeago'

type Props = {
  message:Message,
}
function MessageComponent({message}: Props) {

  const {data:session} = useSession();
  const isUser = session?.user?.email === message.email;

  return (
    <div className={`flex w-fit space-x-3 ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image src={message.profilePic} alt="profile_pic" height="10" width="50" className="rounded-full object-contain mx-2"/>
      </div>
      <div>
        <p className={`text-[0.65rem] px-[3px] pb-[2px] ${isUser ? 'text-blue-500 text-right' : 'text-gray-500 text-left'}`}>{message.username}</p>

         <div className="flex items-end">
           <div className={`px-3 py-2 rounded-lg w-fit ${isUser ? 'text-white bg-blue-500 mr-auto order-2' : 'text-gray-700 bg-gray-200 text-left'}`}>
              <p>{message.message}</p>
            </div>

            <p className={`text-[0.65rem] italic px-2 text-gray-300 ${isUser && 'text-right'}`}> <TimeAgo date={new Date(message.created_at)}/></p>
          </div>
        
      </div>
      </div>
  )
}

export default MessageComponent