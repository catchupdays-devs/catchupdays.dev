export type WishlistResponse = {
  issues: {
    repository: string;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    author?: {
      login: string;
      avatarUrl: string;
    };
    reactions: {
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
    url: string;
    id: string;
  }[];
  repos: string[];
};

export type FiltersResponse = Record<
  string,
  {
    title: string;
    key: string;
    items: string[];
    color: string;
  }
>;
