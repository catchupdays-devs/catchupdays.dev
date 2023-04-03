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
import { default as NextLink } from "next/link";
import { SignupForm } from "@/app/components/SignupForm";
import { createStyled } from "@stitches/styled";

const { styled } = createStyled({});

const Title = styled(Text, {
  textAlign: "center",
  lineHeight: 1.2,
  fontWeight: "black",
  fontSize: "12.2vw",

  span: {
    fontSize: "12.2vw",
    fontWeight: "black",
    display: "inline-block",
  },

  "@media only screen and (min-width: 520px)": {
    fontSize: "8vw",

    span: {
      fontSize: "8vw",
    },
  },

  "@media only screen and (min-width: 1280px)": {
    fontSize: "100px",

    span: {
      fontSize: "100px",
    },
  },
});

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
          <Title h1 weight="black">
            Let's Make Open Source <br /> Better,{" "}
            <Text
              span
              css={{
                textGradient: "135deg, $red600 -25%, $red800 85%, $red900 100%",
              }}
            >
              Together
            </Text>
          </Title>
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
        <Text
          h1
          css={{
            textAlign: "center",
          }}
        >
          What is{" "}
          <Text
            h1
            weight="black"
            css={{
              display: "inline-block",
            }}
          >
            Catchup Days
          </Text>
        </Text>
        <Text>
          Companies all around the world rely on open-source software in their
          products. It's in their best interest to try and make such software
          better.
        </Text>
        <Spacer y={1} />
        <Text>
          That's where we come in - we help companies and employees organize
          their time so employees can{" "}
          <Text
            css={{
              display: "inline-block",
              fontWeight: "bold",
              textGradient: "45deg, $red600 -25%, $red800 85%, $red900 100%",
            }}
          >
            catchup
          </Text>{" "}
          on all those improvements to critical open-source libraries they've
          been putting aside, while the open source maintainers help us keep the{" "}
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
          Whether you're an open-source maintainer interested in getting help
          with your project, or a business interested in making the software you
          rely on better, you're in the right place.
        </Text>
        <Spacer y={2} />
      </Container>
      <Container md>
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} sm={4}>
            <Card
              variant="bordered"
              isPressable
              isHoverable
              href="/for-companies"
              as={NextLink}
            >
              <Card.Body>
                <Text h4 css={{ textAlign: "left", width: "100%" }}>
                  For Companies
                </Text>
                <Text>
                  Would you like to ensure your apps are as stable and as neat
                  as possible?
                </Text>
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={12} sm={4}>
            <Card
              variant="bordered"
              isPressable
              isHoverable
              href="/for-maintainers"
              as={NextLink}
            >
              <Card.Body>
                <Text h4 css={{ textAlign: "left", width: "100%" }}>
                  For Maintainers
                </Text>
                <Text>
                  Would you like to get help with your project by the actual
                  users?
                </Text>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
      </Container>

      <SignupForm formKey={"xzbqjjog"} />
    </main>
  );
}
