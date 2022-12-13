'use client';
import { getProviders} from "next-auth/react";
import { signIn } from "next-auth/react";
type Props = {
    providers: Awaited<ReturnType<typeof getProviders>>;
};
function SignInComponent({providers}: Props) {
  return <div className="flex justify-center">
         {
       Object.values(providers!).map((provider) => (
            <div key={provider.id}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2 rounded" onClick={() => signIn(provider.id, {
                    callbackUrl: `https://process.env.VERCEL_URL` || "http://localhost:3000"
                })}>
                 Sign in with {provider.name}
                </button>
                </div>
                ))
        }
    </div>
    
  
}

export default SignInComponent