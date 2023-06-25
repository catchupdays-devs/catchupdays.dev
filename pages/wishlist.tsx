import {
  Container,
  Text,
  Spacer,
  Grid,
  Row,
  Loading,
  Badge,
  Link,
  Avatar,
  Tooltip,
} from "@nextui-org/react";
import Head from "next/head";
import { useQuery } from "react-query";
import { WishlistForm } from "@/app/components/WishlistForm";
import React, { useEffect, useState } from "react";
import { FiltersResponse, Issue, WishlistResponse } from "@/app/types";
import { ListDisplaySwitch } from "@/app/components/ListDisplaySwitch";
import { useFilters } from "@/app/components/useFilters";
import { fadeIn, IssuesTable } from "@/app/components/IssuesTable";
import { useListDisplay } from "@/app/components/useListDisplay";
import { Info, Star } from "lucide-react";
import { useIsAdmin } from "@/app/utils";

const processWishlistData = (
  data: WishlistResponse | undefined,
  isAdmin: boolean
) => {
  if (data) {
    const issues = isAdmin
      ? [...data?.issues]
      : [...data?.issues.filter((i) => !data.banned.includes(i.url))];

    const sortedIssues = [...issues];
    sortedIssues.sort(function (a, b) {
      return a.repository
        .toLowerCase()
        .localeCompare(b.repository.toLowerCase());
    });

    return {
      banned: data.banned,
      featured: data.featured,
      repos: data.repos,
      ignoredRepos: data?.ignoredRepos,
      issues: issues,
      issuesGroupedByRepo: sortedIssues.reduce((acc, issue) => {
        // @ts-ignore
        if (acc[issue.repository]) {
          return {
            ...acc,
            [issue.repository]: {
              // @ts-ignore
              issues: [...acc[issue.repository].issues, issue],
              ideal: issue.ideal,
            },
          };
        }

        return {
          ...acc,
          [issue.repository]: {
            issues: [issue],
            ideal: issue.ideal,
          },
        };
      }, {}) as Record<string, { issues: Issue[]; ideal: boolean }>,
    };
  }

  return {};
};

export default function Wishlist() {
  const isAdmin = useIsAdmin();

  const {
    activeAttributes,
    addAttribute,
    updateAttributes,
    deleteAttribute,
    resetAttributes,
    focusedAttribute,
    setFocusedAttribute,
  } = useFilters();
  const [listDisplay, setListDisplay] = useListDisplay();

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

  const { banned, featured, repos, ignoredRepos, issues, issuesGroupedByRepo } =
    processWishlistData(data, isAdmin);

  const [featuredList, setFeaturedList] = useState<string[]>(featured || []);
  useEffect(() => {
    if (featured) {
      setFeaturedList(featured);
    }
  }, [featured]);
  const featuredIssues = issues?.filter((i) => featuredList.includes(i.url));

  const [bannedList, setBannedList] = useState<string[]>(banned || []);
  useEffect(() => {
    if (banned) {
      setBannedList(banned);
    }
  }, [banned]);

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
            reset={resetAttributes}
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
      {!isFilterLoading && repos?.length && repos.length > 0 ? (
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
            {repos.map((repo) => {
              if (listDisplay === "headlinedList") {
                return (
                  <a href={`#${repo}`} key={repo}>
                    <Badge
                      css={{ margin: "0 0 5px 5px", cursor: "pointer" }}
                      disableOutline
                      variant="flat"
                      isSquared
                      size={"xs"}
                    >
                      {repo}
                    </Badge>
                  </a>
                );
              }

              return (
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
              );
            })}
            <div>
              <span
                style={{
                  display: "inline-block",
                  margin: "0 0 5px 0",
                }}
              >
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
            {repos?.length ? (
              <>
                <Row justify={"flex-end"}>
                  <ListDisplaySwitch
                    onPress={(display) => setListDisplay(display)}
                    listDisplay={listDisplay}
                  />
                </Row>
                {featuredIssues && featuredIssues.length ? (
                  <React.Fragment>
                    <Text
                      h4
                      css={{
                        textAlign: "left",
                        margin: "40px 0 5px 0",
                        lineHeight: 1,
                        verticalAlign: "middle",
                        display: "flex",
                        animation: `${fadeIn} 300ms ease forwards`,
                      }}
                    >
                      <Star
                        size={18}
                        style={{
                          display: "inline-flex",
                          margin: "0 4px 0 0",
                        }}
                      />
                      <span>Featured</span>
                    </Text>
                    <IssuesTable
                      banned={bannedList}
                      setBanned={setBannedList}
                      featured={featuredList}
                      setFeatured={setFeaturedList}
                      displayFullInfo={true}
                      issues={featuredIssues}
                    />
                    <Spacer y={2} />
                  </React.Fragment>
                ) : null}
                {listDisplay === "list" ? (
                  <IssuesTable
                    banned={bannedList}
                    setBanned={setBannedList}
                    featured={featuredList}
                    setFeatured={setFeaturedList}
                    issues={issues}
                    displayFullInfo={true}
                  />
                ) : (
                  Object.entries(issuesGroupedByRepo).map(([repo, group]) => {
                    return (
                      <React.Fragment key={repo}>
                        <Text
                          h4
                          css={{
                            textAlign: "left",
                            margin: "40px 0 5px 0",
                            lineHeight: 1,
                            verticalAlign: "middle",
                            display: "flex",
                            animation: `${fadeIn} 300ms ease forwards`,
                          }}
                          id={repo}
                        >
                          <Avatar
                            size={"sm"}
                            squared
                            src={group.issues[0].owner?.avatarUrl}
                            css={{
                              display: "inline-flex",
                              margin: "-4px 10px 4px -40px",
                            }}
                            bordered
                          />
                          <span>{repo}</span>
                          {!group.ideal ? (
                            <Tooltip
                              style={{
                                display: "inline-block",
                                margin: "0 0 0 8px",
                              }}
                              content={
                                "These issues might be not ideal. Maintainers don't currently have a well sorted list of good issues for outside devs."
                              }
                            >
                              <Info
                                style={{
                                  cursor: "pointer",

                                  //color: "var(--nextui-colors-red800)",
                                }}
                                size={18}
                              />
                            </Tooltip>
                          ) : null}
                        </Text>
                        <IssuesTable
                          banned={bannedList}
                          setBanned={setBannedList}
                          featured={featuredList}
                          setFeatured={setFeaturedList}
                          displayFullInfo={false}
                          issues={group.issues}
                        />
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
