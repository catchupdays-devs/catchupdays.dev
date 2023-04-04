import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Grid,
  Row,
  Spacer,
  Dropdown,
  Badge,
  Card,
  Text,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { CollectionElement } from "@react-types/shared";
import { FiltersResponse } from "@/app/types";

const Input = ({
  value,
  deleteFocused,
  isAttributeFocused,
  focusNext,
  focusPrevious,
  defocus,
  autocompleteItems,
  selectAttribute,
  selectedAttributes,
}: {
  value: JSX.Element[];
  deleteFocused: () => void;
  isAttributeFocused: boolean;
  focusNext: () => void;
  focusPrevious: () => void;
  defocus: () => void;
  autocompleteItems: string[];
  selectAttribute: (attr: string) => void;
  selectedAttributes: string[];
}) => {
  const autocompleteRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [text, setText] = useState("");
  const [width, setWidth] = useState(0);
  const [openAutocomplete, setOpenAutocomplete] = useState(false);
  const focusInput = () => {
    inputRef?.current?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (text === "") {
      if (event.key === "Backspace" && value.length) {
        if (isAttributeFocused) {
          deleteFocused();
        } else {
          focusPrevious();
        }
      }

      if (event.key === "ArrowLeft") {
        focusPrevious();
      }
      if (event.key === "ArrowRight") {
        focusNext();
      }
    }
    if (event.key === "Escape") {
      defocus();
      setOpenAutocomplete(false);
    }
    if (event.key === "Enter") {
      setOpenAutocomplete(false);
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      autocompleteRef.current?.focus();
    }
  };
  const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    /* @ts-ignore */
    setText(event.target.value);
    setOpenAutocomplete(true);

    if (event.key === "Escape") {
      defocus();
      setOpenAutocomplete(false);
    }
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    setOpenAutocomplete(true);
  };

  const autocomplete = autocompleteItems
    .filter((a) =>
      text
        .toLocaleLowerCase()
        .split(" ")
        .reduce(
          (condition, word) =>
            condition && a.toLocaleLowerCase().includes(word),
          true
        )
    )
    .filter((a) => !selectedAttributes.includes(a));

  useEffect(() => {
    setWidth(inputRef?.current?.scrollWidth || 0);
  }, [text]);

  return (
    <>
      {/* @ts-ignore */}
      <Card variant="bordered" xs>
        {/* @ts-ignore */}
        <Card.Body xs onClick={focusInput} css={{ cursor: "text" }}>
          <div
            style={{
              display: "block",
              margin: "-4px 0 -12px 0",
              minHeight: "38px",
            }}
          >
            <Text>
              {value}
              <input
                value={text}
                onChange={onChange}
                onKeyUp={onKeyUp}
                onKeyDown={onKeyDown}
                ref={inputRef}
                type="text"
                autoFocus
                placeholder={!value?.length ? "Type your filter here..." : ""}
                style={{
                  width: value?.length ? `${width}px` : "200px",
                  border: "none",
                  background: "transparent",
                }}
              />
            </Text>
          </div>
        </Card.Body>
      </Card>
      {openAutocomplete && text.length >= 2 ? (
        <Dropdown isOpen={true} placement="bottom-left" closeOnSelect={true}>
          <Dropdown.Trigger
            css={{ position: "absolute", bottom: 0, left: 0, zIndex: -1 }}
          >
            .
          </Dropdown.Trigger>
          <Dropdown.Menu
            aria-label="Autocomplete"
            selectionMode="none"
            onAction={(a) => {
              setOpenAutocomplete(false);
              selectAttribute(String(a));
              setText("");
            }}
            onClose={() => {
              setOpenAutocomplete(false);
            }}
            ref={autocompleteRef}
            disabledKeys={["more"]}
            shouldFocusWrap={false}
          >
            {
              autocomplete.slice(0, 5).map((item, index) => {
                const [type, name] = item.split(":");
                return (
                  <Dropdown.Item key={item} description={type}>
                    {name}
                  </Dropdown.Item>
                );
              }) as unknown as CollectionElement<object>
            }
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        (null as unknown as CollectionElement<object>)
      )}
    </>
  );
};
const Label = ({
  text,
  color = "neutral",
  removeItem,
  isActive = false,
  isDisabled = false,
}: {
  text: string;
  color: string;
  removeItem: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}) => {
  return (
    <span
      style={{
        display: "inline-block",
        margin: "0 8px 8px 0",
      }}
    >
      <Badge
        // @ts-ignore
        color="neutral"
        variant="flat"
        content="&times;"
        enableShadow
        disableOutline
        size="sm"
        css={{
          cursor: "pointer",
          background: "$gray800",
          color: "#fff",
          textAlign: "center",
          lineHeight: "11px",
          display: "inline-block",
          padding: "0 1px 0 0",
        }}
        onClick={removeItem}
      >
        <Badge
          enableShadow={isActive}
          disableOutline
          variant="flat"
          isSquared
          color={text.startsWith("repo:") ? "error" : undefined}
          // css={{ opacity: isDisabled ? 0.6 : 1 }}
        >
          {text}
        </Badge>
      </Badge>
    </span>
  );
};

