import { Container, Text, Spacer, Grid, Row, Badge } from "@nextui-org/react";
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
import { keyframes, styled } from "@stitches/react";

const bounce = keyframes({
  "0%": { transform: "scale(1, 1)" },
  "5%": { transform: "scale(0.9, 1.1)" },
  "10%": { transform: "scale(1.1, 0.9)" },
  "15%": { transform: "scale(0.95, 1.05)" },
  "20%": { transform: "scale(1, 1)" },
});
const HighlightedBadge = styled(Badge, {
  animation: `${bounce} 5s infinite`,
  animationDelay: "2s",
  textDecoration: "none",
});

export default function Index() {
  return (
    <main>
      <Head>
        <title>Catchup Days - Let's Make Open Source Better, Together</title>
      </Head>
      <Container md justify={"center"}>
        <Spacer y={4} />
        <Row justify={"center"}>
          <Link
            href={"https://youtu.be/WTSXl4RM2pQ"}
            target={"_blank"}
            style={{
              textDecoration: "none",
            }}
          >
            <HighlightedBadge
              variant={"bordered"}
              size={"md"}
              style={{
                color: "black",
                borderColor: "black",
              }}
            >
              Watch the presentation - Are we farmers? 🤔
            </HighlightedBadge>
          </Link>
        </Row>
        <Spacer y={1} />
        <MainTitle>
          Contributing <br /> to open-source <br /> is&nbsp;the&nbsp;ultimate{" "}
          <WithGradient black>company benefit</WithGradient>
        </MainTitle>
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
            We connect best companies with open‑source maintainers to keep the
            software free and excellent for everyone.
          </Text>
        </Row>
        <Spacer y={1} />
      </Container>
      <Container md>
        <Hero />
        <Spacer
          y={4}
          css={{
            display: "none",
            "@xs": { display: "none" },
            "@sm": { display: "block" },
          }}
        />

        <Spacer
          y={1}
          css={{
            display: "block",
            "@xs": { display: "block" },
            "@sm": { display: "none" },
          }}
        />
      </Container>
      <Container xs>
        <Subtitle>Win-Win-Win Situation</Subtitle>
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
