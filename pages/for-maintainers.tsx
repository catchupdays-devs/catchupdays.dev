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
          Let&apos;s face it - the open-source is broken. The biggest users of
          any OS rely on it for their business, yet, just a fraction supports OS
          projects in&nbsp;any&nbsp;way. Let's change that.
        </Text>
        <Spacer y={2} />
      </Container>
      <Container xs>
        <Text>
          <strong>Let's start with how we can help you!</strong> What we do is
          help maintainers develop their projects by connecting them to the
          companies relying on their such software. We do that in two ways:
        </Text>
        <ul>
          <li>
            By making it possible for employees to periodically dedicate their
            time to you project development.
          </li>
          <li>
            By providing companies with a ways to advertise on your projects
            website/repository.
          </li>
        </ul>
        <Text>Let's start with the first point.</Text>
        <Spacer y={2} />
        <Subtitle>Get more collaborators</Subtitle>
        <Text>
          How this works is that companies, in good faith, agree for their
          employees to dedicate time to open-source during the working hours.
          After all, it's in their best interest to make this software the best
          version of itself. This usually takes a format of recurring (~montly)
          events, where employees can take a day or two to work on open-source
          projects, but differs from company to company.
        </Text>
        <Text>
          It's completely up to the employee what said project is going to be,
          or whether they are going to participate at all, but as you can guess,
          many feel the need to give back to the community.
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
          employee time is limited to some extent (up to the company to decide,
          but mostly 2 days a month), the issues need to be something that can
          be done is such short time. After all, it's never good to leave a work
          half done lying around for a month.
        </Text>
        <Text>
          That's why we filter the issues with <code>good first issue</code> and{" "}
          <code>catchup days</code> labels. Since you are the best person to
          decide on what is a good issue for a limited time, we would ask you to
          actively curate the issues on your repositories and assign labels
          accordingly.
        </Text>
        <Text>Now, let's talk money...</Text>
        <Spacer y={2} />
        <Subtitle>Get financial support</Subtitle>
        <Text>
          Every OS collaborating with us can place a little banner advertising
          Catchup&nbsp;Days on their GitHub repository, or their documentation
          site. This is completely optional, but encouraged. This banner is
          mainly used for promoting <Circled>Catchup&nbsp;Days</Circled>{" "}
          initiative further, and for randomly advertising other OS projects
          collaborating with us. OS projects helping other OS projects - isn't
          that great?!
        </Text>
        <Text>
          But back to business - we also offer this advertising space to
          companies collaborating with us, where they can pay to place their
          logo for certain time, on a chosen OS projects. Any time this happens,
          the funds are fully donated to the OS projects involved, through
          platform we agree on (Open Collective, GitHub Sponsors, etc.).
        </Text>
      </Container>
      <SignupForm formKey={"xzbqjjog"} preselectedRole={"maintainer"} />
    </main>
  );
}
