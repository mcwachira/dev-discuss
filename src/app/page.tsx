import { Button } from "@heroui/button";
import * as actions from "@/actions";
import { auth } from "@/auth";
import Profile from "@/components/profile";

export default async function Page() {
  const session = await auth();
  // if (session?.user) {
  //   return <div> Signed In</div>;
  // }else {
  //   return <div> Signes Out</div>
  // }
  return (
    <div>
      <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>
      </form>

      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form>

      {session?.user ? <div> Signed IN</div> : <div> Signed OUt</div>}

      <Profile />
    </div>
  );
}
