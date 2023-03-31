import React from "react";
import { Container, Text, Row, Spacer } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <Container sm>
      <Spacer y={6} />
      <Row justify={"center"}>
        <Text color="$gray600" small>
          Catchup Days is organized and operated by the Open Source Software
          Institute z.ú., registered at the Municipal Court in Prague. IČO
          123456789.
        </Text>
      </Row>
      <Row justify={"center"}>
        <Text color="$gray600" small>
          Copyright © {new Date().getFullYear()} Open Source Software Institute
          z.ú. All rights reserved.
        </Text>
      </Row>
    </Container>
  );
};
