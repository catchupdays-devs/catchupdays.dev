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
          owner {
            avatarUrl
          }
          issues(
            first: 20
            filterBy: { labels: ["catchup-days", "good-first-issue", "good first issue"] }
            orderBy: { direction: DESC, field: COMMENTS }
            states: [OPEN]
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
                reactions(first: 100) {
                  nodes {
                    content
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
    [`${owner}/${repo}`]: response.repository.issues.edges.map(
      ({
        node,
      }: {
        node: {
          title: string;
          body: string;
          createdAt: string;
          updatedAt: string;
          author?: { login: string; avatarUrl: string };
          owner?: { login: string; avatarUrl: string };
          url: string;
          id: string;
          reactions: { nodes: { content: string }[] };
        };
      }) => {
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
          owner: response.repository.owner?.avatarUrl
            ? {
                avatarUrl: response.repository.owner?.avatarUrl,
              }
            : undefined,
          url: node.url,
          id: node.id,
          reactions: node.reactions.nodes.reduce(
            (prev: Record<string, number>, curr) => {
              if (prev[curr.content]) {
                return {
                  ...prev,
                  [curr.content]: prev[curr.content] + 1,
                };
              } else {
                return {
                  ...prev,
                  [curr.content]: 1,
                };
              }
            },
            {
              TOTAL: node.reactions.nodes.length,
            }
          ),
        };
      }
    ),
  };
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const repos = url.searchParams.getAll("repo");
  const languages = url.searchParams.getAll("language");
  const libraries = url.searchParams.getAll("library");
  const labels = url.searchParams.getAll("label");

  let repositoryListToQuery;

  if (repos.length) {
    repositoryListToQuery = (
      await prisma.repository.findMany({
        where: {
          OR: [
            ...repos.map((repo) => ({
              name: repo,
            })),
          ],
        },
        include: {
          labels: { select: { label: true } },
          libraries: { select: { library: true } },
          languages: { select: { language: true } },
        },
      })
    )
      .filter((repo) => {
        return repo.labels.reduce((prev, label) => {
          return prev || labels.includes(label.label.name);
        }, labels.length === 0);
      })
      .filter((repo) => {
        return repo.libraries.reduce((prev, library) => {
          return prev || libraries.includes(library.library.name);
        }, libraries.length === 0);
      })
      .filter((repo) => {
        return repo.languages.reduce((prev, language) => {
          return prev || languages.includes(language.language.name);
        }, languages.length === 0);
      })
      .map((repo) => repo.name);
  } else {
    repositoryListToQuery = (
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
        include: {
          labels: { select: { label: true } },
          libraries: { select: { library: true } },
          languages: { select: { language: true } },
        },
      })
    )
      .filter((repo) => {
        return repo.labels.reduce((prev, label) => {
          return prev || labels.includes(label.label.name);
        }, labels.length === 0);
      })
      .filter((repo) => {
        return repo.libraries.reduce((prev, library) => {
          return prev || libraries.includes(library.library.name);
        }, libraries.length === 0);
      })
      .filter((repo) => {
        return repo.languages.reduce((prev, language) => {
          return prev || languages.includes(language.language.name);
        }, languages.length === 0);
      })
      .map((repo) => repo.name);
  }

  const repositoryListToIgnored = repositoryListToQuery.slice(10);
  repositoryListToQuery = repositoryListToQuery.slice(0, 10);

  const issuesOfAllRepos = await Promise.all(
    repositoryListToQuery.map((repo) => {
      const [owner, name] = repo.split("/");
      return getRepoIssues(owner, name);
    })
  );

  const issues: unknown[] = issuesOfAllRepos
    .flatMap((repoIssues) =>
      Object.entries(repoIssues).reduce((prev: any[], [repo, issues]) => {
        return [
          ...prev,
          issues.map((issues: any) => {
            return {
              repository: repo,
              ...issues,
            };
          }),
        ];
      }, [])
    )
    .flatMap((i) => i);

  issues.sort((issueA: any, issueB: any) => {
    return issueB?.reactions?.TOTAL - issueA?.reactions?.TOTAL;
  });

  await prisma.$disconnect();

  return new Response(
    JSON.stringify({
      issues,
      repos: repositoryListToQuery,
      ignoredRepos: repositoryListToIgnored,
    })
  );
}
