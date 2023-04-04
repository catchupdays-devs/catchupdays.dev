import { styled } from "@stitches/react";
import bottle from "@/app/images/bottle.png";
import React from "react";
import { Card, Spacer, Text, useSSR, Button, Row } from "@nextui-org/react";

const mapArray = [...Array(24)];
const variantsArray: variants[] = [
  ...mapArray.map(() => "A"),
  ...mapArray.map(() => "B"),
];
type variants = "A" | "B";
const values: { [key: string]: number } = {};
const getRandomMemoNumber = (from: number, to: number, key: string) => {
  if (!values[key]) {
    values[key] = Math.round(Math.random() * (to - from) + from);
  }

  return values[key];
};

const Shadow = styled("div", {
  display: "block",
  position: "relative",
  overflow: "visible",
  padding: "20px",

  "& > div": {
    position: "relative",
    margin: "0 auto",
  },

  p: {
    margin: "0 auto",
  },

  "&:before": {
    content: "",
    display: "block",
    position: "absolute",
    top: "-50px",
    bottom: "-50px",
    right: "-30px",
    left: "-30px",
    zIndex: 0,
    backgroundImage:
      "radial-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, .8) 50%, rgba(255, 255, 255, 0) 70%, rgba(255, 255, 255, 0) 100%)",
  },
});

const Wrapper = styled("div", {
  display: "block",
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  //opacity: ".3",
  transition: ".3s ease",
  zIndex: -1,
});

const StyledCard = styled("div", {
  display: "block",
  position: "relative",
  overflow: "hidden",
  width: "100%",

  "@media (hover: hover)": {
    [`&:hover ${Wrapper} `]: {
      opacity: "1",
    },
  },
});

const BottleWrapper = styled("div", {
  display: "block",
  position: "absolute",
  width: "1px",
  height: "200px",
  bottom: 0,
  left: "50%",
  transformOrigin: "bottom center",

  variants: {
    positioning: {
      ...variantsArray.reduce((prev, variant, i) => {
        const index = i % mapArray.length;
        const distanceMultiplier = index % 3;

        return {
          ...prev,
          [`bottle${variant}${index}`]: {
            transform: `rotate(${index * (160 / mapArray.length) - 80}deg)`,
            zIndex: distanceMultiplier,
          },
        };
      }, {}),
    },
  },
});

const Bottle = styled("div", {
  display: "block",
  position: "absolute",
  bottom: 0,
  zIndex: 4,
  transition: ".4s ease",
  backgroundSize: "100% auto",
  backgroundImage: `url(${bottle.src})`,
  //filter: "grayscale(100%)",
  transformOrigin: "50% 50%",

  variants: {
    positioning: {
      ...variantsArray.reduce((prev, variant, i) => {
        const index = i % mapArray.length;
        const distanceMultiplier = index % 3;
        const reversedDistanceMultiplier = Math.abs(distanceMultiplier - 2);
        const min = 0 + 20 * (distanceMultiplier + 1);
        const max = 40 + 80 * (distanceMultiplier + 1);

        const size = distanceMultiplier * 10 + 10;

        return {
          ...prev,
          [`bottle${variant}${index}`]: {
            bottom: `${getRandomMemoNumber(
              min,
              max,
              `${variant + index}bottom`
            )}px`,
            width: `${size}px`,
            height: `${size * 1.2045}px`,
            transform: `rotate(${getRandomMemoNumber(
              -30,
              10,
              `${i}rotate`
            )}deg)`,
            zIndex: distanceMultiplier,
            filter: `blur(0.${reversedDistanceMultiplier * 3}px)`,

            "@media (hover: hover)": {
              [`${StyledCard}:hover &`]: {
                transform: `translate3d(0, ${getRandomMemoNumber(
                  -15 * (distanceMultiplier + 1),
                  -20 * (distanceMultiplier + 1),
                  `${variant + index}bottom2`
                )}px, 0) rotate(${getRandomMemoNumber(
                  -50,
                  30,
                  `${variant + index}rotate2`
                )}deg) scale(1.1)`,

                //filter: "grayscale(0%)",
              },
            },
          },
        };
      }, {}),
    },
  },
});

export const Bottles: React.FC = ({ variant, children }) => {
  const { isBrowser } = useSSR();

  return (
    <Wrapper suppressHydrationWarning>
      {children}
      {isBrowser &&
        mapArray.map((x, i) => (
          <BottleWrapper key={i} positioning={`bottle${variant}${i}`}>
            <Bottle positioning={`bottle${variant}${i}`} />
          </BottleWrapper>
        ))}
    </Wrapper>
  );
};

export const CardLink = ({
  title,
  text,
  href,
  variant,
  cta,
}: {
  variant: variants;
}) => {
  return (
    <Card variant="bordered" isPressable isHoverable href={href} as={"a"}>
      <StyledCard>
        <Shadow>
          <div>
            <Text
              h3
              weight={"black"}
              css={{
                textAlign: "center",
                width: "100%",
                textShadow: "#fff 0px 0px 40px",
              }}
            >
              {title}
            </Text>
            <Text
              css={{
                textAlign: "center",
                width: "280px",
                fontWeight: "700",
                textShadow: "#fff 0px 0px 40px",
              }}
            >
              {text}
            </Text>
          </div>
        </Shadow>
        <Spacer y={2} />
        <Row justify={"center"}>
          <Button
            color="black"
            bordered
            css={{
              background: "rgba(255, 255, 255, .9)",
              backdropFilter: "blur(2px);",
            }}
          >
            {cta}
          </Button>
        </Row>
        <Spacer y={2} />
        <Bottles variant={variant} />
      </StyledCard>
    </Card>
  );
};
