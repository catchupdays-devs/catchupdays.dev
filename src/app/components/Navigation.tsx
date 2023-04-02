import React from "react";
import { Navbar, Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { useBlobityInstance } from "../../../pages/_app";

export const Navigation = () => {
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
      <Navbar.Content hideIn="xs">
        <Navbar.Link href="/for-companies">For Companies</Navbar.Link>
        <Navbar.Link href="/for-os">For OS</Navbar.Link>
        <Navbar.Link href="/wishlist">Wishlist</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button color="black" ghost auto flat href="#enroll" as={Link}>
            Enroll
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};
