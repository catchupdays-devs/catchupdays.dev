import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const labels = (await prisma.label.findMany()).map((label) => label.name);
  const repos = (
    await prisma.repository.findMany({
      select: {
        name: true,
        isActive: true,
      },
    })
  ).map((label) => label.name);
  const libraries = (await prisma.library.findMany()).map((lib) => lib.name);
  const languages = (await prisma.language.findMany()).map((lang) => lang.name);

  await prisma.$disconnect();

  return new Response(
    JSON.stringify({
      repos: {
        title: "Repository",
        key: "repo",
        items: repos,
        color: "primary",
      },
      libraries: {
        title: "Libraries",
        key: "library",
        items: libraries,
        color: "secondary",
      },
      labels: {
        title: "Labels",
        key: "label",
        items: labels,
        color: "warning",
      },
      languages: {
        title: "Language",
        key: "language",
        items: languages,
        color: "success",
      },
    })
  );
}
