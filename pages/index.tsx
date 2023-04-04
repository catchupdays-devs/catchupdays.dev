import { Container, Text, Spacer, Grid, Link, Row } from "@nextui-org/react";
import Head from "next/head";
import { SignupForm } from "@/app/components/SignupForm";
import { MainTitle, Subtitle } from "@/app/components/Text";
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
            <Text
              span
              css={{
                textGradient: "135deg, $red600 -25%, $red800 85%, $red900 100%",
              }}
            >
              Together
            </Text>
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
            software maintainers to make software better for everyone.
          </Text>
        </Row>
        <Spacer y={6} />
      </Container>
      <Container xs>
        <Subtitle>What is Catchup Days</Subtitle>
        <Text>
          Companies all around the world rely on open-source software in their
          products. It&apos;s in their best interest to try and make such
          software better.
        </Text>
        <Spacer y={1} />
        <Text>
          That&apos;s where we come in - we help companies and employees
          organize their time so employees can{" "}
          <Text
            css={{
              display: "inline-block",
              fontWeight: "bold",
              textGradient: "45deg, $red600 -25%, $red800 85%, $red900 100%",
            }}
          >
            catchup
          </Text>{" "}
          on all those improvements to critical open-source libraries
          they&apos;ve been putting aside, while the open source maintainers
          help us keep the{" "}
          <Link
            color="text"
            href="/wishlist"
            underline
            css={{ fontWeight: "bold" }}
          >
            wishlist
          </Link>{" "}
          curated and up to date.
        </Text>
        <Spacer y={1} />
        <Text>
          Whether you&apos;re an open-source maintainer interested in getting
          help with your project, or a business interested in making the
          software you rely on better, you&apos;re in the right place.
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
