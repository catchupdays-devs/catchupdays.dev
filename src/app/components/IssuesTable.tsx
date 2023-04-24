import { Avatar, Link, Row, Table, Text } from "@nextui-org/react";
import { Reactions } from "@/app/components/Reactions";
import React from "react";
import { Issue } from "@/app/types";

export const IssuesTable = (props: { issues: Issue[] }) => {
  return (
    <Table
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
        <Table.Column> </Table.Column>
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
          <Table.Row>
            <Table.Cell
              css={{
                maxWidth: "50px",
              }}
            >
              <Avatar size={"xs"} squared src={issue.owner?.avatarUrl} />
            </Table.Cell>
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
    </Table>
  );
};
