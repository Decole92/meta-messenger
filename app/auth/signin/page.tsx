import { getProviders } from 'next-auth/react'
import Image from 'next/image';
import SignInComponent from '../../component/SignInComponent';

async function SignInPage() {

const providers = await getProviders();

return (
  
   <div className="justify-center items-center space-y-5">
        <div className="grid justify-center">
        <Image src="https://logos-world.net/wp-content/uploads/2021/02/Facebook-Messenger-Logo.png" 
         width="500"
         height="500"
         alt="messenger_logo" />
        </div>
        <SignInComponent providers={providers}/>
    </div>
  )
}

export default SignInPage