import { useSession } from "next-auth/react";
import { ADMIN_EMAILS } from "@/app/const";

export const useIsAdmin = () => {
  const { data: session } = useSession();

  return Boolean(
    session?.user?.email && ADMIN_EMAILS.includes(session.user.email)
  );
};
