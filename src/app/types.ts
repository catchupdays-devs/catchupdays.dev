export type TReactions = {
  TOTAL: number;
  THUMBS_UP: number;
  THUMBS_DOWN: number;
  LAUGH: number;
  HOORAY: number;
  CONFUSED: number;
  HEART: number;
  ROCKET: number;
  EYES: number;
};

export type Issue = {
  repository: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    login: string;
    avatarUrl: string;
  };
  owner?: {
    avatarUrl: string;
  };
  reactions: TReactions;
  url: string;
  id: string;
  ideal: boolean;
};

export type WishlistResponse = {
  banned: string[];
  featured: string[];
  issues: Issue[];
  repos: string[];
  ignoredRepos: string[];
};

export type FiltersResponse = Record<
  "repos" | "labels" | "languages" | "libraries",
  {
    title: string;
    key: string;
    items: string[];
    color: string;
  }
>;
