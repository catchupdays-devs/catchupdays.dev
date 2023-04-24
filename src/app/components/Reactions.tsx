import { Tooltip } from "@nextui-org/react";
import React from "react";
import { styled } from "@stitches/react";
import { type TReactions } from "@/app/types";

const ReactionFullAmount = styled("span", {
  opacity: 1,
  transition: "opacity .2s ease",
  margin: "0 20px 0 0",
  //fontWeight: "bold",
});

const ReactionWrapper = styled("span", {
  margin: "0 0 0 -16px",
  background: "#fff",
  borderRadius: "50%",
  width: "26px",
  height: "26px",
  display: "inline-flex",
  textAlign: "center",
  boxShadow: "0 2px 4px rgba(0, 0, 0, .1)",
  transition: "margin .2s ease",
  flex: "1 1",
  justifyContent: "center",
  alignItems: "center",
});

const ReactionHolder = styled("span", {
  cursor: "default",

  [`&:hover ${ReactionWrapper}`]: {
    margin: "0 0 0 2px",
  },
  [`&:hover ${ReactionFullAmount}`]: {
    opacity: 0,
  },
});

const Reaction = ({ num, icon }: { num: number; icon: string }) => {
  if (!num) {
    return null;
  }

  return (
    <ReactionWrapper>
      <Tooltip content={num}>{icon}</Tooltip>
    </ReactionWrapper>
  );
};

export const Reactions = ({ reactions }: { reactions: TReactions }) => {
  return (
    <ReactionHolder>
      <ReactionFullAmount>
        {reactions.TOTAL === 100 ? "100+" : reactions.TOTAL}
      </ReactionFullAmount>
      <Reaction num={reactions.LAUGH} icon="😄" />
      <Reaction num={reactions.HOORAY} icon="🎉" />
      <Reaction num={reactions.CONFUSED} icon="😕" />
      <Reaction num={reactions.HEART} icon="❤️" />
      <Reaction num={reactions.EYES} icon="👀" />
      <Reaction num={reactions.ROCKET} icon="🚀" />
      <Reaction num={reactions.THUMBS_DOWN} icon="👎" />
      <Reaction num={reactions.THUMBS_UP} icon="👍" />
    </ReactionHolder>
  );
};
