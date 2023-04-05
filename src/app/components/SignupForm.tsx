import {
  Card,
  Input,
  Button,
  Text,
  Spacer,
  Container,
  Grid,
  Loading,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Subtitle, WithGradient } from "@/app/components/Text";

export const SignupForm = ({
  formKey,
  preselectedRole,
}: {
  formKey: string;
  preselectedRole?: "business" | "maintainer";
}) => {
  const [role, setRole] = useState<"business" | "maintainer" | undefined>(
    preselectedRole
  );
  const [state, handleSubmit] = useForm(formKey);

  return (
    <Container xs id={"enroll"}>
      <Spacer y={4} />
      <Card variant="bordered">
        <Card.Body css={{ overflow: "hidden" }}>
          <Grid.Container gap={1} justify="center">
            <Grid xs={12} md={10} justify={"center"}>
              <Container responsive>
                <Subtitle>Want to join us?</Subtitle>
                <Text
                  css={{
                    textAlign: "center",
                  }}
                >
                  Leave us your email and we&apos;ll reach out in no time.
                  Let&apos;s see how we can make open-source better,{" "}
                  <WithGradient>together</WithGradient>.
                </Text>
              </Container>
            </Grid>
          </Grid.Container>

          <Spacer y={1} />
          {state.succeeded ? (
            <Container>
              <Spacer y={1} />
              <Text
                css={{
                  textAlign: "center",
                }}
              >
                Thanks for the submission. We&apos;ll get be to you{" "}
                <Text
                  css={{
                    fontWeight: "bold",
                    textGradient:
                      "45deg, $red600 -25%, $red800 85%, $red900 100%",
                    display: "inline-block",
                  }}
                >
                  soon
                </Text>
                !
              </Text>
              <Spacer y={1} />
            </Container>
          ) : (
            <form onSubmit={handleSubmit}>
              <Grid.Container gap={1} justify="center">
                <Grid xs={12} justify={"center"}>
                  {/* @ts-ignore */}
                  <Button.Group color="neutral">
                    <Button onClick={() => setRole("business")}>
                      <span
                        style={{
                          fontWeight: role === "business" ? "bold" : "normal",
                        }}
                      >
                        Business
                      </span>
                    </Button>
                    <Button onClick={() => setRole("maintainer")}>
                      <span
                        style={{
                          fontWeight: role === "maintainer" ? "bold" : "normal",
                        }}
                      >
                        OS Maintainer
                      </span>
                    </Button>
                  </Button.Group>
                  <input
                    type="hidden"
                    id="role"
                    name="role"
                    required
                    value={role}
                  />
                  <ValidationError
                    prefix="Role"
                    field="role"
                    errors={state.errors}
                  />
                  <input
                    type="hidden"
                    id="role"
                    name="role"
                    required
                    value={role}
                  />
                  <ValidationError
                    prefix="Role"
                    field="role"
                    errors={state.errors}
                  />
                </Grid>
                <Spacer x={1} />
                <Grid xs={12} sm={7} direction={"column"}>
                  <Input
                    css={{
                      width: "100%",
                    }}
                    placeholder="Email address"
                    id="email"
                    type="email"
                    name="email"
                    required
                    /* @ts-ignore */
                    flat
                    shadow={false}
                    animated={false}
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                </Grid>
                <Grid xs={12} sm={3}>
                  {state.submitting ? (
                    <Button
                      color={"gradient"}
                      css={{
                        minWidth: "40px",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      type="submit"
                      disabled={state.submitting}
                    >
                      <Loading color="white" size="xs" />
                    </Button>
                  ) : (
                    <Button
                      css={{
                        minWidth: "40px",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      type="submit"
                      disabled={state.submitting}
                    >
                      Let&apos;s talk!
                    </Button>
                  )}
                </Grid>
                <Spacer x={1} />
              </Grid.Container>
            </form>
          )}
        </Card.Body>
      </Card>
      <Spacer y={2} />
    </Container>
  );
};
