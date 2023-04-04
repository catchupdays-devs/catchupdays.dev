import React from "react";
import { Navbar, Button, Link } from "@nextui-org/react";
import NextJsLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const items = {
  Companies: "/for-companies",
  Maintainers: "/for-maintainers",
  Wishlist: "/wishlist",
};

export const Navigation = () => {
  const { asPath } = useRouter();

  return (
    <Navbar isBordered variant={"floating"} css={{ zIndex: 1000 }}>
      <Navbar.Brand>
        <NextJsLink href="/">
          <Image
            src="/icon.png"
            alt="Catchup Days logo"
            width={44}
            height={53}
            priority
          />
        </NextJsLink>
      </Navbar.Brand>
      {/* @ts-ignore */}
      <Navbar.Content hideIn="xs" activeColor="black">
        {Object.entries(items).map(([title, href]) => (
          <Navbar.Item key={href} isActive={asPath.startsWith(href)}>
            <Navbar.Link href={href}>{title}</Navbar.Link>
          </Navbar.Item>
        ))}
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button
            /* @ts-ignore */
            color="black"
            ghost
            auto
            flat
            href={asPath.startsWith("/wishlist") ? "/#enroll" : "#enroll"}
            as={NextJsLink}
          >
            Enroll
          </Button>
        </Navbar.Item>
        <Navbar.Toggle showIn="xs" aria-label="toggle navigation" />
      </Navbar.Content>
      <Navbar.Collapse
        showIn="xs"
        css={{
          display: "flex",
          justifyContent: "stretch",
          flexGrow: "1",
          width: "100%",
          alignItems: "center",
          background: "#fff",
        }}
      >
        {Object.entries(items).map(([title, href]) => (
          <Navbar.CollapseItem
            key={href}
            /* @ts-ignore */
            activeColor="black"
            isActive={asPath.startsWith(href)}
          >
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
                display: "block",
                fontSize: "36px",
                fontWeight: "900",
              }}
              href={href}
            >
              {title}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};
