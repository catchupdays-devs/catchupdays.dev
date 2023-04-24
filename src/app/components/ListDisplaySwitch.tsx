import { Button } from "@nextui-org/react";
import Image from "next/image";
import list from "@/app/images/list.svg";
import headlinedList from "@/app/images/headlined-list.svg";
import React from "react";

export const ListDisplaySwitch = (props: {
  onPress: (display: "list" | "headlinedList") => void;
  listDisplay: "list" | "headlinedList";
}) => {
  return (
    // @ts-ignore
    <Button.Group flat size={"sm"} color="neutral">
      <Button onPress={() => props.onPress("list")}>
        <Image
          style={{
            filter:
              props.listDisplay === "list"
                ? "drop-shadow(0 0 2px 2px rgb(0 0 0 / 0))"
                : "",
          }}
          src={list.src}
          alt="List"
          width={14}
          height={14}
          priority
        />
      </Button>
      <Button onPress={() => props.onPress("headlinedList")}>
        <Image
          style={{
            filter:
              props.listDisplay === "headlinedList"
                ? "drop-shadow(0 0 2px 2px rgb(0 0 0 / 0))"
                : "",
          }}
          src={headlinedList.src}
          alt="Headlined List"
          width={14}
          height={14}
          priority
        />
      </Button>
    </Button.Group>
  );
};
