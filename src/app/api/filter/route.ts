import { prisma } from "@/app/db";

export async function GET(request: Request) {
  const labels = (await prisma.label.findMany()).map((label) => label.name);
  const repos = (
    await prisma.repository.findMany({
      select: {
        name: true,
      },
      where: {
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
        items: repos.sort(function (a, b) {
          return a.toLowerCase().localeCompare(b.toLowerCase());
        }),
        color: "primary",
      },
      libraries: {
        title: "Relates to",
        key: "library",
        items: libraries,
        color: "secondary",
      },
      labels: {
        title: "Stack",
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
