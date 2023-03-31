import {
  Container,
  Text,
  Spacer,
  Grid,
  Card,
  Link,
  Row,
  Loading,
  Textarea,
  useInput,
} from "@nextui-org/react";
import Head from "next/head";
import { useQuery } from "react-query";
import { WishlistForm } from "@/app/components/WishlistForm";

export default function Index() {
  const { isLoading, isError, error, data } = useQuery(
    "wishlist",
    async (context) => {
      const issues = (await fetch("/api/wishlist")).json();

      return issues;
    }
  );

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <main>
      <Head>
        <title>The Wishlist | Catchup Days</title>
        <meta
          property="og:title"
          content="Wishlist | Catchup Days"
          key="title"
        />
      </Head>
      <Container xs>
        <Spacer y={4} />
        <Text
          h1
          weight="black"
          css={{
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          The Wishlist
        </Text>
        <Text
          color={"$gray800"}
          size={20}
          css={{
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Here's where you can explore and find the issues that best suit you.
        </Text>
        <Text
          color={"$gray800"}
          size={20}
          css={{
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          You can go for most popular (so most burning) tasks, small and easy to
          start with, or any that fits your mood right now.
        </Text>
        <Spacer y={2} />
      </Container>
      <Container sm>
        <WishlistForm />
      </Container>
      <Container sm>
        {!isLoading ? (
          <Grid.Container gap={1} justify="center">
            {data.map((task) => {
              const repo = task.repository_url.split("/").slice(-2).join("/");

              return (
                <Grid key={task.id} xs={12}>
                  <Card
                    isPressable
                    variant="bordered"
                    as={"a"}
                    href={task.html_url}
                    data-blobity-offset-x={0}
                    data-blobity-offset-y={0}
                  >
                    <Card.Body>
                      <Row justify={"space-between"}>
                        <Text h5>
                          <Row justify={"flex-start"}>
                            <Text>{task.title}</Text>
                            {"  "}
                            <Text color={"$gray800"}>{repo}</Text>
                          </Row>
                        </Text>
                        <Text color={"$gray800"}>
                          {task.reactions.total_count}&nbsp;reactions
                        </Text>
                      </Row>
                    </Card.Body>
                  </Card>
                </Grid>
              );
            })}
          </Grid.Container>
        ) : (
          <Row justify={"center"}>
            <Loading />
          </Row>
        )}
      </Container>
    </main>
  );
}
