import {
  Container,
  Text,
  Spacer,
  Grid,
  Card,
  Link,
  Row,
} from "@nextui-org/react";
import Head from "next/head";
import React from "react";
import { SignupForm } from "@/app/components/SignupForm";

export default function Index() {
  return (
    <main>
      <Head>
        <title>For Maintainers | Catchup Days</title>
        <meta
          property="og:title"
          content="For Maintainers | Catchup Days"
          key="title"
        />
      </Head>
      <Container xs>
        <Spacer y={4} />
        <Text
          h1
          weight="black"
          css={{
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          For Maintainers
        </Text>
        <Text
          color={"$gray800"}
          size={20}
          css={{
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Let's face it - the open source is broken. The biggest users of any OS
          rely on it for their business, yet, just a fraction of those companies
          supports the OS projects in any way. Let's change that together.
        </Text>
        <Spacer y={2} />
      </Container>
      <SignupForm formKey={"xzbqjjog"} preselectedRole={"maintainer"} />
    </main>
  );
}
