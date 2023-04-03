import React from "react";
import { Navbar, Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import Scrl from "scrl";
import { useBlobityInstance } from "../../../pages/_app";
import { useRouter } from "next/router";

export const Navigation = () => {
  const { asPath } = useRouter();

  console.log(asPath);

  return (
    <Navbar isBordered variant={"floating"} css={{ zIndex: 1000 }}>
      <Navbar.Brand>
        <Link href="/">
          <Image
            src="/icon.png"
            alt="Catchup Days logo"
            width={44}
            height={53}
            priority
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" activeColor="black">
        <Navbar.Link
          href="/for-companies"
          isActive={asPath.startsWith("/for-companies")}
        >
          For Companies
        </Navbar.Link>
        <Navbar.Link
          href="/for-maintainers"
          isActive={asPath.startsWith("/for-maintainers")}
        >
          For Maintainers
        </Navbar.Link>
        <Navbar.Link href="/wishlist" isActive={asPath.startsWith("/wishlist")}>
          Wishlist
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button
            color="black"
            ghost
            auto
            flat
            href={asPath.startsWith("/wishlist") ? "/#enroll" : "#enroll"}
            as={Link}
          >
            Enroll
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};
