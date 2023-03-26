import Image from "next/image";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";
import { unstable_getServerSession } from "next-auth/next";

async function Header() {
  const session = await unstable_getServerSession();

  if (session)
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-md">
        <div className="flex space-x-2">
          <Image
            className="rounded-full mx-2 object-contain"
            src={session.user?.image!}
            alt="s_photo"
            height="10"
            width="55"
          />

          <div>
            <p className="text-blue-400">Logged in as:</p>
            <p className="font-bold text-lg">{session.user?.name}</p>
          </div>
        </div>
        <LogoutBtn />
      </header>
    );

  return (
    <header className="sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-md">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex items-center space-x-2">
          <Image
            src="https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png"
            height="10"
            width="50"
            alt="meta_logo"
          />
          <p className="text-blue-400">Welcome to Meta Messenger</p>
        </div>
        <Link
          href="/auth/signin"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2 rounded"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}

export default Header;
