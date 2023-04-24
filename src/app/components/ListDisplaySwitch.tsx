import { Button } from "@nextui-org/react";
import Image from "next/image";
import list from "@/app/images/list.svg";
import headlinedList from "@/app/images/headlined-list.svg";
import React from "react";
import { styled } from "@stitches/react";

const StyledButton = styled(Button, {
  position: "relative",

  "&:before": {
    content: "",
    display: "block",
    position: "absolute",
    top: "3px",
    left: "50%",
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    background: "#000",
    opacity: 0,
    transform: "translate3d(-2px, -4px, 0)",
    transition: ".2s",
  },

  variants: {
    active: {
      true: {
        "&:before": {
          opacity: 1,
          transform: "translate3d(-2px, 0, 0)",
        },
      },
    },
  },
});

export const ListDisplaySwitch = (props: {
  onPress: (display: "list" | "headlinedList") => void;
  listDisplay: "list" | "headlinedList";
}) => {
  return (
    // @ts-ignore
    <Button.Group flat size={"sm"} color="neutral">
      <StyledButton
        onPress={() => props.onPress("list")}
        active={props.listDisplay === "list"}
      >
        <Image src={list.src} alt="List" width={14} height={14} priority />
      </StyledButton>
      <StyledButton
        onPress={() => props.onPress("headlinedList")}
        active={props.listDisplay === "headlinedList"}
      >
        <Image
          src={headlinedList.src}
          alt="Headlined List"
          width={14}
          height={14}
          priority
        />
      </StyledButton>
    </Button.Group>
  );
};
