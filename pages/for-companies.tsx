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
          Did you know that your application can consist from open source
          libraries and components from up to 90 %. That&apos;s a massive
          number, so we better make sure it&apos;s a top-notch code.
        </Text>
        <Spacer y={2} />
      </Container>
      <Container xs>
        <Text>
          <strong>Let's start with how we can help you!</strong> What we do is
          help companies setup the process of working on critical open-source
          libraries used within the organization. We do that in several ways:
        </Text>
        <ul>
          <li>
            By working closely with the company to create process for the
            employees to be able to contribute in OS, and improve the process
            over time to fit your organization the best.
          </li>
          <li>
            By providing companies with the custom{" "}
            <Link href={"/wishlist"}>wishlist</Link> curated specifically for
            the needs of the company, listing only the critical issues of
            open-source the organization is using.
          </li>
          <li>
            By providing companies with way to advertise on many GitHub
            repositories of open-source software they are using at the same
            time.
          </li>
        </ul>
        <Text>
          Before moving forward, you can quickly go through all the{" "}
          <Underline>opportunities</Underline> hidden in contributing to
          open-source that might not be obvious at first, listed for each party
          involved.
        </Text>
        <Collapse title="The Benefits" bordered css={{ background: "#fff" }}>
          <Text h4>The companies can benefit from:</Text>
          <ul>
            <li>
              By building better apps for their customers. We can't stress this
              enough, whatever SaaS you're building, majority of the code you
              ship is OS code that you choose to use. It's in your best interest
              for this software to be stable, tested, secure, and top-notch
              overall.
            </li>
            <li>
              Let's be honest - the freedom to work on OS is a neat company
              benefit for many, if not most, of your employees. It's also a
              great for their well-being, switching to something out-of-the-box
              from time to time.
            </li>
            <li>
              Better understanding of critical tools kept within the
              organization.
            </li>
            <li>
              Giving freedom to the employees to take decisions mean getting the
              best ideas from the bottom-up.
            </li>
            <li>It's simply a good PR...</li>
          </ul>
          <Text>
            We might be repeating ourselves a little going further, but let's go
            on.
          </Text>
          <Text h4>The employees can benefit from:</Text>
          <ul>
            <li>Better understanding of tools you use daily.</li>
            <li>
              Better, more stable and secure apps you're building for a living.
            </li>
            <li>
              Public record of the contributions you've done to OS - often
              better than a well filled up CV.
            </li>
            <li>
              Change of focus - honestly, everyone needs that from time to time.
              It's simply critical for preventing burnout, and for mental
              well-being in general.
            </li>
            <li>
              Giving back to the community that indirectly supports you in your
              career every day.
            </li>
            <li>
              Opportunities to become a maintainer for the tools you love, and
              be part of the decisions.
            </li>
            <li>Learning.</li>
          </ul>
          <Text>
            The benefits for the OS probably don't need to be listed here, but
            if you're still interested, check what the{" "}
            <Link href={"/for-maintainers"}>
              maintainers get by working with us
            </Link>
            .
          </Text>
        </Collapse>
        <Spacer y={1} />
        <Text>Anyways, let's start with the first point.</Text>
        <Spacer y={2} />
        <Subtitle>The process setup</Subtitle>
        <Text>
          The organizations working with us are usually relative large (100-1000
          employees). That being said, it's not a trivial task to setup the
          process of contributing to OS in a way where employees are happy and
          have enough freedom to choose what they want to work on, while keeping
          the companys' best interests in mind at all times.
        </Text>
        <Text>
          We've been through this process, and we keep improving the best
          practices while actively collecting feedback from all the companies
          working with us. Every organization is different, and each company
          culture is different, so the process needs to be built and adjusted
          for each use case to fit the best - we're here to help with that.
        </Text>
        <Text>
          This is always done in close collaboration with the company. In fact,
          we prefer to work with and <Circled>Catchup&nbsp;Days</Circled>{" "}
          ambassador - a company insider (usually an engineer), who takes care
          of all day-to-day things, and serves as a link between us and the
          company.
        </Text>
        <Spacer y={2} />
        <Subtitle>Critical dependencies</Subtitle>
        <Text>
          We get it - open-source is cool and all, but the company business
          comes first. Without it, there is simply no company.
        </Text>
        <Text>
          That's why we create{" "}
          <Link href={"/wishlist"}>custom curated wishlist</Link> for each
          company working with us, where employees can filter the burning issues
          only for the software your company is relying on. You choose what OS
          is critical to you, and we make sure the maintainers keep the wishlist
          up to date. Everyone's happy!
        </Text>
        <Subtitle>Advertise!</Subtitle>
        <Text>
          Not convinced yet? You can advertise with us. The GitHub repositories
          and documentation sites of all those open-source organizations are
          mainly visited by devs, so it's perfect opportunity to for you to
          advertise if you're in need of a skilled workers using the same stack
          you are.
        </Text>
        <Text>
          By working with us, you'll get access to a{" "}
          <Underline>very&nbsp;specific</Underline> advertisement network that
          you can't find anywhere else. Of course, this is totally optional and
          additional benefit, where the funds are use fully for supporting all
          the OS you choose to advertise on.
        </Text>
        <Spacer y={2} />
        <Text>
          Whether you're an engineer, engineering manager or CTO, reach out and
          let's see how we can help each other. In fact, especially
        </Text>
      </Container>
      <SignupForm formKey={"xzbqjjog"} preselectedRole={"business"} />
    </main>
  );
}
