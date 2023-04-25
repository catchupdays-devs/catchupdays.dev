import { Container, Text, Spacer } from "@nextui-org/react";
import Head from "next/head";
import React from "react";
import { SignupForm } from "@/app/components/SignupForm";
import {
  Subtitle,
  Title,
  Link,
  Underline,
  Circled,
} from "@/app/components/Text";

export default function Index() {
  return (
    <main>
      <Head>
        <title>Legal Notice | Catchup Days</title>
        <meta
          property="og:title"
          content="Legal Notice | Catchup Days"
          key="title"
        />
      </Head>
      <Container xs>
        <Spacer y={4} />
        <Title>Legal Notice</Title>
        <Spacer y={2} />
      </Container>
      <Container xs>
        <Text>
          Catchup Days initiative is organized and operated by the Open Source
          Software Institute&nbsp;z.ú., a non-profit organization registered at
          the Municipal Court in Prague.
        </Text>
        <Subtitle>Address</Subtitle>
        <Text>
          Open Source Software Institute z. ú. <br />
          Varšavská 715/36, Vinohrady, <br />
          120 00 Prague 2 <br />
          Czech Republic
        </Text>
        <Subtitle>Contact Information</Subtitle>
        <Text>
          Email for general queries: hello@catchupdays.dev <br />
          Email for legal matters: legal@catchupdays.dev
        </Text>
        <Subtitle>VAT ID</Subtitle>
        <Text>
          Czech Republic personal identification number (IČO): 18045570
        </Text>
        <Spacer y={2} />
      </Container>
    </main>
  );
}
