import { useSession } from "next-auth/react";
import { ADMIN_USERNAMES } from "@/app/const";

export const useIsAdmin = () => {
  const { data: session } = useSession();

  return Boolean(
    session?.user?.name && ADMIN_USERNAMES.includes(session.user.name)
  );
};
