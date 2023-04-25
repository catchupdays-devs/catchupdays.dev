import { Avatar, Link, Row, Table, Text } from "@nextui-org/react";
import { Reactions } from "@/app/components/Reactions";
import React from "react";
import { Issue } from "@/app/types";
import { keyframes, styled } from "@stitches/react";

export const fadeIn = keyframes({
  "0%": { transform: "translate3d(0, -4px, 0)", opacity: 0 },
  "100%": { transform: "translate3d(0, 0, 0)", opacity: 1 },
});

export const StyledTable = styled(Table, {
  //opacity: 0,
  animation: `${fadeIn} 300ms ease forwards`,
});

export const IssuesTable = (props: {
  issues: Issue[];
  displayLogos: boolean;
}) => {
  return (
    <StyledTable
      striped
      sticked
      compact
      selectionMode="none"
      aria-label="Wishlist based on filters above"
      css={{
        height: "auto",
        minWidth: "912px",
        background: "#fff",
      }}
    >
      <Table.Header>
        <Table.Column
          css={{
            display: props.displayLogos ? "50px" : "0px",
          }}
        >
          {" "}
        </Table.Column>
        <Table.Column>Title</Table.Column>
        {/*<Table.Column>Added</Table.Column>*/}
        {/*<Table.Column>Author</Table.Column>*/}
        <Table.Column
          css={{
            minWidth: "240px",
            textAlign: "right",
          }}
        >
          Reactions
        </Table.Column>
      </Table.Header>
      <Table.Body>
        {props.issues.map((issue) => (
          <Table.Row key={issue.id}>
            {props.displayLogos ? (
              <Table.Cell
                css={{
                  padding: "0",
                  maxWidth: "50px",
                }}
              >
                <Avatar size={"xs"} squared src={issue.owner?.avatarUrl} />
              </Table.Cell>
            ) : (
              <Table.Cell
                css={{
                  padding: "0",
                  maxWidth: "0",
                }}
              >
                {" "}
              </Table.Cell>
            )}
            <Table.Cell
              css={{
                maxWidth: "400px",
              }}
            >
              <Link href={issue.url}>
                <Text>{issue.title}</Text>
              </Link>
              {" | "}
              <Link href={issue.url}>
                <Text
                  css={{
                    display: "inline-block",
                    color: "$gray700",
                  }}
                >
                  {issue.repository}
                </Text>
              </Link>
            </Table.Cell>
            <Table.Cell>
              {issue.reactions.TOTAL ? (
                <Row justify={"flex-end"}>
                  <Reactions reactions={issue.reactions} />
                </Row>
              ) : null}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </StyledTable>
  );
};
