"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();
  if (session.data?.user) {
    return <div> from client user is signed in</div>;
  } else {
    return <div> from client user is signed out</div>;
  }
}
