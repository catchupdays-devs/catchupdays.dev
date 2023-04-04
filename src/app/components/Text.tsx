import { styled } from "@stitches/react";

export const MainTitle = styled("h1", {
  textAlign: "center",
  lineHeight: 1.2,
  fontWeight: "900",
  fontSize: "12vw",
  width: "100%",

  span: {
    fontSize: "11.9vw",
    display: "inline-block",
  },

  "@media only screen and (min-width: 520px)": {
    fontSize: "8vw",

    span: {
      fontSize: "8vw",
    },
  },

  "@media only screen and (min-width: 1280px)": {
    fontSize: "100px",

    span: {
      fontSize: "100px",
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
