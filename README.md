This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, create a `.env.local` file with `GH_TOKEN=XXX` token. You can get the token at https://github.com/settings/tokens/new.

Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

To edit the dev database, run `npm run prisma:studio-dev` or equivalent.

### Good to know
Due to constrains from Prisma, in case of changes to the DB schema, the changes need to be currently made in two places (`./prisma/schema.prisma` and `./prisma/schema.dev.prisma`) for them to be valid.
However, since the access to production DB is limited, apply changes on the `schema.dev.prisma` file only, and the reviewer will take care of necessary migrations if needed.

The production website is using a kv store to cache the results from GH for 24 hours. 
This is disabled in the development version completely, and all results are pulled from GH directly (may seem slow to load).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!