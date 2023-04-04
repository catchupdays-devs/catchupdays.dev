import { Container, Text, Spacer } from "@nextui-org/react";
import Head from "next/head";
import React from "react";
import { SignupForm } from "@/app/components/SignupForm";
import { Title } from "@/app/components/Text";

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
        <Title>For Maintainers</Title>
        <Text
          color={"$gray800"}
          size={20}
          css={{
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Let&apos;s face it - the open source is broken. The biggest users of
          any OS rely on it for their business, yet, just a fraction of those
          companies supports the OS projects in any way. Let&apos;s change that
          together.
        </Text>
        <Spacer y={2} />
      </Container>
      <SignupForm formKey={"xzbqjjog"} preselectedRole={"maintainer"} />
    </main>
  );
}
