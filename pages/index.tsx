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
import { Hero } from "@/app/components/Hero";

export default function Index() {
  return (
    <main>
      <Head>
        <title>Catchup Days - Let's Make Open Source Better, Together</title>
      </Head>
      <Container md>
        <Spacer y={4} />
        <Row justify={"center"}>
          <MainTitle>
            Contributing to open-source <br /> is the ultimate{" "}
            <WithGradient black>company benefit</WithGradient>
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
            We connect companies with open‑source maintainers to keep the
            software free and excellent for everyone.
          </Text>
        </Row>
        <Spacer y={1} />
      </Container>
      <Container md>
        <Hero />
        <Spacer y={2} />
      </Container>
      <Container xs>
        <Subtitle>Win-Win-Win situation</Subtitle>
        <Text>
          There is a massive disconnect between the open-source community and
          its most prominent users - the companies relying on it.
        </Text>
        <Spacer y={1} />
        <Text>
          That’s where we come in:
          <ul>
            <li>
              We help <strong>companies</strong> to find time for their
              employees to <Circled>catch&nbsp;up</Circled> on those
              open&#8209;source libraries contributions they have wished to make
              for so long.
            </li>
            <li>
              We also help <strong>open-source maintainers</strong> to build
              a&nbsp;curated <Link href="/wishlist">wishlist</Link> of tasks
              that would fit the catch&nbsp;up agenda.
            </li>
          </ul>
        </Text>
        <Spacer y={1} />
        <Text>
          Whether you&apos;re an open-source maintainer interested in getting
          help with your project, an engineer looking to make a&nbsp;difference
          in the&nbsp;open-source space, or a&nbsp;CTO of a&nbsp;company relying
          on open-source, you&apos;re in&nbsp;the&nbsp;right place.
        </Text>
        <Spacer y={2} />
      </Container>
      <Container sm>
        <Grid.Container gap={2} justify={"space-around"}>
          <Grid xs={12} sm={5}>
            <CardLink
              title={"Companies"}
              text={
                "Would you like to ensure your apps are as stable and neat as possible?"
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
                "Would you like to get help with your project from the actual users?"
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
