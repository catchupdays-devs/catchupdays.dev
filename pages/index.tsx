import { Container, Text, Spacer, Grid, Row } from "@nextui-org/react";
import Head from "next/head";
import { SignupForm } from "@/app/components/SignupForm";
import {
  Circled,
  MainTitle,
  Subtitle,
  WithGradient,
  Link,
} from "@/app/components/Text";
import React from "react";
import { CardLink } from "@/app/components/CardLink";

export default function Index() {
  return (
    <main>
      <Head>
        <title>Catchup Days</title>
        <meta property="og:title" content="Catchup Days" key="title" />
      </Head>
      <Container md>
        <Spacer y={4} />
        <Row justify={"center"}>
          <MainTitle>
            Let&apos;s Make Open Source <br /> Better,{" "}
            <WithGradient black>Together</WithGradient>
          </MainTitle>
        </Row>
        <Spacer y={1} />
      </Container>
      <Container xs>
        <Row justify={"center"}>
          <Text
            color={"$gray800"}
            size={24}
            css={{
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            We are connecting the companies with&nbsp;the&nbsp;open&#8209;source
            software maintainers to keep the&nbsp;software free
            and&nbsp;sustainable for everyone.
          </Text>
        </Row>
        <Spacer y={6} />
      </Container>
      <Container xs>
        <Text>
          Companies all around the world rely on open-source software in their
          products. It&apos;s in their best interest to try and make such
          software better.
        </Text>
        <Spacer y={1} />
        <Text>
          That&apos;s where we come in - we help companies and employees
          organize their time so employees can <Circled>catchup</Circled>
          on all those improvements to critical open-source libraries
          they&apos;ve been putting aside, while the open source maintainers
          help us keep the <Link href="/wishlist">wishlist</Link> curated and up
          to date.
        </Text>
        <Spacer y={1} />
        <Text>
          Whether you&apos;re an open-source maintainer interested in getting
          help with your project, engineer looking in making difference in
          open-source space, or a CTO of a company relying on OS, you&apos;re in
          the right place.
        </Text>
        <Spacer y={2} />
      </Container>
      <Container sm>
        <Grid.Container gap={2} justify={"space-around"}>
          <Grid xs={12} sm={5}>
            <CardLink
              title={"Companies"}
              text={
                "Would you like to ensure your apps are as stable and as neat as possible?"
              }
              href={"/for-companies"}
              variant={"A"}
              cta={"Read more"}
            />
          </Grid>
          <Grid xs={12} sm={5}>
            <CardLink
              title={"Maintainers"}
              text={
                "Would you like to get help with your project by the actual users?"
              }
              href={"/for-maintainers"}
              variant={"B"}
              cta={"Read more"}
            />
          </Grid>
        </Grid.Container>
      </Container>
      <SignupForm formKey={"xzbqjjog"} />
    </main>
  );
}
