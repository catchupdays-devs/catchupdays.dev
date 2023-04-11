import { Container, Text, Spacer } from "@nextui-org/react";
import Head from "next/head";
import React from "react";
import { SignupForm } from "@/app/components/SignupForm";
import {
  Subtitle,
  Title,
  Link,
  Underline,
  Circled,
} from "@/app/components/Text";

export default function Index() {
  return (
    <main>
      <Head>
        <title>For Maintainers | Catchup Days</title>
        <meta
          property="og:title"
          content="For Maintainers | Catchup Days"
          key="title"
        />
      </Head>
      <Container xs>
        <Spacer y={4} />
        <Title>For Maintainers</Title>
        <Text
          color={"$gray800"}
          size={20}
          css={{
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Let's face it - the open-source is broken. The biggest open-source
          users rely on it for their business, yet just a fraction supports
          those projects in any way. Let's change that.
        </Text>
        <Spacer y={2} />
      </Container>
      <Container xs>
        <Text>
          <strong>Let&apos;s start with how we can help you!</strong> What we do
          is help maintainers develop their projects by connecting them to the
          companies relying on their software. We do that in two ways:
        </Text>
        <ul>
          <li>
            By making it possible for employees of companies around the world to
            dedicate their time to your project development periodically.
          </li>
          <li>
            By providing companies with a ways to advertise on your projects
            website/repository.
          </li>
        </ul>
        <Text>Let&apos;s start with the first point.</Text>
        <Spacer y={2} />
        <Subtitle>Get More Collaborators</Subtitle>
        <Text>
          How this works is that companies, in good faith, agree for their
          employees to dedicate time to open-source during working hours. After
          all, making this software the best version of itself is in their best
          interest. This usually takes a format of recurring (~ monthly) events,
          where employees can take a day or two to work on open-source projects,
          but it differs from company to company.
        </Text>
        <Text>
          It's entirely up to the employee what the said project would be, or
          whether they will participate​ at all, but as you can guess, many feel
          the need to give back to the community.
        </Text>
        <Text>
          The next step is to discover how they can help. This is where the{" "}
          <Link href={"/wishlist"}>wishlist</Link> comes in. Wishlist is a place
          where you can filter opened issues on certain repositories, or
          additional criteria. Every company signed up has a curated filter
          setup as well, where they can filter through specific repositories the
          company is using in their codebase.
        </Text>
        <Text>
          <Underline>This is where we need your help</Underline>. Since the
          employee's time is limited to some extent (up to the company to
          decide, but usually two days a month), the issues need to be something
          that can be done quickly. After all, leaving work half-done and lying
          around for a month is never good.
        </Text>
        <Text>
          That&apos;s why we filter the issues with <code>catchup days</code>,{" "}
          <code>good first issue</code> and <code>help wanted</code> labels.
          Since a maintainer is the best person to decide on what is a good
          issue for a&nbsp;limited time, we would ask you to actively curate the
          issues on your repositories and assign labels accordingly.
        </Text>
        <Text>Now, let&apos;s talk money...</Text>
        <Spacer y={2} />
        <Subtitle>Get Financial Support</Subtitle>
        <Text>
          Every open-source collaborating with us can place a little banner
          advertising Catchup Days on their GitHub repository or their
          documentation site. This is entirely optional but encouraged. This
          banner is mainly used to promote the{" "}
          <Circled>Catchup&nbsp;Days</Circled> initiative further and randomly
          advertise other open-source projects collaborating with us. OS
          projects helping other OS projects - isn't that great?!
        </Text>
        <Text>
          But back to business - we also offer this advertising space to
          companies collaborating with us, who can pay to place their
          advertisement (usually job offers) on your repository for a specific
          time. Any time this happens, the funds are entirely donated to the
          open-source projects involved through the means we agree on (Open
          Collective, GitHub Sponsors, etc.).
        </Text>
      </Container>
      <SignupForm formKey={"xzbqjjog"} preselectedRole={"maintainer"} />
    </main>
  );
}
