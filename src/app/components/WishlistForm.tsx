import React, { useEffect, useState } from "react";
import {
  Grid,
  Row,
  Spacer,
  Dropdown,
  Badge,
  Card,
  Text,
} from "@nextui-org/react";

const Input = ({ value }) => (
  <Card variant="flat" xs>
    <Card.Body xs>
      <div
        style={{
          display: "block",
          margin: "-4px 0 -12px 0",
        }}
      >
        <Text>{value}</Text>
      </div>
    </Card.Body>
  </Card>
);
const Label = ({
  text,
  color = "neutral",
  removeItem,
}: {
  text: string;
  color: string;
  removeItem: () => void;
}) => {
  return (
    <span
      style={{
        display: "inline-block",
        margin: "0 8px 8px 0",
      }}
    >
      <Badge
        color="neutral"
        variant="flat"
        content="&times;"
        enableShadow
        disableOutline
        size="sm"
        css={{
          cursor: "pointer",
          background: "$neutral",
          color: "#fff",
        }}
        onClick={removeItem}
      >
        <Badge color={color} disableOutline variant="flat" isSquared>
          {text}
        </Badge>
      </Badge>
    </span>
  );
};

const attributes = {
  repos: {
    title: "Repository",
    key: "repo",
    items: ["webpack/webpack", "vercel/next.js"],
    color: "primary",
  },
  libraries: {
    title: "Libraries",
    key: "library",
    items: ["React", "Vue"],
    color: "secondary",
  },
  labels: {
    title: "Labels",
    key: "label",
    items: ["FE", "BE"],
    color: "warning",
  },
  languages: {
    title: "Language",
    key: "language",
    items: ["JavaScript", "TypeScript", "GoLang", "Rust"],
    color: "success",
  },
};

export const WishlistForm = () => {
  const [inputText, setInputText] = useState([]);

  const [activeAttributes, setActiveAttributes] = React.useState(new Set([]));
  const updateAttributes = (type: string, attrs: typeof activeAttributes) => {
    const currentSet = new Set([...activeAttributes]);

    currentSet.forEach((a) => {
      if (!attrs.has(a) && a.includes(type)) {
        currentSet.delete(a);
      }
    });

    attrs.forEach((a) => {
      if (!currentSet.has(a)) {
        currentSet.add(a);
      }
    });

    setActiveAttributes(currentSet);
  };
  const deleteAttribute = (attr: string) => {
    const currentSet = new Set([...activeAttributes]);

    currentSet.forEach((a) => {
      if (a.includes(attr)) {
        currentSet.delete(a);
      }
    });

    setActiveAttributes(currentSet);
  };

  useEffect(() => {
    const attributesString = Array.from(activeAttributes).map((attribute) => {
      const typeOfKey = attribute.split(":")[0];
      const type = Object.values(attributes).find((a) => a.key === typeOfKey);

      return (
        <Label
          key={attribute}
          text={attribute}
          color={type.color}
          removeItem={() => deleteAttribute(attribute)}
        />
      );
    });

    setInputText(attributesString);
  }, [activeAttributes]);

  return (
    <Grid>
      <Row justify={"space-around"}>
        <Input value={inputText} />
      </Row>
      <Spacer y={1} />
      <Row justify={"flex-start"}>
        <Grid.Container gap={1} justify="start">
          {Object.entries(attributes).map(([key, value]) => {
            const activeOfType = value.items
              .filter((i) =>
                [...activeAttributes].includes(`${value.key}:${i}`)
              )
              .map((i) => `${value.key}:${i}`);

            return (
              <Grid key={key}>
                <Dropdown>
                  <Dropdown.Button flat color={value.color}>
                    {`${value.title}${
                      activeOfType.length ? ` (${activeOfType.length})` : ""
                    }`}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Repo"
                    color="primary"
                    selectionMode="multiple"
                    selectedKeys={activeOfType}
                    onSelectionChange={(attrs) =>
                      updateAttributes(value.key, attrs)
                    }
                  >
                    {value.items.map((attr) => (
                      <Dropdown.Item key={`${value.key}:${attr}`}>
                        {attr}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Grid>
            );
          })}
        </Grid.Container>
      </Row>
      <Spacer y={1} />
    </Grid>
  );
};
