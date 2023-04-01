import { WishlistResponse } from "@/app/types";

const { Octokit } = require("@octokit/core");

const TESTING = false;

const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});

const testData = [
  {
    url: "https://api.github.com/repos/swup/swup/issues/639",
    repository_url: "https://api.github.com/repos/swup/swup",
    labels_url:
      "https://api.github.com/repos/swup/swup/issues/639/labels{/name}",
    comments_url: "https://api.github.com/repos/swup/swup/issues/639/comments",
    events_url: "https://api.github.com/repos/swup/swup/issues/639/events",
    html_url: "https://github.com/swup/swup/issues/639",
    id: 164789833737,
    node_id: "I_kwDOBlayi85iN_KJ",
    number: 639,
    title: "Some nice little title of the issue",
    user: {
      login: "gmrchk",
      id: 9338324,
      node_id: "MDQ6VXNlcjkzMzgzMjQ=",
      avatar_url: "https://avatars.githubusercontent.com/u/9338324?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/gmrchk",
      html_url: "https://github.com/gmrchk",
      followers_url: "https://api.github.com/users/gmrchk/followers",
      following_url:
        "https://api.github.com/users/gmrchk/following{/other_user}",
      gists_url: "https://api.github.com/users/gmrchk/gists{/gist_id}",
      starred_url: "https://api.github.com/users/gmrchk/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/gmrchk/subscriptions",
      organizations_url: "https://api.github.com/users/gmrchk/orgs",
      repos_url: "https://api.github.com/users/gmrchk/repos",
      events_url: "https://api.github.com/users/gmrchk/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/gmrchk/received_events",
      type: "User",
      site_admin: false,
    },
    labels: [[Object]],
    state: "open",
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 0,
    created_at: "2023-03-30T15:16:32Z",
    updated_at: "2023-03-30T15:16:32Z",
    closed_at: null,
    author_association: "MEMBER",
    active_lock_reason: null,
    body: "Just a test...",
    reactions: {
      url: "https://api.github.com/repos/swup/swup/issues/639/reactions",
      total_count: 10,
      "+1": 0,
      "-1": 0,
      laugh: 0,
      hooray: 0,
      confused: 3,
      heart: 0,
      rocket: 5,
      eyes: 1,
    },
    timeline_url: "https://api.github.com/repos/swup/swup/issues/639/timeline",
    performed_via_github_app: null,
    state_reason: null,
  },
  {
    url: "https://api.github.com/repos/swup/swup/issues/639",
    repository_url: "https://api.github.com/repos/swup/swup",
    labels_url:
      "https://api.github.com/repos/swup/swup/issues/639/labels{/name}",
    comments_url: "https://api.github.com/repos/swup/swup/issues/639/comments",
    events_url: "https://api.github.com/repos/swup/swup/issues/639/events",
    html_url: "https://github.com/swup/swup/issues/639",
    id: 164782333737,
    node_id: "I_kwDOBlayi85iN_KJ",
    number: 639,
    title: "TEST",
    user: {
      login: "gmrchk",
      id: 9338324,
      node_id: "MDQ6VXNlcjkzMzgzMjQ=",
      avatar_url: "https://avatars.githubusercontent.com/u/9338324?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/gmrchk",
      html_url: "https://github.com/gmrchk",
      followers_url: "https://api.github.com/users/gmrchk/followers",
      following_url:
        "https://api.github.com/users/gmrchk/following{/other_user}",
      gists_url: "https://api.github.com/users/gmrchk/gists{/gist_id}",
      starred_url: "https://api.github.com/users/gmrchk/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/gmrchk/subscriptions",
      organizations_url: "https://api.github.com/users/gmrchk/orgs",
      repos_url: "https://api.github.com/users/gmrchk/repos",
      events_url: "https://api.github.com/users/gmrchk/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/gmrchk/received_events",
      type: "User",
      site_admin: false,
    },
    labels: [[Object]],
    state: "open",
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 0,
    created_at: "2023-03-30T15:16:32Z",
    updated_at: "2023-03-30T15:16:32Z",
    closed_at: null,
    author_association: "MEMBER",
    active_lock_reason: null,
    body: "Just a test...",
    reactions: {
      url: "https://api.github.com/repos/swup/swup/issues/639/reactions",
      total_count: 1,
      "+1": 0,
      "-1": 0,
      laugh: 0,
      hooray: 0,
      confused: 0,
      heart: 0,
      rocket: 0,
      eyes: 1,
    },
    timeline_url: "https://api.github.com/repos/swup/swup/issues/639/timeline",
    performed_via_github_app: null,
    state_reason: null,
  },
  {
    url: "https://api.github.com/repos/swup/swup/issues/639",
    repository_url: "https://api.github.com/repos/swup/swup",
    labels_url:
      "https://api.github.com/repos/swup/swup/issues/639/labels{/name}",
    comments_url: "https://api.github.com/repos/swup/swup/issues/639/comments",
    events_url: "https://api.github.com/repos/swup/swup/issues/639/events",
    html_url: "https://github.com/swup/swup/issues/639",
    id: 16423833737,
    node_id: "I_kwDOBlayi85iN_KJ",
    number: 639,
    title: "TEST",
    user: {
      login: "gmrchk",
      id: 9338324,
      node_id: "MDQ6VXNlcjkzMzgzMjQ=",
      avatar_url: "https://avatars.githubusercontent.com/u/9338324?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/gmrchk",
      html_url: "https://github.com/gmrchk",
      followers_url: "https://api.github.com/users/gmrchk/followers",
      following_url:
        "https://api.github.com/users/gmrchk/following{/other_user}",
      gists_url: "https://api.github.com/users/gmrchk/gists{/gist_id}",
      starred_url: "https://api.github.com/users/gmrchk/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/gmrchk/subscriptions",
      organizations_url: "https://api.github.com/users/gmrchk/orgs",
      repos_url: "https://api.github.com/users/gmrchk/repos",
      events_url: "https://api.github.com/users/gmrchk/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/gmrchk/received_events",
      type: "User",
      site_admin: false,
    },
    labels: [[Object]],
    state: "open",
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 0,
    created_at: "2023-03-30T15:16:32Z",
    updated_at: "2023-03-30T15:16:32Z",
    closed_at: null,
    author_association: "MEMBER",
    active_lock_reason: null,
    body: "Just a test...",
    reactions: {
      url: "https://api.github.com/repos/swup/swup/issues/639/reactions",
      total_count: 1,
      "+1": 0,
      "-1": 0,
      laugh: 0,
      hooray: 0,
      confused: 0,
      heart: 0,
      rocket: 0,
      eyes: 1,
    },
    timeline_url: "https://api.github.com/repos/swup/swup/issues/639/timeline",
    performed_via_github_app: null,
    state_reason: null,
  },
];

const getRepoIssues = async (owner: string, repo: string) => {
  const response = await octokit.graphql(
    `
      query {
        repository(owner: "swup", name: "swup") {
          issues(
            first: 20
            filterBy: { labels: ["catchup-days", "good-first-issue"] }
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
    `
  );

  return {
    [`${owner}/${repo}`]: response.repository.issues.edges.map(({ node }) => {
      return {
        title: node.title,
        body: node.body,
        createdAt: node.createdAt,
        updatedAt: node.updatedAt,
        author: {
          login: node.author.login,
          avatarUrl: node.author.avatarUrl,
        },
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
    return new Response(JSON.stringify(testData));
  } else {
    const repos = ["swup/swup"];
    const issuesOfAllRepos = await Promise.all(
      repos.map((repo) => {
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

    return new Response(JSON.stringify(issues));
  }
}
