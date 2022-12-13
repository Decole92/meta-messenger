"use client"
import {signOut} from 'next-auth/react';

function LogoutBtn() {
  return (
    <button onClick={() => signOut()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2 rounded">
        Sign Out
    </button>
  )
}

export default LogoutBtn