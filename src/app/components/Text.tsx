import { styled } from "@stitches/react";
import { default as NextLink } from "next/link";
import underline from "@/app/images/underline.svg";
import circled from "@/app/images/circled.svg";
import { Text } from "@nextui-org/react";
import React from "react";

export const MainTitle = styled("h1", {
  textAlign: "center",
  lineHeight: 1.2,
  fontWeight: "900",
  fontSize: "10vw",
  width: "100%",

  span: {
    fontSize: "10vw",
    display: "inline-block",
  },

  "@media only screen and (min-width: 520px)": {
    fontSize: "6vw",

    span: {
      fontSize: "6vw",
    },

    br: {
      display: "none",
    },
  },

  "@media only screen and (min-width: 1280px)": {
    fontSize: "65px",

    span: {
      fontSize: "65px",
    },
  },
});

export const Title = styled("h1", {
  textAlign: "center",
  lineHeight: 1.2,
  fontWeight: "900",
  fontSize: "40px",
  width: "100%",

  "@media only screen and (min-width: 520px)": {
    fontSize: "52px",
  },
});

export const Subtitle = styled("h1", {
  textAlign: "center",
  lineHeight: 1.2,
  fontWeight: "900",
  fontSize: "32px",

  span: {
    fontSize: "32px",
    fontWeight: "900",
    display: "inline-block",
  },

  "@media only screen and (min-width: 520px)": {
    fontSize: "40px",

    span: {
      fontSize: "40px",
    },
  },
});

export const Link = styled(NextLink, {
  textDecoration: "underline",
  fontWeight: "bold",
});

export const Underline = styled("span", {
  position: "relative",
  fontWeight: "bold",

  "&:after": {
    content: "",
    display: "block",
    position: "absolute",
    bottom: "-4px",
    left: "-3px",
    right: "-3px",
    height: "5px",
    background: `url(${underline.src})`,
    backgroundSize: "100% auto",
  },
});

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

export const WithGradient: React.FC<{
  black?: boolean;
  children: JSX.Element | string;
}> = ({ children, black }) => (
  <Text
    span
    css={{
      fontWeight: black ? "black" : "bold",
      textGradient: "135deg, $red600 -25%, $red800 85%, $red900 100%",
    }}
  >
    {children}
  </Text>
);
