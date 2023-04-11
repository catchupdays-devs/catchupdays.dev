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
            We connect companies with open&#8209;source software maintainers
            to&nbsp;keep the software free and&nbsp;awesome for&nbsp;everyone.
          </Text>
        </Row>
        <Spacer y={6} />
      </Container>
      <Container xs>
        <Text>
          There is a massive disconnect between the open-source community and
          its most prominent users - the companies relying on it.
        </Text>
        <Spacer y={1} />
        <Text>
          That&apos;s where we come in - we help companies and employees
          organize their time so employees can <Circled>catch up</Circled>
          on all those improvements to critical open-source libraries
          they&apos;ve been putting aside, while the open&#8209;source
          maintainers help us keep the <Link href="/wishlist">
            wishlist
          </Link>{" "}
          curated and up to date.
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
