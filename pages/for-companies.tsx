import { Container, Text, Spacer, Collapse } from "@nextui-org/react";
import Head from "next/head";
import React from "react";
import { SignupForm } from "@/app/components/SignupForm";
import {
  Subtitle,
  Title,
  Link,
  Circled,
  Underline,
} from "@/app/components/Text";

export default function Index() {
  return (
    <main>
      <Head>
        <title>For Companies | Catchup Days</title>
        <meta
          property="og:title"
          content="For Companies | Catchup Days"
          key="title"
        />
      </Head>
      <Container xs>
        <Spacer y={4} />
        <Title>For Companies</Title>
        <Text
          color={"$gray800"}
          size={20}
          css={{
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Did you know a typical application consists of open-source libraries
          and components from 70 %? That&apos;s a massive number, so we better
          ensure it&apos;s a top-notch code.
        </Text>
        <Spacer y={2} />
      </Container>
      <Container xs>
        <Text>
          <strong>Let&apos;s start with how we can help you!</strong> We help
          companies set up the process of working on critical open-source
          libraries used within the organization. We do that in several ways:
        </Text>
        <ul>
          <li>
            By working closely with the company to create processes for the
            employees to contribute to open-source, and improve the process over
            time to fit your organization the best.
          </li>
          <li>
            By providing companies with a custom{" "}
            <Link href={"/wishlist"}>wishlist</Link> curated specifically for
            the needs of the company, listing only the issues of open-source
            libraries the company is using.
          </li>
          <li>
            Oh, and we also provide companies with way to advertise on many
            GitHub repositories of open-source software they use, but about that
            later.
          </li>
        </ul>
        <Text>
          Before you move forward, you can quickly go through all the{" "}
          <Underline>opportunities</Underline> hidden in contributing to
          open-source listed for each party involved, which might not be
          apparent at first.
        </Text>
        <Collapse title="The Benefits" bordered css={{ background: "#fff" }}>
          <Text h4>The companies can benefit from:</Text>
          <ul>
            <li>
              Building better apps for their customers. We can't stress this
              enough: whatever software you're making, most of the code you ship
              is the open-source code you choose to use. So it's in your best
              interest for this software to be stable, tested, secure, and
              top-notch.
            </li>
            <li>
              The freedom to work on open-source is a neat company benefit for
              many, if not most, of your employees. It's also great for their
              well-being, switching to something out-of-the-box occasionally.
            </li>
            <li>
              A better understanding of critical tools used within the company.
            </li>
            <li>
              Giving employees the freedom to make decisions means getting the
              best ideas from the bottom up.
            </li>
            <li>It&apos;s simply a good PR...</li>
          </ul>
          <Text>
            We might be repeating ourselves a little, but let's continue.
          </Text>
          <Text h4>The employees can benefit from:</Text>
          <ul>
            <li>A better understanding of tools they use daily.</li>
            <li>
              Better, more stable, and more secure apps they're building for
              a&nbsp;living.
            </li>
            <li>
              A public record of contributions to open-source is often better
              than a&nbsp;well-filled CV.
            </li>
            <li>
              Change of focus - preventing burnout and supporting mental
              well-being in general.
            </li>
            <li>
              Giving back to the community that indirectly supports their
              careers every day.
            </li>
            <li>
              Opportunities to become a maintainer for the tools they love,
              leading to being part of the design decisions the open-source
              takes.
            </li>
            <li>Learning.</li>
          </ul>
          <Text>
            The benefits for the open-source maintainers don't need to be listed
            here, but if you're still interested, check what{" "}
            <Link href={"/for-maintainers"}>
              maintainers get by working with us
            </Link>
            .
          </Text>
        </Collapse>
        <Spacer y={1} />
        <Text>Anyways, let&apos;s start with the first point.</Text>
        <Spacer y={2} />
        <Subtitle>The Process Setup</Subtitle>
        <Text>
          The organizations working with us are usually relatively large
          (100-1000 employees). That being said, it's not a trivial task to set
          up the process of contributing to open-source in a way where employees
          are happy and have enough freedom to choose what they want to work on
          while keeping the company's best interests in mind at all times.
        </Text>
        <Text>
          We've been through this process and keep improving the best practices
          while actively collecting feedback from all the companies working with
          us. Every organization and company culture is different, so the
          process needs to be built and adjusted for each use case to fit the
          best - we're here to help with that.
        </Text>
        <Text>
          This is always done in close collaboration with the company. We prefer
          to work with <Circled>Catchup Days</Circled> ambassador - a company
          insider (usually an engineer) who takes care of all day-to-day things
          and serves as a link between the company and us. In fact, it's usually
          this engineer who reaches out to us and kicks off the company's
          onboarding.
        </Text>
        <Spacer y={2} />
        <Subtitle>Critical Dependencies</Subtitle>
        <Text>
          We get it - open-source is cool, but the company business comes first.
          Without it, there is simply no company.
        </Text>
        <Text>
          That's why we create a{" "}
          <Link href={"/wishlist"}>custom curated wishlist</Link> for each
          company working with us, where employees can filter the burning issues
          only for the software your company is relying on. You choose what
          open-source is critical to you, and we ensure the maintainers keep the
          wishlist up-to-date. Everyone's happy!
        </Text>
        <Subtitle>Advertise!</Subtitle>
        <Text>
          Not convinced yet? We are also preparing a platform for advertising,
          which will be offered to the companies that work with us. GitHub
          repositories and documentation websites of all those open-source
          organizations are mainly visited by devs, so it's the perfect
          opportunity for you to promote your company if you need skilled
          workers using the same stack you are.
        </Text>
        <Text>
          By working with us, you'll get access to this super-specific
          advertisement network you can't find{" "}
          <Underline>anywhere&nbsp;else</Underline>. Additionally, profits from
          advertising are used entirely to support the open-source
          organization(s) you choose for advertising.
        </Text>
        <Spacer y={2} />
        <Text>
          Whether you're an engineer, engineering manager, HR manager, or CTO,
          leave us your e-mail, and let's kick off the ride together.
        </Text>
      </Container>
      <SignupForm formKey={"xzbqjjog"} preselectedRole={"business"} />
    </main>
  );
}
