import { styled } from "@stitches/react";
import circled from "@/app/images/circled.svg";
import { Badge, Card, Grid, Spacer, Text } from "@nextui-org/react";
import React from "react";

export const Circled = styled("span", {
  position: "relative",
  fontWeight: "bold",
  display: "inline-block",
  margin: "0 4px 0 2px",

  "&:before": {
    content: "",
    display: "block",
    position: "absolute",
    top: "-6px",
    bottom: "-8px",
    left: "-4px",
    right: "-4px",
    background: `url(${circled.src})`,
    backgroundSize: "100% auto",
    zIndex: "0",
    opacity: 0.6,
  },
});

const EntityBadge = ({ children }) => {
  return (
    <Badge
      size={"xl"}
      css={{
        margin: "0 auto -22px",
        zIndex: 2,
        color: "var(--nextui-colors-text)",
        borderColor: "var(--nextui-colors-border)",
        borderWidth: "1px",
      }}
      //color={"black"}
      variant="bordered"
    >
      {children}
    </Badge>
  );
};

export const Hero = () => {
  return (
    <Grid.Container gap={2} justify={"space-around"} alignItems={"flex-start"}>
      <Grid xs={12} sm={4} direction={"column"}>
        <EntityBadge>Companies</EntityBadge>
        <Card variant="bordered">
          <Card.Body css={{ paddingTop: "30px" }}>
            <Text css={{ margin: "0" }}>
              {/* 70 % of code shipped by companies consists of open-source parts.
              It's a critical part of any business.*/}
              Build better apps and keep <strong>customers happy</strong>.{" "}
              <br />
              Make your <strong>employees engaged</strong> and healthy. <br />
              <strong>Understand</strong> your code like never before.
            </Text>
          </Card.Body>
        </Card>
      </Grid>
      <Grid xs={12} sm={4} direction={"column"}>
        <Spacer
          y={4}
          css={{
            display: "none",
            "@xs": { display: "none" },
            "@sm": { display: "block" },
          }}
        />
        <EntityBadge>Employees</EntityBadge>
        <Card variant="bordered">
          <Card.Body css={{ paddingTop: "30px" }}>
            <Text h4>Become a better professional</Text>
            <Text css={{ margin: "0" }}>
              Understand your daily tools better. <br />
              Build your reputation with public contributions. <br />
              Become maintainer of popular OS you love.
            </Text>
          </Card.Body>
        </Card>
      </Grid>
      <Grid xs={12} sm={4} direction={"column"}>
        <Spacer
          y={8}
          css={{
            display: "none",
            "@xs": { display: "none" },
            "@sm": { display: "block" },
          }}
        />
        <EntityBadge>Maintainers</EntityBadge>
        <Card variant="bordered">
          <Card.Body css={{ paddingTop: "30px" }}>
            <Text h4>Hassle-free open-source development</Text>
            <Text css={{ margin: "0" }}>
              Get devs to help you build your OS. <br />
              Focus on roadmap and build better software, faster. <br />
              Get financial support from your biggest users. <br />
            </Text>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};