export const WishlistForm = ({
  attributes,
  focusedAttribute,
  addAttribute,
  deleteAttribute,
  updateAttributes,
  setFocusedAttribute,
  activeAttributes,
  reset,
}: {
  attributes: any;
  focusedAttribute: string | null;
  activeAttributes: Set<string>;
  addAttribute: (attr: string) => void;
  deleteAttribute: (attr: string) => void;
  updateAttributes: (type: string, attr: Set<string>) => void;
  setFocusedAttribute: (attr: string | null) => void;
  reset: () => void;
}) => {
  const [inputText, setInputText] = useState([]);
  const hasExistingFilterForRepository = !!(
    [...activeAttributes].find((a) => a.startsWith("repo:")) || []
  ).length;

  useEffect(() => {
    const attributesElements = Array.from(activeAttributes).map((attribute) => {
      const [typeOfKey, name] = attribute.split(":");
      const type = Object.values(attributes).find(
        (a: any) => a.key === typeOfKey
      );
      const isDisabled = hasExistingFilterForRepository && typeOfKey !== "repo";

      return (
        <Label
          key={attribute}
          text={`${typeOfKey}: ${name}`}
          // @ts-ignore
          color={type.color}
          isActive={focusedAttribute === attribute}
          removeItem={() => deleteAttribute(attribute)}
          isDisabled={isDisabled}
        />
      );
    });

    // @ts-ignore
    setInputText(attributesElements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAttributes, focusedAttribute]);

  return (
    <Grid>
      <Row justify={"space-around"}>
        <Input
          autocompleteItems={Object.values(attributes).flatMap(
            (attributeGroup) =>
              // @ts-ignore
              attributeGroup.items.map((item) => {
                // @ts-ignore
                return `${attributeGroup.key}:${item}`;
              })
          )}
          isAttributeFocused={!!focusedAttribute}
          value={inputText}
          deleteFocused={() => {
            if (focusedAttribute) {
              deleteAttribute(focusedAttribute);
              setFocusedAttribute(null);
            }
          }}
          focusPrevious={() => {
            if (focusedAttribute) {
              const arrayOfAttributes = Array.from(activeAttributes);
              const focusedIndex = arrayOfAttributes.indexOf(focusedAttribute);
              setFocusedAttribute(arrayOfAttributes[focusedIndex - 1]);
            } else {
              // @ts-ignore
              setFocusedAttribute(Array.from(activeAttributes).pop());
            }
          }}
          focusNext={() => {
            const arrayOfAttributes = Array.from(activeAttributes);
            // @ts-ignore
            const focusedIndex = arrayOfAttributes.indexOf(focusedAttribute);
            setFocusedAttribute(arrayOfAttributes[focusedIndex + 1]);
          }}
          defocus={() => {
            setFocusedAttribute(null);
          }}
          selectAttribute={addAttribute}
          selectedAttributes={[...activeAttributes]}
        />
      </Row>
      <Spacer y={1} />
      <Row justify={"space-between"} align={"center"} wrap={"wrap"}>
        <Grid xs={12} md={8}>
          {/* @ts-ignore */}
          <Grid.Container gap={1} justify="start">
            {Object.entries(attributes).map(([key, value]) => {
              // @ts-ignore
              const activeOfType = value.items
                .filter((i: any) =>
                  // @ts-ignore
                  [...activeAttributes].includes(`${value.key}:${i}`)
                )
                // @ts-ignore
                .map((i: any) => `${value.key}:${i}`);

              return (
                <Grid
                  key={key}
                  xs={12}
                  md={3}
                  css={{
                    justifyContent: "stretch",
                    flexDirection: "column",
                    alignItems: "stretch",
                  }}
                >
                  <Dropdown placement="bottom-left">
                    {/* // @ts-ignore */}
                    {activeOfType.length ? (
                      <Badge
                        // @ts-ignore
                        color="neutral"
                        variant="flat"
                        content={activeOfType.length || null}
                        enableShadow
                        disableOutline
                        size="sm"
                        css={{
                          cursor: "pointer",
                          background: "$red800",
                          color: "#fff",
                        }}
                      >
                        <Dropdown.Button
                          flat
                          css={{ width: "100%" }}
                          // @ts-ignore
                          color={value.key === "repo" ? "error" : "neutral"}
                        >
                          {/* @ts-ignore */}
                          {value.title}
                        </Dropdown.Button>
                      </Badge>
                    ) : (
                      <Dropdown.Button
                        flat
                        css={{ width: "100%" }}
                        // @ts-ignore
                        color={value.key === "repo" ? "error" : "neutral"}
                      >
                        {/* @ts-ignore */}
                        {value.title}
                      </Dropdown.Button>
                    )}
                    <Dropdown.Menu
                      aria-label="Repo"
                      color="primary"
                      selectionMode="multiple"
                      selectedKeys={activeOfType}
                      onSelectionChange={(attrs) =>
                        // @ts-ignore
                        updateAttributes(value.key, attrs)
                      }
                    >
                      {/* @ts-ignore */}
                      {value.items.map((attr) => (
                        // @ts-ignore
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
        </Grid>

        <Grid xs={12} md={3} justify="flex-end">
          {/* @ts-ignore */}
          <Grid.Container gap={1} justify="start">
            <Grid css={{ width: "100%" }}>
              <Button
                css={{ width: "100%" }}
                onClick={reset}
                flat
                // @ts-ignore
                color={"neutral"}
              >
                Reset
              </Button>
            </Grid>
          </Grid.Container>
        </Grid>
      </Row>
      <Spacer y={1} />
    </Grid>
  );
};
