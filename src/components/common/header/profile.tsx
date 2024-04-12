import Link from "next/link";
import Button from "../button";
import Image from "next/image";
import { userAccount } from "@/types/userAccount";
import { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile({ user }: { user: User }) {
  return (
    <div className="flex">
      {!user?.user_metadata?.name ? (
        <Button className="bg-blue-500">start trail</Button>
      ) : null}
      {user?.user_metadata?.name ? (
        <>
          <Link href={"/dashboard"}>
            <Avatar>
              <AvatarImage src={user.user_metadata.avatar_url} />
              <AvatarFallback>FV</AvatarFallback>
            </Avatar>
          </Link>
        </>
      ) : (
        <Link href={"/sign-in"} className="mx-10">
          Login
        </Link>
      )}
    </div>
  );
}
