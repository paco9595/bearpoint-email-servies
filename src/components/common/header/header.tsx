import Image from "next/image";
import NavList from "./navlist";
import Profile from "./profile";
import {
  User,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ProjectSelector from "./projectSelector";
import Link from "next/link";
export default async function Header() {
  const supabase = await createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  

  return (
    <div className="flex justify-between w-full sticky top-0 left-0 border-b border-b[#000] px-10 items-center h-[80px] bg-white text-black">
      <div className="font-medium text-base flex">
        <Link href={'/dashboard'} className="flex">
          <Image
            src={"/bear.png"}
            height={50}
            width={50}
            alt="logo beapoint"
            className="hidden md:block"
          />
          <span className="ml-2 my-auto hidden md:block">Bearpoint</span>
        </Link>
        <div className="md:ml-5 my-auto">
          {user?.id ? <ProjectSelector /> : null}
        </div>
      </div>
      {!user?.id ? <NavList /> : null}
      <div className="my-auto">
        <Profile user={user || ({} as User)} />
      </div>
    </div>
  );
}
