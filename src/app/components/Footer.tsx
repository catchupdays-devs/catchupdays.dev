import React from "react";
import { Container, Text, Row, Spacer, Grid } from "@nextui-org/react";
import { styled } from "@stitches/react";
import { default as NextLink } from "next/link";

export const Link = styled(NextLink, {
  textDecoration: "underline",
  //fontWeight: "bold",
  color: "var(--nextui-colors-gray600);",
  fontSize: "16px",
  margin: "0 20px 0 0",

  "@media only screen and (min-width: 520px)": {
    margin: "0 0 0 20px",
  },
});

export const Footer = () => {
  return (
    <Container sm>
      <Spacer y={6} />
      <Grid.Container gap={2} alignItems={"center"}>
        <Grid md={8} direction={"column"} alignItems={"flex-start"}>
          <Text
            color="$gray600"
            css={{
              textAlign: "left",
              fontSize: "16px",
              margin: "0",
              lineHeight: "1.2",
              //fontWeight: "bold",
            }}
          >
            Copyright © {new Date().getFullYear()} Open Source Software
            Institute z.ú. All rights reserved.
          </Text>
        </Grid>
        <Grid md={4} justify={"flex-end"}>
          <Link href={"/legal-notice"}>Legal</Link>
          <Link href={"mailto:hello@catchupdays.dev"}>Contact</Link>
        </Grid>
      </Grid.Container>
      <Spacer y={2} />
    </Container>
  );
};
