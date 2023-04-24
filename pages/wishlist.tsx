import {
  Container,
  Text,
  Spacer,
  Grid,
  Row,
  Loading,
  Tooltip,
  Badge,
  Table,
  Link,
  Avatar,
  Button,
} from "@nextui-org/react";
import Head from "next/head";
import { useQuery } from "react-query";
import { WishlistForm } from "@/app/components/WishlistForm";
import { styled } from "@stitches/react";
import React, { useEffect, useState } from "react";
import { FiltersResponse, WishlistResponse } from "@/app/types";
import list from "@/app/images/list.svg";
import headlinedList from "@/app/images/headlined-list.svg";
import github from "@/app/images/github.svg";
import Image from "next/image";

const ReactionFullAmount = styled("span", {
  opacity: 1,
  transition: "opacity .2s ease",
  margin: "0 20px 0 0",
  //fontWeight: "bold",
});

const ReactionWrapper = styled("span", {
  margin: "0 0 0 -16px",
  background: "#fff",
  borderRadius: "50%",
  width: "26px",
  height: "26px",
  display: "inline-flex",
  textAlign: "center",
  boxShadow: "0 2px 4px rgba(0, 0, 0, .1)",
  transition: "margin .2s ease",
  flex: "1 1",
  justifyContent: "center",
  alignItems: "center",
});

const ReactionHolder = styled("span", {
  cursor: "default",

  [`&:hover ${ReactionWrapper}`]: {
    margin: "0 0 0 2px",
  },
  [`&:hover ${ReactionFullAmount}`]: {
    opacity: 0,
  },
});

const Reaction = ({ num, icon }: { num: number; icon: string }) => {
  if (!num) {
    return null;
  }

  return (
    <ReactionWrapper>
      <Tooltip content={num}>{icon}</Tooltip>
    </ReactionWrapper>
  );
};

