import {
  Container,
  Text,
  Spacer,
  Grid,
  Row,
  Loading,
  Badge,
  Link,
} from "@nextui-org/react";
import Head from "next/head";
import { useQuery } from "react-query";
import { WishlistForm } from "@/app/components/WishlistForm";
import React, { useState } from "react";
import { FiltersResponse, WishlistResponse } from "@/app/types";
import { ListDisplaySwitch } from "@/app/components/ListDisplaySwitch";
import { useFilters } from "@/app/components/useFilters";
import { IssuesTable } from "@/app/components/IssuesTable";
import { useListDisplay } from "@/app/components/useListDisplay";

const processWishlistData = (data: WishlistResponse | undefined) => {
  if (data) {
    return {
      repos: data.repos,
      ignoredRepos: data?.ignoredRepos,
      issues: data?.issues,
      issuesGroupedByRepo: data?.issues.reduce((acc, issue) => {
        // @ts-ignore
        if (acc[issue.repository]) {
          return {
            ...acc,
            // @ts-ignore
            [issue.repository]: [...acc[issue.repository], issue],
          };
        }

        return {
          ...acc,
          [issue.repository]: [issue],
        };
      }, {}) as Record<string, WishlistResponse["issues"]>,
    };
  }

  return {};
};

export default function Wishlist() {
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

  const { repos, ignoredRepos, issues, issuesGroupedByRepo } =
    processWishlistData(data);

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
            {repos.map((repo) => (
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
                {ignoredRepos?.length
                  ? `${ignoredRepos.length} repositories were ignored because the filter is too broad. `
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
            {repos?.length ? (
              <>
                <Row justify={"flex-end"}>
                  <ListDisplaySwitch
                    onPress={(display) => setListDisplay(display)}
                    listDisplay={listDisplay}
                  />
                </Row>
                {listDisplay === "list" ? (
                  <IssuesTable issues={issues} />
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
                        <IssuesTable issues={issues} />
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
