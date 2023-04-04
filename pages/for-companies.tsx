import { Container, Text, Spacer } from "@nextui-org/react";
import Head from "next/head";
import React from "react";
import { SignupForm } from "@/app/components/SignupForm";
import { Title } from "@/app/components/Text";

export default function Index() {
  return (
    <main>
      <Head>
        <title>For Companies | Catchup Days</title>
        <meta
          property="og:title"
          content="For Companies | Catchup Days"
          key="title"
        />
      </Head>
      <Container xs>
        <Spacer y={4} />
        <Title>For Companies</Title>
        <Text
          color={"$gray800"}
          size={20}
          css={{
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Did you know that your application can consist from open source
          libraries and components from up to 90 %. That&apos;s a massive
          number, so we better make sure it&apos;s a stable, well tested code.
        </Text>
        <Spacer y={2} />
      </Container>
      <SignupForm formKey={"xzbqjjog"} preselectedRole={"business"} />
    </main>
  );
}