export default function Wishlist() {
  const {
    data: filters,
    isLoading: isFilterLoading,
    isError: isFilterError,
  } = useQuery(
    ["filters"],
    async (): Promise<FiltersResponse> => {
      const url = new URL(window.location.origin + "/api/filter");

      return (await fetch(url)).json();
    },
    {}
  );
  const randomRepoSuggestion =
    filters?.repos.items[
      Math.floor(Math.random() * filters?.repos.items.length || 0)
    ];

  const [focusedAttribute, setFocusedAttribute] = React.useState<string | null>(
    null
  );
  const [activeAttributes, setActiveAttributes] = React.useState(
    new Set<string>([])
  );
  const [listDisplay, setListDisplay] = useState<"list" | "headlinedList">(
    "list"
  );

  const updateAttributes = (type: string, attrs: typeof activeAttributes) => {
    const currentSet = new Set([...activeAttributes]);

    currentSet.forEach((a) => {
      if (!attrs.has(a) && a.includes(type)) {
        currentSet.delete(a);
      }
    });

    attrs.forEach((a) => {
      if (!currentSet.has(a)) {
        currentSet.add(a);
      }
    });

    setActiveAttributes(currentSet);
  };
  const addAttribute = (attr: string) => {
    const currentSet = new Set([...activeAttributes]);

    currentSet.add(attr);

    setActiveAttributes(currentSet);
  };
  const deleteAttribute = (attr: string) => {
    const currentSet = new Set([...activeAttributes]);

    currentSet.forEach((a) => {
      if (a.includes(attr)) {
        currentSet.delete(a);
      }
    });

    setActiveAttributes(currentSet);
  };
  const reset = () => {
    setActiveAttributes(new Set());
  };

  const { isLoading, isError, error, data } = useQuery(
    ["wishlist", [...activeAttributes].reduce((prev, a) => prev + a, "")],
    async ({ queryKey: [key, attr] }): Promise<WishlistResponse> => {
      const url = new URL(window.location.origin + "/api/wishlist");

      [...activeAttributes].forEach((attr) => {
        const [type, name] = attr.split(":");

        url.searchParams.append(type, name);
      });

      return (await fetch(url)).json();
    },
    {}
  );
  const issues = data?.issues;
  const issuesGroupedByRepo = data?.issues.reduce((acc, issue) => {
    if (acc[issue.repository]) {
      return {
        ...acc,
        [issue.repository]: [...acc[issue.repository], issue],
      };
    }

    return {
      ...acc,
      [issue.repository]: [issue],
    };
  }, {});

  useEffect(() => {
    const url = new URL(window.location.href);
    const attrs = new Set<string>();

    [...url.searchParams].forEach(([type, name]) => {
      attrs.add(`${type}:${name}`);
    });

    setActiveAttributes(attrs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const url = new URL(window.location.origin + window.location.pathname);

    [...activeAttributes].forEach((attr) => {
      const [type, name] = attr.split(":");

      url.searchParams.append(type, name);
    });

    window.history.replaceState(null, "", url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAttributes]);

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
          Here&apos;s where you can explore and find the issues that best suit
          you.
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
        {!isFilterLoading ? (
          <WishlistForm
            reset={reset}
            attributes={filters}
            focusedAttribute={focusedAttribute}
            addAttribute={addAttribute}
            deleteAttribute={deleteAttribute}
            updateAttributes={updateAttributes}
            setFocusedAttribute={setFocusedAttribute}
            activeAttributes={activeAttributes}
          />
        ) : (
          <Row justify={"center"}>
            <Spacer y={4} />
            <Loading
              css={{
                "--nextui--loadingColor": "#000",
              }}
              type={"points"}
            />
            <Spacer y={4} />
          </Row>
        )}
      </Container>
      {!isFilterLoading && data?.repos?.length && data.repos.length > 0 ? (
        <Container xs>
          <Text
            color={"$gray800"}
            size={12}
            css={{
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            <span
              style={{
                display: "inline-block",
                margin: "0 0 5px 0",
              }}
            >
              Following repositories are being queried based on your filter:
            </span>
            {data?.repos.map((repo) => (
              <Badge
                key={repo}
                css={{ margin: "0 0 5px 5px" }}
                disableOutline
                variant="flat"
                isSquared
                size={"xs"}
              >
                {repo}
              </Badge>
            ))}
            <div>
              <span
                style={{
                  display: "inline-block",
                  margin: "0 0 5px 0",
                }}
              >
                {data?.ignoredRepos?.length
                  ? `${data?.ignoredRepos.length} repositories were ignored because the filter is too broad. `
                  : null}
                If you want some other repositories, please specify which or
                make the filter more restrictive.
              </span>
            </div>
          </Text>
          <Spacer y={1} />
        </Container>
      ) : (
        <Text
          color={"$gray800"}
          size={12}
          css={{
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          No repositories are being queried. Please adjust filter.
        </Text>
      )}
      <Container sm>
        {!isLoading ? (
          <Grid.Container gap={1} justify="center">
            {data?.repos.length ? (
              <>
                <Row justify={"flex-end"}>
                  <Button.Group flat size={"sm"} color="neutral">
                    <Button onPress={() => setListDisplay("list")}>
                      <Image
                        style={{
                          filter:
                            listDisplay === "list"
                              ? "drop-shadow(0 0 2px 2px rgb(0 0 0 / 0))"
                              : "",
                        }}
                        src={list.src}
                        alt="List"
                        width={14}
                        height={14}
                        priority
                      />
                    </Button>
                    <Button onPress={() => setListDisplay("headlinedList")}>
                      <Image
                        style={{
                          filter:
                            listDisplay === "headlinedList"
                              ? "drop-shadow(0 0 2px 2px rgb(0 0 0 / 0))"
                              : "",
                        }}
                        src={headlinedList.src}
                        alt="Headlined List"
                        width={14}
                        height={14}
                        priority
                      />
                    </Button>
                  </Button.Group>
                </Row>
                {listDisplay === "list" ? (
                  <Table
                    striped
                    sticked
                    compact
                    selectionMode="none"
                    aria-label="Wishlist based on filters above"
                    css={{
                      height: "auto",
                      minWidth: "912px",
                      background: "#fff",
                    }}
                  >
                    <Table.Header>
                      <Table.Column> </Table.Column>
                      <Table.Column>Title</Table.Column>
                      {/*<Table.Column>Added</Table.Column>*/}
                      {/*<Table.Column>Author</Table.Column>*/}
                      <Table.Column
                        css={{
                          minWidth: "240px",
                          textAlign: "right",
                        }}
                      >
                        Reactions
                      </Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {issues.map((issue) => {
                        return (
                          <Table.Row key={issue.id}>
                            <Table.Cell
                              css={{
                                maxWidth: "50px",
                              }}
                            >
                              <Avatar
                                size={"xs"}
                                squared
                                src={issue.owner?.avatarUrl}
                              />
                            </Table.Cell>
                            <Table.Cell
                              css={{
                                maxWidth: "400px",
                              }}
                            >
                              <Link href={issue.url}>
                                <Text>{issue.title}</Text>
                              </Link>
                              {" | "}
                              <Link href={issue.url}>
                                <Text
                                  css={{
                                    display: "inline-block",
                                    color: "$gray700",
                                  }}
                                >
                                  {issue.repository}
                                </Text>
                              </Link>
                            </Table.Cell>
                            <Table.Cell>
                              {issue.reactions.TOTAL ? (
                                <Row justify={"flex-end"}>
                                  <ReactionHolder>
                                    <ReactionFullAmount>
                                      {issue.reactions.TOTAL === 100
                                        ? "100+"
                                        : issue.reactions.TOTAL}
                                    </ReactionFullAmount>
                                    <Reaction
                                      num={issue.reactions.LAUGH}
                                      icon="😄"
                                    />
                                    <Reaction
                                      num={issue.reactions.HOORAY}
                                      icon="🎉"
                                    />
                                    <Reaction
                                      num={issue.reactions.CONFUSED}
                                      icon="😕"
                                    />
                                    <Reaction
                                      num={issue.reactions.HEART}
                                      icon="❤️"
                                    />
                                    <Reaction
                                      num={issue.reactions.EYES}
                                      icon="👀"
                                    />
                                    <Reaction
                                      num={issue.reactions.ROCKET}
                                      icon="🚀"
                                    />
                                    <Reaction
                                      num={issue.reactions.THUMBS_DOWN}
                                      icon="👎"
                                    />
                                    <Reaction
                                      num={issue.reactions.THUMBS_UP}
                                      icon="👍"
                                    />
                                  </ReactionHolder>
                                </Row>
                              ) : null}
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                ) : (
                  Object.entries(issuesGroupedByRepo).map(([repo, issues]) => {
                    return (
                      <React.Fragment key={repo}>
                        <Text
                          h4
                          css={{
                            textAlign: "left",
                            marginTop: "30px",
                          }}
                        >
                          {repo}
                        </Text>
                        <Table
                          striped
                          sticked
                          compact
                          selectionMode="none"
                          aria-label="Wishlist based on filters above"
                          css={{
                            height: "auto",
                            minWidth: "912px",
                            background: "#fff",
                          }}
                        >
                          <Table.Header>
                            <Table.Column> </Table.Column>
                            <Table.Column>Title</Table.Column>
                            {/*<Table.Column>Added</Table.Column>*/}
                            {/*<Table.Column>Author</Table.Column>*/}
                            <Table.Column
                              css={{
                                minWidth: "240px",
                                textAlign: "right",
                              }}
                            >
                              Reactions
                            </Table.Column>
                          </Table.Header>
                          <Table.Body>
                            {issues.map((issue) => {
                              return (
                                <Table.Row key={issue.id}>
                                  <Table.Cell
                                    css={{
                                      maxWidth: "50px",
                                    }}
                                  >
                                    <Avatar
                                      size={"xs"}
                                      squared
                                      src={issue.owner?.avatarUrl}
                                    />
                                  </Table.Cell>
                                  <Table.Cell
                                    css={{
                                      maxWidth: "400px",
                                    }}
                                  >
                                    <Link href={issue.url}>
                                      <Text>{issue.title}</Text>
                                    </Link>
                                    {" | "}
                                    <Link href={issue.url}>
                                      <Text
                                        css={{
                                          display: "inline-block",
                                          color: "$gray700",
                                        }}
                                      >
                                        {issue.repository}
                                      </Text>
                                    </Link>
                                  </Table.Cell>
                                  <Table.Cell>
                                    {issue.reactions.TOTAL ? (
                                      <Row justify={"flex-end"}>
                                        <ReactionHolder>
                                          <ReactionFullAmount>
                                            {issue.reactions.TOTAL === 100
                                              ? "100+"
                                              : issue.reactions.TOTAL}
                                          </ReactionFullAmount>
                                          <Reaction
                                            num={issue.reactions.LAUGH}
                                            icon="😄"
                                          />
                                          <Reaction
                                            num={issue.reactions.HOORAY}
                                            icon="🎉"
                                          />
                                          <Reaction
                                            num={issue.reactions.CONFUSED}
                                            icon="😕"
                                          />
                                          <Reaction
                                            num={issue.reactions.HEART}
                                            icon="❤️"
                                          />
                                          <Reaction
                                            num={issue.reactions.EYES}
                                            icon="👀"
                                          />
                                          <Reaction
                                            num={issue.reactions.ROCKET}
                                            icon="🚀"
                                          />
                                          <Reaction
                                            num={issue.reactions.THUMBS_DOWN}
                                            icon="👎"
                                          />
                                          <Reaction
                                            num={issue.reactions.THUMBS_UP}
                                            icon="👍"
                                          />
                                        </ReactionHolder>
                                      </Row>
                                    ) : null}
                                  </Table.Cell>
                                </Table.Row>
                              );
                            })}
                          </Table.Body>
                        </Table>
                      </React.Fragment>
                    );
                  })
                )}
              </>
            ) : (
              <Container>
                <Spacer y={5} />
                <Text
                  color={"$gray800"}
                  size={12}
                  css={{
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}
                >
                  <Link
                    css={{ color: "$gray800" }}
                    onClick={() => addAttribute(`repo:${randomRepoSuggestion}`)}
                  >
                    <span
                      style={{
                        color: "$gray800",
                        display: "inline-block",
                      }}
                    >
                      Select some repositories to display the active issues. How
                      about
                    </span>
                    <Badge
                      css={{ margin: "0 5px" }}
                      disableOutline
                      variant="flat"
                      isSquared
                      size={"xs"}
                    >
                      {randomRepoSuggestion}
                    </Badge>
                    <span
                      style={{
                        color: "$gray800",
                        display: "inline-block",
                      }}
                    >
                      ?
                    </span>
                  </Link>
                </Text>
                <Spacer y={5} />
              </Container>
            )}
          </Grid.Container>
        ) : (
          <Container>
            <Spacer y={6} />
            <Row justify={"center"}>
              <Loading
                css={{
                  "--nextui--loadingColor": "#000",
                }}
                type={"points"}
              />
            </Row>
            <Spacer y={6} />
          </Container>
        )}
      </Container>
    </main>
  );
}
