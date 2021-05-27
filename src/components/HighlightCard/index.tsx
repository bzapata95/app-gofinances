import React from "react";

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from "./styles";

const icon = {
  ingress: "arrow-up-circle",
  egress: "arrow-down-circle",
  total: "dollar-sign",
};

interface HighlightCardProps {
  type: "ingress" | "egress" | "total";
  title: string;
  amount: string;
  lastTransaction: string;
}

function HighlightCard({
  title,
  amount,
  lastTransaction,
  type,
}: HighlightCardProps) {
  return (
    <Container type={type}>
      <Header>
        <Title>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>

      <Footer>
        <Amount>{amount}</Amount>
        <LastTransaction>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
}

export default HighlightCard;
