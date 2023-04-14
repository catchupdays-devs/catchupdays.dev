import React from "react";
import { Container, Text, Row, Spacer } from "@nextui-org/react";

export const Footer = () => {
  return (
    <Container sm>
      <Spacer y={6} />
      <Row justify={"center"}>
        <Text color="$gray600" small css={{ textAlign: "center" }}>
          Catchup Days initiative is organized and operated by the Open Source
          Software Institute z.ú., a non-profit organization registered at the
          Municipal Court in Prague. IČO: 18045570.
        </Text>
      </Row>
      <Row justify={"center"}>
        <Text color="$gray600" small css={{ textAlign: "center" }}>
          Copyright © {new Date().getFullYear()} Open Source Software Institute
          z.ú. All rights reserved.
        </Text>
      </Row>
      <Spacer y={2} />
    </Container>
  );
};
