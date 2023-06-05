import { PrismaClient } from "@prisma/client";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://eu1-true-wildcat-39814.upstash.io",
  token: process.env.UPSTASH_TOKEN!,
});

const { Octokit } = require("@octokit/core");

const prisma = new PrismaClient();
const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});
const formatIssuesResponse = (
  ideal: boolean,
  owner: string,
  repo: string,
  image: string,
  issues: any[]
) => {
  return {
    [`${owner}/${repo}`]: issues.map(
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
          ideal,
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
          owner: image
            ? {
                avatarUrl: image,
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

const getRepoIssues = async (owner: string, repo: string) => {
  const cachedIssues = await redis.get(`repo:${owner}:${repo}`);

  if (cachedIssues) {
    console.log(`KV store hit for repo ${owner}/${repo}`);

    return cachedIssues as any;
  }

  const idealIssuesResponse = await octokit.graphql(
    `
      query($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          owner {
            avatarUrl
          }
          issues(
            first: 20
            filterBy: { labels: ["catchup-days", "good-first-issue", "good first issue", "help wanted"] }
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

  if (idealIssuesResponse.repository.issues.edges.length) {
    const formattedIssues = formatIssuesResponse(
      true,
      owner,
      repo,
      idealIssuesResponse.repository.owner?.avatarUrl,
      idealIssuesResponse.repository.issues.edges
    );

    await redis.set(`repo:${owner}:${repo}`, JSON.stringify(formattedIssues), {
      ex: 60 * 60 * 24,
    });

    return formattedIssues;
  }

  const nonIdealIssuesResponse = await octokit.graphql(
    `
      query($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          owner {
            avatarUrl
          }
          issues(
            first: 20
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

  const formattedIssues = formatIssuesResponse(
    false,
    owner,
    repo,
    nonIdealIssuesResponse.repository.owner?.avatarUrl,
    nonIdealIssuesResponse.repository.issues.edges.slice(10)
  );

  await redis.set(`repo:${owner}:${repo}`, JSON.stringify(formattedIssues), {
    ex: 60 * 60 * 24,
  });

  return formattedIssues;
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
              isActive: true,
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
          isActive: true,
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

  const repositoryListToIgnored: string[] = [];

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
          // @ts-ignore
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
