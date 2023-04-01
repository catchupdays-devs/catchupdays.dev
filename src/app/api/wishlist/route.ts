import { WishlistResponse } from "@/app/types";

import { PrismaClient } from "@prisma/client";

const { Octokit } = require("@octokit/core");

const TESTING = false;

const prisma = new PrismaClient();
const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});

const getRepoIssues = async (owner: string, repo: string) => {
  const response = await octokit.graphql(
    `
      query($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          issues(
            first: 20
            filterBy: { labels: ["catchup-days", "good-first-issue", "good first issue"] }
            orderBy: { direction: DESC, field: COMMENTS }
          ) {
            edges {
              node {
                id
                url
                title
                bodyHTML
                createdAt
                updatedAt
                author {
                  login
                  avatarUrl
                }
                reactionGroups {
                  content
                  reactors(first: 100) {
                    edges {
                      __typename
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      owner,
      name: repo,
    }
  );

  return {
    [`${owner}/${repo}`]: response.repository.issues.edges.map(({ node }) => {
      return {
        title: node.title,
        body: node.body,
        createdAt: node.createdAt,
        updatedAt: node.updatedAt,
        author: node.author?.login
          ? {
              login: node.author?.login,
              avatarUrl: node.author?.avatarUrl,
            }
          : undefined,
        url: node.url,
        id: node.id,
        reactions: node.reactionGroups.reduce(
          (prev, curr) => {
            return {
              ...prev,
              [curr.content]: curr.reactors.edges.length,
            };
          },
          {
            TOTAL: node.reactionGroups.reduce((prev, curr) => {
              return prev + curr.reactors.edges.length;
            }, 0),
          }
        ),
      };
    }),
  };
};

export async function GET(request: Request) {
  if (TESTING) {
    return new Response(JSON.stringify([]));
  } else {
    const url = new URL(request.url);
    const repos = url.searchParams.getAll("repo");
    const languages = url.searchParams.getAll("language");
    const libraries = url.searchParams.getAll("library");
    const labels = url.searchParams.getAll("label");

    const repositoryListToQuery = repos.length
      ? (
          await prisma.repository.findMany({
            where: {
              OR: [
                ...repos.map((repo) => ({
                  name: repo,
                })),
              ],
            },
          })
        ).map((repo) => repo.name)
      : (
          await prisma.repository.findMany({
            where: {
              OR: [
                ...languages.map((lang) => ({
                  languages: { some: { language: { name: lang } } },
                })),
                ...libraries.map((lib) => ({
                  libraries: { some: { library: { name: lib } } },
                })),
                ...labels.map((label) => ({
                  labels: { some: { label: { name: label } } },
                })),
              ],
            },
          })
        ).map((repo) => repo.name);

    const issuesOfAllRepos = await Promise.all(
      repositoryListToQuery.map((repo) => {
        const [owner, name] = repo.split("/");
        return getRepoIssues(owner, name);
      })
    );

    const issues: unknown[] = issuesOfAllRepos
      .flatMap((repoIssues) =>
        Object.entries(repoIssues).reduce((prev, [repo, issues]) => {
          return [
            ...prev,
            issues.map((issues) => {
              return {
                repository: repo,
                ...issues,
              };
            }),
          ];
        }, [])
      )
      .flatMap((i) => i);

    issues.sort((issueA, issueB) => {
      return issueB?.reactions?.TOTAL - issueA?.reactions?.TOTAL;
    });

    await prisma.$disconnect();

    return new Response(
      JSON.stringify({ issues, repos: repositoryListToQuery })
    );
  }
}
