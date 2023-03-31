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
          <Text
            h1
            size={100}
            weight="black"
            css={{
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            Let's Make Open Source <br /> Better,{" "}
            <Text
              size={100}
              weight="black"
              css={{
                textAlign: "center",
                display: "inline-block",
                lineHeight: 1.2,
                textGradient: "45deg, $red600 -25%, $red800 85%, $red900 100%",
              }}
            >
              Together
            </Text>
          </Text>
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
            We are the missing piece between the companies
            and&nbsp;the&nbsp;open&#8209;source software they rely on for their
            business.
          </Text>
        </Row>
        <Spacer y={6} />
      </Container>
      <Container xs>
        <Text
          h2
          css={{
            textAlign: "center",
          }}
        >
          What is Catchup Days
        </Text>

        <Text>
          The idea is simple - companies all around the world rely on
          open-source software in their products. In fact, did you know that
          average codebase consist from 90 % out of third party open-source
          package/libraries. That's a massive amount!
        </Text>
        <Text>
          That being said, it crucial for everyone for this 90 % to be stable
          and reliable, and that's where we come in. We're helping companies
          invest time in the open-source software they are using, and
          consequently helping open-source get better for everyone.
        </Text>
      </Container>
      <Container sm>
        <Grid.Container gap={2} justify="center">
          <Grid xs={6}>
            <Card variant="bordered">
              <Card.Body>
                <Text h4>For Companies</Text>
                <Text>
                  Would you like your company to be part of this initiative?
                  Find out how you can join now.
                </Text>
              </Card.Body>
              <Card.Footer>
                <Link size="sm">Find out more</Link>
              </Card.Footer>
            </Card>
          </Grid>
          <Grid xs={6}>
            <Card variant="bordered">
              <Card.Body>
                <Text h4>For OS</Text>
                <Text>
                  Would you like to get help with you Open Source project, by
                  the actual users? Find out how we can help.
                </Text>
              </Card.Body>
              <Card.Footer>
                <Link size="sm">Find out more</Link>
              </Card.Footer>
            </Card>
          </Grid>
        </Grid.Container>
      </Container>
    </main>
  );
}
