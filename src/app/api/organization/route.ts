import { prisma } from "@/app/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const organization = url.searchParams.get("organization");

  if (!organization) {
    return new Response("{}", { status: 404 });
  }

  const org = await prisma.organization.findFirst({
    where: {
      url: organization,
      isActive: true,
    },
    include: {
      repositories: {
        select: {
          repository: true,
        },
      },
    },
  });

  if (!org) {
    return new Response("{}", { status: 404 });
  }

  const repos = org.repositories
    .filter((repo) => repo.repository.isActive)
    .map((repo) => repo.repository.name)
    .sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });

  await prisma.$disconnect();

  return new Response(
    JSON.stringify({
      repos,
    })
  );
}
